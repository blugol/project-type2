import { useState } from 'react';
import { ChevronDown, ChevronRight, X, Copy, Check, FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { toast } from 'sonner';
import { EconomicEvent } from '@/app/data/types';

interface EventDetailSidebarProps {
  event: EconomicEvent | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export function EventDetailSidebar({ event, onClose, isDarkMode }: EventDetailSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string>('description');
  const [copiedItem, setCopiedItem] = useState<string>('');

  if (!event) return null;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedItem(label);
        toast.success(`${label} 복사되었습니다!`);
        setTimeout(() => setCopiedItem(''), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (successful) {
          setCopiedItem(label);
          toast.success(`${label} 복사되었습니다!`);
          setTimeout(() => setCopiedItem(''), 2000);
        } else {
          toast.error('복사에 실패했습니다.');
        }
      }
    } catch (err) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        document.execCommand('copy');
        textArea.remove();
        
        setCopiedItem(label);
        toast.success(`${label} 복사되었습니다!`);
        setTimeout(() => setCopiedItem(''), 2000);
      } catch (fallbackErr) {
        console.error('복사 실패:', fallbackErr);
        toast.error('복사에 실패했습니다. 브라우저 설정을 확인해주세요.');
      }
    }
  };

  const copyAllEventContent = () => {
    let fullContent = '';
    
    fullContent += `📅 ${event.title}\n`;
    fullContent += `날짜: ${event.date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })}\n`;
    fullContent += `카테고리: ${event.category}\n`;
    fullContent += `중요도: ${importanceLabels[event.importance]}\n`;
    fullContent += `\n${'='.repeat(50)}\n\n`;
    
    fullContent += `📝 기본 설명\n`;
    fullContent += `${event.description}\n\n`;
    
    if (event.details) {
      fullContent += `📋 상세 정보\n`;
      fullContent += `${event.details}\n\n`;
    }
    
    copyToClipboard(fullContent, '전체 내용이');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const importanceColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const importanceLabels = {
    high: '높음',
    medium: '중간',
    low: '낮음'
  };

  const countryName = {
    KR: '한국',
    US: '미국',
    JP: '일본',
    CN: '중국'
  };

  const countryCode = {
    KR: 'KR',
    US: 'US',
    JP: 'JP',
    CN: 'CN'
  };

  return (
    <div className={`rounded-lg border shadow-lg h-full flex flex-col ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className="bg-blue-600 text-white border-blue-700 font-bold px-3"
              >
                {countryCode[event.country]}
              </Badge>
              <Badge
                variant="outline"
                className={isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-300'}
              >
                {countryName[event.country]}
              </Badge>
              <Badge
                variant="outline"
                className={importanceColors[event.importance]}
              >
                {importanceLabels[event.importance]}
              </Badge>
              <Badge
                variant="outline"
                style={{
                  backgroundColor: event.categoryColor + '20',
                  color: event.categoryColor,
                  borderColor: event.categoryColor
                }}
              >
                {event.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2 group">
              <h2 className={`font-semibold text-xl mb-2 flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.title}
              </h2>
              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(event.title, '제목이')}
              >
                {copiedItem === '제목이' ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {event.date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </p>
            
            {(event.prev_value !== undefined || event.forecast_value !== undefined || event.actual_value !== undefined) && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {event.prev_value !== undefined && (
                  <div className={`p-2 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>전월</p>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {event.prev_value}{event.unit}
                    </p>
                  </div>
                )}
                {event.forecast_value !== undefined && (
                  <div className={`p-2 rounded border ${
                    isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>예상</p>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      {event.forecast_value}{event.unit}
                    </p>
                  </div>
                )}
                {event.actual_value !== undefined && event.actual_value !== null && (
                  <div className={`p-2 rounded border ${
                    event.actual_value > (event.forecast_value || 0)
                      ? isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
                      : event.actual_value < (event.forecast_value || 0)
                      ? isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'
                      : isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`text-xs ${
                      event.actual_value > (event.forecast_value || 0)
                        ? isDarkMode ? 'text-red-300' : 'text-red-600'
                        : event.actual_value < (event.forecast_value || 0)
                        ? isDarkMode ? 'text-green-300' : 'text-green-600'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>실제</p>
                    <p className={`font-bold text-sm ${
                      event.actual_value > (event.forecast_value || 0)
                        ? isDarkMode ? 'text-red-200' : 'text-red-700'
                        : event.actual_value < (event.forecast_value || 0)
                        ? isDarkMode ? 'text-green-200' : 'text-green-700'
                        : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {event.actual_value}{event.unit}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyAllEventContent}
              className="flex items-center gap-2"
            >
              {copiedItem === '전체 내용이' ? (
                <>
                  <Check className="size-4 text-green-600" />
                  <span className="text-green-600">복사됨</span>
                </>
              ) : (
                <>
                  <FileText className="size-4" />
                  <span>전체 복사</span>
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          <div className={`border rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleSection('description')}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>기본 설명</span>
              {expandedSection === 'description' ? (
                <ChevronDown className={`size-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              ) : (
                <ChevronRight className={`size-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              )}
            </button>
            {expandedSection === 'description' && (
              <div className={`p-4 pt-0 border-t group relative ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {event.description}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(event.description, '기본 설명이')}
                >
                  {copiedItem === '기본 설명이' ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {event.details && (
            <div className={`border rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => toggleSection('details')}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>상세 정보</span>
                {expandedSection === 'details' ? (
                  <ChevronDown className={`size-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                ) : (
                  <ChevronRight className={`size-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </button>
              {expandedSection === 'details' && (
                <div className={`p-4 pt-0 border-t group relative ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {event.details}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(event.details || '', '상세 정보가')}
                  >
                    {copiedItem === '상세 정보가' ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
