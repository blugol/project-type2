import { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, Copy, Check, Info, Building2, Factory, Store } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { toast } from 'sonner';
import { EconomicIndicator } from '@/app/types/indicator';
import { generateReport } from '@/app/data/economicIndicators';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface IndicatorDetailModalProps {
  indicator: EconomicIndicator | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export function IndicatorDetailModal({ indicator, onClose, isDarkMode }: IndicatorDetailModalProps) {
  const [copiedItem, setCopiedItem] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState(false);

  if (!indicator) return null;

  const report = generateReport(indicator);
  const isReleased = indicator.actual_value !== null;
  
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
        document.execCommand('copy');
        textArea.remove();
        setCopiedItem(label);
        toast.success(`${label} 복사되었습니다!`);
        setTimeout(() => setCopiedItem(''), 2000);
      }
    } catch (err) {
      toast.error('복사에 실패했습니다.');
    }
  };

  const getImpactColor = () => {
    if (!report) return 'text-gray-600';
    if (report.impact === 'positive') return 'text-green-600';
    if (report.impact === 'negative') return 'text-red-600';
    return 'text-yellow-600';
  };

  const getImpactIcon = () => {
    if (!report) return <Minus className="size-5" />;
    if (report.impact === 'positive') return <TrendingUp className="size-5" />;
    if (report.impact === 'negative') return <TrendingDown className="size-5" />;
    return <Minus className="size-5" />;
  };

  const getImportanceBadge = () => {
    const colors = {
      3: 'bg-red-100 text-red-800 border-red-300',
      2: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      1: 'bg-green-100 text-green-800 border-green-300'
    };
    const labels = {
      3: '🔴 High',
      2: '🟡 Medium',
      1: '🟢 Low'
    };
    return (
      <Badge variant="outline" className={colors[indicator.importance]}>
        {labels[indicator.importance]}
      </Badge>
    );
  };

  const countryFlag = {
    KR: '🇰🇷',
    US: '🇺🇸',
    JP: '🇯🇵',
    CN: '🇨🇳'
  };

  // 차트 데이터 준비
  const chartData = indicator.history?.map(h => ({
    date: h.date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    실제값: h.value,
    예상치: h.forecast || null
  })) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-800' // border-gray-200에서 border-gray-800로
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{countryFlag[indicator.country]}</span>
                {getImportanceBadge()}
                <Badge variant="outline" className={
                  isDarkMode
                    ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                    : 'bg-blue-50 text-blue-700 border-blue-300'
                }>
                  {indicator.category}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {indicator.name}
                </h2>
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Info className="size-4 text-blue-600" />
                  </Button>
                  {showTooltip && indicator.tooltip && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 text-white text-sm p-3 rounded-lg shadow-xl z-10">
                      {indicator.tooltip}
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {indicator.description}
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                📅 발표일: {indicator.releaseDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>

          {/* 수치 데이터 카드 */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className={`p-4 rounded-lg border shadow-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800' // border-gray-200에서 border-gray-800로
            }`}>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>전월 실적</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {indicator.prev_value}{indicator.unit}
              </p>
            </div>
            <div className={`p-4 rounded-lg border shadow-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800' // border-gray-200에서 border-gray-800로
            }`}>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>시장 예상</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                {indicator.forecast_value}{indicator.unit}
              </p>
            </div>
            <div className={`p-4 rounded-lg border shadow-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800' // border-gray-200에서 border-gray-800로
            }`}>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>실제 발표</p>
              {isReleased ? (
                <p className={`text-xl font-bold ${
                  indicator.actual_value! > indicator.forecast_value
                    ? 'text-red-600'
                    : indicator.actual_value! < indicator.forecast_value
                    ? 'text-blue-600'
                    : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {indicator.actual_value}{indicator.unit}
                </p>
              ) : (
                <p className="text-xl font-bold text-gray-400">미발표</p>
              )}
            </div>
            <div className={`p-4 rounded-lg border shadow-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-800' // border-gray-200에서 border-gray-800로
            }`}>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>괴리율</p>
              {isReleased && indicator.gap_analysis ? (
                <p className={`text-xl font-bold ${
                  indicator.gap_analysis > 0 ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {indicator.gap_analysis > 0 ? '+' : ''}{indicator.gap_analysis.toFixed(1)}%
                </p>
              ) : (
                <p className="text-xl font-bold text-gray-400">-</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analysis">AI 분석 리포트</TabsTrigger>
                <TabsTrigger value="chart">히스토리 차트</TabsTrigger>
                <TabsTrigger value="stocks">관련 종목</TabsTrigger>
              </TabsList>

              {/* AI 분석 리포트 */}
              <TabsContent value="analysis" className="space-y-4 mt-4">
                {report ? (
                  <>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-800"> {/* border-gray-800 추가 */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={getImpactColor()}>
                          {getImpactIcon()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2">{report.headline}</h3>
                          <p className="text-gray-700 leading-relaxed">{report.summary}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(report.headline + '\n\n' + report.summary, '분석 내용이')}
                        >
                          {copiedItem === '분석 내용이' ? (
                            <Check className="size-4 text-green-600" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="border border-gray-800 rounded-lg p-5 bg-white"> {/* border-gray-800 추가 */}
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span>📊</span>
                        <span>시장 전망</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{report.marketSentiment}</p>
                    </div>

                    <div className="border border-gray-800 rounded-lg p-5 bg-white"> {/* border-gray-800 추가 */}
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span>🏢</span>
                        <span>섹터별 영향</span>
                      </h4>
                      <div className="space-y-3">
                        {report.sectorImpact.map((sector, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-800">{sector.sector}</span>
                            <span className="text-sm text-gray-600">{sector.impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-5 bg-blue-50 border-gray-800"> {/* border-blue-200에서 border-gray-800로 */}
                      <h4 className="font-semibold mb-2 text-blue-900">💡 해석 가이드</h4>
                      <p className="text-sm text-blue-800">{indicator.base_guide}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Info className="size-12 mx-auto mb-3 opacity-50" />
                    <p>실제 수치가 발표되면 AI 분석 리포트가 자동으로 생성됩니다.</p>
                  </div>
                )}
              </TabsContent>

              {/* 히스토리 차트 */}
              <TabsContent value="chart" className="mt-4">
                <div className="border border-gray-800 rounded-lg p-6 bg-white"> {/* border-gray-800 추가 */}
                  <h4 className="font-semibold mb-4">📈 과거 6개월 추이</h4>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: '1px solid #ddd',
                            borderRadius: '8px'
                          }} 
                        />
                        <ReferenceLine y={50} stroke="#999" strokeDasharray="3 3" label="기준선 (50)" />
                        <Line 
                          type="monotone" 
                          dataKey="실제값" 
                          stroke="#2563eb" 
                          strokeWidth={3}
                          dot={{ fill: '#2563eb', r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="예상치" 
                          stroke="#94a3b8" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: '#94a3b8', r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center text-gray-500 py-12">히스토리 데이터가 없습니다.</p>
                  )}
                </div>
              </TabsContent>

              {/* 관련 종목 */}
              <TabsContent value="stocks" className="space-y-4 mt-4">
                {/* 대기업 */}
                <div className="border border-gray-800 rounded-lg overflow-hidden"> {/* border-gray-800 추가 */}
                  <div className="bg-blue-50 p-4 border-b flex items-center gap-2">
                    <Building2 className="size-5 text-blue-700" />
                    <h4 className="font-semibold text-blue-900">대장주 (대기업)</h4>
                    <Badge variant="secondary">{indicator.large_cap.length}개</Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    {indicator.large_cap.map(stock => (
                      <div key={stock.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg">{stock.name}</span>
                            <span className="text-sm text-gray-500">{stock.code}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{stock.desc}</p>
                          <p className="text-xs text-gray-500">{stock.marketCap}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-lg">{stock.price.toLocaleString()}원</p>
                          <p className={`text-sm ${
                            stock.change > 0 ? 'text-red-600' : stock.change < 0 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()}원 
                            ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="ml-2"
                          onClick={() => copyToClipboard(stock.code, stock.name)}
                        >
                          {copiedItem === stock.name ? (
                            <Check className="size-4 text-green-600" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 중견기업 */}
                {indicator.mid_cap.length > 0 && (
                  <div className="border border-gray-800 rounded-lg overflow-hidden"> {/* border-gray-800 추가 */}
                    <div className="bg-yellow-50 p-4 border-b flex items-center gap-2">
                      <Factory className="size-5 text-yellow-700" />
                      <h4 className="font-semibold text-yellow-900">중견기업</h4>
                      <Badge variant="secondary">{indicator.mid_cap.length}개</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      {indicator.mid_cap.map(stock => (
                        <div key={stock.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg">{stock.name}</span>
                              <span className="text-sm text-gray-500">{stock.code}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stock.desc}</p>
                            <p className="text-xs text-gray-500">{stock.marketCap}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-lg">{stock.price.toLocaleString()}원</p>
                            <p className={`text-sm ${
                              stock.change > 0 ? 'text-red-600' : stock.change < 0 ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                              {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()}원 
                              ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-2"
                            onClick={() => copyToClipboard(stock.code, stock.name)}
                          >
                            {copiedItem === stock.name ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 소기업 */}
                {indicator.small_cap.length > 0 && (
                  <div className="border border-gray-800 rounded-lg overflow-hidden"> {/* border-gray-800 추가 */}
                    <div className="bg-green-50 p-4 border-b flex items-center gap-2">
                      <Store className="size-5 text-green-700" />
                      <h4 className="font-semibold text-green-900">소기업</h4>
                      <Badge variant="secondary">{indicator.small_cap.length}개</Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 ml-2">
                        ⚠️ 변동성 높음
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      {indicator.small_cap.map(stock => (
                        <div key={stock.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg">{stock.name}</span>
                              <span className="text-sm text-gray-500">{stock.code}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stock.desc}</p>
                            <p className="text-xs text-gray-500">{stock.marketCap}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-lg">{stock.price.toLocaleString()}원</p>
                            <p className={`text-sm ${
                              stock.change > 0 ? 'text-red-600' : stock.change < 0 ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                              {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()}원 
                              ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-2"
                            onClick={() => copyToClipboard(stock.code, stock.name)}
                          >
                            {copiedItem === stock.name ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}