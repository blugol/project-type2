import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Building, Building2, Copy, CheckCheck } from 'lucide-react';
import { EconomicEvent, StockCategory } from '@/app/data/types';
import { toast } from 'sonner';

interface RelatedStocksSectionProps {
  event: EconomicEvent | null;
  isDarkMode?: boolean;
}

export function RelatedStocksSection({ event, isDarkMode }: RelatedStocksSectionProps) {
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({
    major: true,
    mid: true,
    small: true,
  });
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  if (!event || !event.relatedStocks || event.relatedStocks.length === 0) {
    return null;
  }

  const toggleTier = (tier: string) => {
    setExpandedTiers(prev => ({
      ...prev,
      [tier]: !prev[tier]
    }));
  };

  // 종목 데이터를 텍스트로 변환하는 함수
  const formatStocksToText = (category: StockCategory) => {
    return category.stocks.map(stock => 
      `${stock.name}\t${stock.code}\t${stock.sector}`
    ).join('\n');
  };

  // 전체 종목 데이터를 텍스트로 변환하는 함수
  const formatAllStocksToText = () => {
    return event.relatedStocks!.map(category => {
      const header = `[${category.tierName}]`;
      const stocks = category.stocks.map(stock => 
        `${stock.name}\t${stock.code}\t${stock.sector}`
      ).join('\n');
      return `${header}\n${stocks}`;
    }).join('\n\n');
  };

  // 복사 함수
  const copyToClipboard = async (text: string, key: string) => {
    try {
      // Clipboard API 사용 가능 여부 확인 (권한 포함)
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedStates(prev => ({ ...prev, [key]: true }));
          toast.success('클립보드에 복사되었습니다!');
          
          // 2초 후 복사 상태 초기화
          setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [key]: false }));
          }, 2000);
          return;
        } catch (clipboardError) {
          // Clipboard API 실패 시 조용히 fallback으로 전환
        }
      }
      
      // Fallback 방식 사용
      fallbackCopyToClipboard(text, key);
    } catch (err) {
      // 최종 실패
      toast.error('복사에 실패했습니다.');
      console.error('Failed to copy:', err);
    }
  };

  // Fallback 복사 함수 (textarea 사용)
  const fallbackCopyToClipboard = (text: string, key: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0';
      
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        toast.success('클립보드에 복사되었습니다!');
        
        // 2초 후 복사 상태 초기화
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [key]: false }));
        }, 2000);
      } else {
        throw new Error('Copy command was unsuccessful');
      }
    } catch (err) {
      toast.error('복사에 실패했습니다.');
      console.error('Failed to copy:', err);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'major':
        return <Building2 className="size-5" />;
      case 'mid':
        return <Building className="size-5" />;
      case 'small':
        return <TrendingUp className="size-5" />;
      default:
        return <TrendingUp className="size-5" />;
    }
  };

  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'major':
        return {
          bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
          border: isDarkMode ? 'border-blue-700' : 'border-gray-800', // border-blue-200에서 border-gray-800로
          text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
          badge: isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700',
        };
      case 'mid':
        return {
          bg: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50',
          border: isDarkMode ? 'border-purple-700' : 'border-gray-800', // border-purple-200에서 border-gray-800로
          text: isDarkMode ? 'text-purple-300' : 'text-purple-700',
          badge: isDarkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700',
        };
      case 'small':
        return {
          bg: isDarkMode ? 'bg-green-900/30' : 'bg-green-50',
          border: isDarkMode ? 'border-green-700' : 'border-gray-800', // border-green-200에서 border-gray-800로
          text: isDarkMode ? 'text-green-300' : 'text-green-700',
          badge: isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700',
        };
      default:
        return {
          bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
          border: isDarkMode ? 'border-gray-700' : 'border-gray-800', // border-gray-200에서 border-gray-800로
          text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
          badge: isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700',
        };
    }
  };

  // 카테고리별로 분류
  const majorCategory = event.relatedStocks.find(cat => cat.tier === 'major');
  const midCategory = event.relatedStocks.find(cat => cat.tier === 'mid');
  const smallCategory = event.relatedStocks.find(cat => cat.tier === 'small');

  const totalStocks = event.relatedStocks.reduce((sum, cat) => sum + cat.stocks.length, 0);

  return (
    <div className={`rounded-lg border shadow-lg p-6 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-stone-100 border-gray-800' // border-gray-200에서 border-gray-800로, bg-white에서 bg-stone-100로
    }`}>
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📈 관련 주식 종목
          </h2>
          <button
            onClick={() => copyToClipboard(formatAllStocksToText(), 'all')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copiedStates.all ? (
              <>
                <CheckCheck className="size-4" />
                <span className="text-sm font-medium">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                <span className="text-sm font-medium">전체 복사</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {event.title}
          </p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            총 {totalStocks}개 종목
          </span>
        </div>
      </div>

      {/* 3단 가로 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 대장주 */}
        {majorCategory && (
          <div className={`rounded-lg border-2 overflow-hidden ${getTierColors('major').border}`}>
            <button
              onClick={() => toggleTier('major')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                getTierColors('major').bg
              } hover:opacity-80`}
            >
              <div className="flex items-center gap-2">
                <div className={getTierColors('major').text}>
                  {getTierIcon('major')}
                </div>
                <div className="text-left">
                  <h3 className={`font-bold ${getTierColors('major').text}`}>
                    {majorCategory.tierName}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {majorCategory.stocks.length}개 종목
                  </p>
                </div>
              </div>
              <div className={getTierColors('major').text}>
                {expandedTiers.major ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              </div>
            </button>

            {expandedTiers.major && (
              <div className={`p-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {majorCategory.stocks.map((stock, idx) => (
                    <div
                      key={`${stock.code}-${idx}`}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-50 border-gray-400 hover:bg-white shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold truncate ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {stock.name}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-mono whitespace-nowrap ${
                              getTierColors('major').badge
                            }`}>
                              {stock.code}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {stock.sector}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(formatStocksToText(majorCategory), 'major')}
                  className={`w-full px-4 py-2 flex items-center justify-center transition-colors ${
                    getTierColors('major').bg
                  } hover:opacity-80 mt-2`}
                >
                  <div className="flex items-center gap-2">
                    <div className={getTierColors('major').text}>
                      {copiedStates.major ? <CheckCheck className="size-5" /> : <Copy className="size-5" />}
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold ${getTierColors('major').text}`}>
                        {copiedStates.major ? '복사 완료' : '복사하기'}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 중견기업 */}
        {midCategory && (
          <div className={`rounded-lg border-2 overflow-hidden ${getTierColors('mid').border}`}>
            <button
              onClick={() => toggleTier('mid')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                getTierColors('mid').bg
              } hover:opacity-80`}
            >
              <div className="flex items-center gap-2">
                <div className={getTierColors('mid').text}>
                  {getTierIcon('mid')}
                </div>
                <div className="text-left">
                  <h3 className={`font-bold ${getTierColors('mid').text}`}>
                    {midCategory.tierName}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {midCategory.stocks.length}개 종목
                  </p>
                </div>
              </div>
              <div className={getTierColors('mid').text}>
                {expandedTiers.mid ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              </div>
            </button>

            {expandedTiers.mid && (
              <div className={`p-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {midCategory.stocks.map((stock, idx) => (
                    <div
                      key={`${stock.code}-${idx}`}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-50 border-gray-400 hover:bg-white shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold truncate ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {stock.name}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-mono whitespace-nowrap ${
                              getTierColors('mid').badge
                            }`}>
                              {stock.code}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {stock.sector}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(formatStocksToText(midCategory), 'mid')}
                  className={`w-full px-4 py-2 flex items-center justify-center transition-colors ${
                    getTierColors('mid').bg
                  } hover:opacity-80 mt-2`}
                >
                  <div className="flex items-center gap-2">
                    <div className={getTierColors('mid').text}>
                      {copiedStates.mid ? <CheckCheck className="size-5" /> : <Copy className="size-5" />}
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold ${getTierColors('mid').text}`}>
                        {copiedStates.mid ? '복사 완료' : '복사하기'}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 소기업 */}
        {smallCategory && (
          <div className={`rounded-lg border-2 overflow-hidden ${getTierColors('small').border}`}>
            <button
              onClick={() => toggleTier('small')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                getTierColors('small').bg
              } hover:opacity-80`}
            >
              <div className="flex items-center gap-2">
                <div className={getTierColors('small').text}>
                  {getTierIcon('small')}
                </div>
                <div className="text-left">
                  <h3 className={`font-bold ${getTierColors('small').text}`}>
                    {smallCategory.tierName}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {smallCategory.stocks.length}개 종목
                  </p>
                </div>
              </div>
              <div className={getTierColors('small').text}>
                {expandedTiers.small ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              </div>
            </button>

            {expandedTiers.small && (
              <div className={`p-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {smallCategory.stocks.map((stock, idx) => (
                    <div
                      key={`${stock.code}-${idx}`}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-50 border-gray-400 hover:bg-white shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold truncate ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {stock.name}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-mono whitespace-nowrap ${
                              getTierColors('small').badge
                            }`}>
                              {stock.code}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {stock.sector}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(formatStocksToText(smallCategory), 'small')}
                  className={`w-full px-4 py-2 flex items-center justify-center transition-colors ${
                    getTierColors('small').bg
                  } hover:opacity-80 mt-2`}
                >
                  <div className="flex items-center gap-2">
                    <div className={getTierColors('small').text}>
                      {copiedStates.small ? <CheckCheck className="size-5" /> : <Copy className="size-5" />}
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold ${getTierColors('small').text}`}>
                        {copiedStates.small ? '복사 완료' : '복사하기'}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}