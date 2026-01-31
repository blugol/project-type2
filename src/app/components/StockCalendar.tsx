import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { EconomicEvent } from '@/app/data/types';

interface StockCalendarProps {
  events: EconomicEvent[];
  onEventClick: (event: EconomicEvent) => void;
  selectedEventId?: string;
  isDarkMode?: boolean;
}

export function StockCalendar({ events, onEventClick, selectedEventId, isDarkMode }: StockCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  // 해 달의 최대 일정 개수 계산
  const maxEventsInMonth = Math.max(
    0,
    ...Array.from({ length: daysInMonth }, (_, i) => getEventsForDate(i + 1).length)
  );

  // 최대 일정 개수에 따른 최소 높이 계산 (기본 높이 + 일정당 높이) - 더욱 작게 조정
  const minCellHeight = Math.max(80, 50 + maxEventsInMonth * 18);

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const calendarDays = [];

  // 빈 날짜들 (이전 달)
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  // 현재 달의 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className={`rounded-xl border-2 p-4 ${ // rounded-lg에서 rounded-xl로, border에서 border-2로
      isDarkMode ? 'bg-gray-800 border-gray-700 shadow-lg' : 'bg-stone-200 border-gray-800 shadow-xl' // border-stone-600에서 border-gray-800로 - 검은색에 가까운 회색
    }`}>
      <div className="flex items-center justify-between mb-2"> {/* mb-4에서 mb-2로 줄임 */}
        <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}> {/* font-semibold에서 font-bold로, text-base에서 text-lg로 */}
          {year}년 {monthNames[month]}
        </h2>
        <div className="flex gap-2"> {/* gap-1.5에서 gap-2로 */}
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      
      {/* 설명 텍스트 추가 */}
      <div className="text-center mb-4">
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          일정을 클릭하면 관련 종목을 볼 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2"> {/* gap-1에서 gap-2로 */}
        {days.map((day, index) => (
          <div
            key={day}
            className={`text-center font-bold text-sm py-2 ${ // font-medium에서 font-bold로, text-xs에서 text-sm으로, py-1에서 py-2로
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-slate-700'
            }`}
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} style={{ height: `${minCellHeight}px` }} />;
          }

          const dayEvents = getEventsForDate(day);
          const isToday = 
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          const dayOfWeek = index % 7;

          return (
            <div
              key={day}
              className={`border-2 rounded-lg p-2 flex flex-col ${ // border에서 border-2로, p-1에서 p-2로, shadow-sm 제거하고 직접 스타일링
                isToday 
                  ? isDarkMode ? 'bg-blue-900 border-gray-800 shadow-lg' : 'bg-blue-50 border-gray-800 shadow-lg' // 오늘 날짜도 gray-800 테두리로 통일
                  : isDarkMode ? 'border-gray-600 bg-gray-850 shadow-md' : 'border-gray-800 bg-stone-100 shadow-md' // border-slate-400에서 border-gray-800로 통일
              }`}
              style={{ height: `${minCellHeight}px` }}
            >
              <div className="flex items-center justify-between mb-1"> {/* mb-0.5에서 mb-1로 */}
                <span
                  className={`text-sm font-bold ${ // text-[11px]에서 text-sm으로, font-semibold에서 font-bold로
                    dayOfWeek === 0 
                      ? 'text-red-600' 
                      : dayOfWeek === 6 
                      ? 'text-blue-600' 
                      : isDarkMode ? 'text-gray-300' : 'text-slate-900' // text-gray-800에서 text-slate-900으로 더 진하게
                  }`}
                >
                  {day}
                </span>
                {dayEvents.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${ // text-[9px]에서 text-[10px]로, px-1에서 px-1.5로, font-medium서 font-bold로
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-700 text-white' // 라이트모드에서 더 강한 대비
                  }`}>
                    {dayEvents.length}
                  </span>
                )}
              </div>
              
              <div className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden"> {/* overflow-x-hidden 추가하여 가로 슬라이드 방지 */}
                {dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-200 flex items-center gap-1 hover:scale-105 hover:shadow-lg hover:z-10 font-semibold border ${ // px-1.5에서 px-2로, py-1에서 py-1.5로, rounded에서 rounded-md로, font-medium에서 font-semibold로, border 추가
                      selectedEventId === event.id
                        ? 'bg-blue-600 text-white shadow-xl border-blue-400'
                        : isDarkMode ? 'hover:bg-opacity-80 hover:brightness-125' : 'hover:bg-opacity-100 hover:brightness-105 shadow' // 라이트 모드 shadow 강화
                    }`}
                    style={{
                      backgroundColor: selectedEventId === event.id ? undefined : event.categoryColor + (isDarkMode ? '40' : '50'), // 30에서 50으로 더 진하게
                      color: selectedEventId === event.id ? undefined : isDarkMode ? event.categoryColor : '#1e293b', // 라이트 모드에서는 진한 슬레이트 색상
                      borderColor: selectedEventId === event.id ? undefined : event.categoryColor + (isDarkMode ? '60' : '80'), // 테두리 색상 더 진하게
                      fontWeight: isDarkMode ? '500' : '600' // 라이트 모드에서 더 굵게
                    }}
                    title={event.title}
                  >
                    <span className="truncate flex-1">{event.title}</span>
                    <span className={`text-[10px] font-bold px-1 py-0.5 rounded ${selectedEventId === event.id ? 'text-white/90 bg-white/20' : isDarkMode ? 'opacity-80' : 'bg-slate-800 text-white'}`}> {/* 라이트 모드에서 시간 표시 강조 */}
                      {event.date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5"> {/* mt-4에서 mt-3으로, gap-2에서 gap-1.5 축소 */}
        <div className="flex items-center gap-1"> {/* gap-1.5에서 gap-1로 축소 */}
          <div className="w-2 h-2 rounded-full bg-red-500" /> {/* w-2.5에서 w-2로 축소 */}
          <span className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>높은 중요도</span> {/* text-xs에서 text-[11px]로 축소 */}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>중간 중요도</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>낮은 중요도</span>
        </div>
      </div>
    </div>
  );
}