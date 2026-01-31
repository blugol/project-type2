import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { StockCalendar } from '@/app/components/StockCalendar';
import { EventDetailSidebar } from '@/app/components/EventDetailSidebar';
import { RelatedStocksSection } from '@/app/components/RelatedStocksSection';
import { mockEconomicEvents } from '@/app/data/mockData';
import { EconomicEvent } from '@/app/data/types';
import { loadEventsFromJSON } from '@/app/data/dataLoader';
import { getIndicatorGuide } from '@/app/data/indicatorGuides';
import { TrendingUp, Moon, Sun } from 'lucide-react';
import { Toaster } from '@/app/components/ui/sonner';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [events, setEvents] = useState<EconomicEvent[]>(mockEconomicEvents); // 초기값은 mockData
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdateDate, setLastUpdateDate] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // JSON 파일에서 실제 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedEvents = await loadEventsFromJSON();
        if (loadedEvents.length > 0) {
          setEvents(loadedEvents);
          console.log('✅ 실제 데이터 로드 완료:', loadedEvents.length, '개의 일정');
          
          // 이벤트 데이터 중 가장 최신 업데이트 날짜 찾기
          const latestUpdate = loadedEvents.reduce((latest, event) => {
            if (event.lastUpdated) {
              return !latest || event.lastUpdated > latest ? event.lastUpdated : latest;
            }
            return latest;
          }, null as Date | null);
          
          setLastUpdateDate(latestUpdate || new Date());
          
          // 🎯 오늘 날짜의 일정 자동 선택
          const today = new Date();
          const todayEvents = loadedEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === today.getDate() &&
                   eventDate.getMonth() === today.getMonth() &&
                   eventDate.getFullYear() === today.getFullYear();
          });
          
          if (todayEvents.length > 0) {
            setSelectedEvent(todayEvents[0]); // 오늘의 첫 번째 일정 자동 선택
            console.log('📅 오늘의 일정 자동 선택:', todayEvents[0].title);
          }
        } else {
          console.log('⚠️ 실제 데이터가 없어 샘플 데이터를 사용합니다.');
          setEvents(mockEconomicEvents);
          
          // 샘플 데이터에서도 최신 업데이트 날짜 찾기
          const latestUpdate = mockEconomicEvents.reduce((latest, event) => {
            if (event.lastUpdated) {
              return !latest || event.lastUpdated > latest ? event.lastUpdated : latest;
            }
            return latest;
          }, null as Date | null);
          
          setLastUpdateDate(latestUpdate || new Date());
          
          // 🎯 오늘 날짜의 일정 자동 선택 (샘플 데이터)
          const today = new Date();
          const todayEvents = mockEconomicEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === today.getDate() &&
                   eventDate.getMonth() === today.getMonth() &&
                   eventDate.getFullYear() === today.getFullYear();
          });
          
          if (todayEvents.length > 0) {
            setSelectedEvent(todayEvents[0]); // 오늘의 첫 번째 일정 자동 선택
            console.log('📅 오늘의 일정 자동 선택:', todayEvents[0].title);
          }
        }
      } catch (error) {
        console.error('데이터 로드 실패, 샘플 데이터 사용:', error);
        setEvents(mockEconomicEvents);
        
        // 에러 시에도 샘플 데이터의 업데이트 날짜 설정
        const latestUpdate = mockEconomicEvents.reduce((latest, event) => {
          if (event.lastUpdated) {
            return !latest || event.lastUpdated > latest ? event.lastUpdated : latest;
          }
          return latest;
        }, null as Date | null);
        
        setLastUpdateDate(latestUpdate || new Date());
        
        // 🎯 오늘 날짜의 일정 자동 선택 (에러 시)
        const today = new Date();
        const todayEvents = mockEconomicEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === today.getDate() &&
                 eventDate.getMonth() === today.getMonth() &&
                 eventDate.getFullYear() === today.getFullYear();
        });
        
        if (todayEvents.length > 0) {
          setSelectedEvent(todayEvents[0]); // 오늘의 첫 번째 일정 자동 선택
          console.log('📅 오늘의 일정 자동 선택:', todayEvents[0].title);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleEventClick = (event: EconomicEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseSidebar = () => {
    setSelectedEvent(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const importanceColors = {
    'high': 'bg-red-600 text-white border-red-700 font-bold px-3',
    'medium': 'bg-yellow-600 text-white border-yellow-700 font-bold px-3',
    'low': 'bg-gray-600 text-white border-gray-700 font-bold px-3'
  };

  const importanceLabels = {
    'high': '중',
    'medium': '보통',
    'low': '낮음'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-stone-400 via-neutral-400 to-stone-400' // stone-200에서 stone-400로 - 훨씬 더 어두운 톤
    }`}>
      <Toaster position="top-center" richColors />
      
      <Tabs defaultValue="calendar" className="w-full">
        <div className={`border-b shadow-sm sticky top-0 z-10 transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-50 border-gray-800 shadow-md' // border-stone-400에서 border-gray-800로 통일
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <TrendingUp className="size-8 text-white" />
                </div>
                <div>
                  <h1 className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    경제일정 & 종목확인
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    경제 일정과 관련된 종목 한눈에보기
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={`transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-yellow-400'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>
                
                <TabsList className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <TrendingUp className="size-4" />
                    <span>일정 캘린더</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="calendar" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            {/* 선택된 일정 정보 - 달력 위로 이동 */}
            {selectedEvent && (
              <div className={`rounded-lg border-2 shadow-lg mb-6 ${ // border-2로 강조
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-100 border-gray-800'
              }`}>
                {/* 상단 헤더 정보 */}
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* 국가 */}
                    <Badge
                      variant="outline"
                      className="bg-blue-600 text-white border-blue-700 font-bold"
                    >
                      {selectedEvent.country}
                    </Badge>
                    
                    {/* 중요도 */}
                    <Badge
                      variant="outline"
                      className={importanceColors[selectedEvent.importance]}
                    >
                      {importanceLabels[selectedEvent.importance]}
                    </Badge>
                    
                    {/* 카테고리 */}
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor: selectedEvent.categoryColor + '20',
                        color: selectedEvent.categoryColor,
                        borderColor: selectedEvent.categoryColor
                      }}
                    >
                      {selectedEvent.category}
                    </Badge>
                    
                    {/* 시간 */}
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedEvent.date.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </span>
                    
                    {/* 제목 */}
                    <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedEvent.title}
                    </span>
                    
                    {/* 지표 기준점 - 제목 옆에 표시 */}
                    {(() => {
                      const guide = getIndicatorGuide(selectedEvent.title);
                      if (guide) {
                        return (
                          <span className={`text-sm font-medium px-2 py-1 rounded ${
                            isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                          }`}>
                            기준: {guide.basePoint}
                          </span>
                        );
                      }
                      return null;
                    })()}
                    
                    {/* 날짜 */}
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedEvent.date.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </span>
                  </div>
                </div>

                {/* 경제 지표 상세 정보 - 수치 데이터가 있을 때만 표시 */}
                {(selectedEvent.prev_value !== undefined || selectedEvent.forecast_value !== undefined || selectedEvent.actual_value !== undefined) && (
                  <div className="p-4">
                    {/* 수치 데이터 카드 */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {/* 전월 실적 */}
                      {selectedEvent.prev_value !== undefined && (
                        <div className={`p-3 rounded-lg border shadow-sm ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800'
                        }`}>
                          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>전월 실적</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {selectedEvent.prev_value}{selectedEvent.unit}
                          </p>
                        </div>
                      )}

                      {/* 시장 예상 */}
                      {selectedEvent.forecast_value !== undefined && (
                        <div className={`p-3 rounded-lg border shadow-sm ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800'
                        }`}>
                          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>시장 예상</p>
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                            {selectedEvent.forecast_value}{selectedEvent.unit}
                          </p>
                        </div>
                      )}

                      {/* 실제 발표 */}
                      {selectedEvent.actual_value !== undefined && (
                        <div className={`p-3 rounded-lg border shadow-sm ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800'
                        }`}>
                          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>실제 발표</p>
                          {selectedEvent.actual_value !== null ? (
                            <p className={`text-lg font-bold ${
                              selectedEvent.forecast_value !== undefined && selectedEvent.actual_value > selectedEvent.forecast_value
                                ? 'text-red-600'
                                : selectedEvent.forecast_value !== undefined && selectedEvent.actual_value < selectedEvent.forecast_value
                                ? 'text-blue-600'
                                : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {selectedEvent.actual_value}{selectedEvent.unit}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-gray-400">미발표</p>
                          )}
                        </div>
                      )}

                      {/* 괴리율 */}
                      {selectedEvent.gap_analysis !== undefined && (
                        <div className={`p-3 rounded-lg border shadow-sm ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800'
                        }`}>
                          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>괴리율</p>
                          <p className={`text-lg font-bold ${
                            selectedEvent.gap_analysis > 0 ? 'text-red-600' : selectedEvent.gap_analysis < 0 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {selectedEvent.gap_analysis > 0 ? '+' : ''}{selectedEvent.gap_analysis.toFixed(1)}%
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 해석 가이드 */}
                    {selectedEvent.base_guide && (
                      <div className={`p-4 rounded-lg border mb-3 ${
                        isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-gray-800'
                      }`}>
                        <h4 className={`font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                          <span>💡</span>
                          <span>해석 가이드</span>
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                          {selectedEvent.base_guide}
                        </p>
                      </div>
                    )}

                    {/* 툴팁 정보 */}
                    {selectedEvent.tooltip && (
                      <div className={`p-4 rounded-lg border mb-3 ${
                        isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-800'
                      }`}>
                        <h4 className={`font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span>ℹ️</span>
                          <span>상세 정보</span>
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {selectedEvent.tooltip}
                        </p>
                      </div>
                    )}

                    {/* 지표 기준치 가이드 */}
                    {(() => {
                      const guide = getIndicatorGuide(selectedEvent.title);
                      if (guide) {
                        return (
                          <div className={`p-4 rounded-lg border ${
                            isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-gray-800'
                          }`}>
                            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>
                              <span>📊</span>
                              <span>지표 기준치 가이드</span>
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className={`font-medium min-w-[80px] ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>기준점:</span>
                                <span className={`font-bold ${isDarkMode ? 'text-green-100' : 'text-green-900'}`}>{guide.basePoint}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className={`font-medium min-w-[80px] ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>수치 높음:</span>
                                <span className={`${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>{guide.highInterpretation}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className={`font-medium min-w-[80px] ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>수치 낮음:</span>
                                <span className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>{guide.lowInterpretation}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}

                {/* 기본 설명 - 수치 데이터가 없을 때 */}
                {!(selectedEvent.prev_value !== undefined || selectedEvent.forecast_value !== undefined || selectedEvent.actual_value !== undefined) && selectedEvent.description && (
                  <div className="p-4">
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 달력 전체 너비로 */}
            <div className="mb-6">
              <StockCalendar
                events={events}
                onEventClick={handleEventClick}
                selectedEventId={selectedEvent?.id}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* 관련 종목 섹션 */}
            <div>
              <RelatedStocksSection event={selectedEvent} isDarkMode={isDarkMode} />
            </div>

            <footer className={`mt-12 pt-8 border-t text-center ${
              isDarkMode ? 'border-gray-700' : 'border-gray-800'
            }`}>
              <p className={`text-sm mb-2 font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                본 서비스는 투자 참고용이며, 실제 투자 결정에 대한 책임은 투자자 본인에게 있습니다.
              </p>
              {lastUpdateDate && (
                <p className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  마지막 업데이트: {lastUpdateDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </footer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}