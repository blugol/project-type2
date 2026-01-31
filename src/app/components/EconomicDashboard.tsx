import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, ChevronRight, Globe } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { EconomicIndicator } from '@/app/types/indicator';
import { economicIndicators } from '@/app/data/economicIndicators';
import { IndicatorDetailModal } from '@/app/components/IndicatorDetailModal';

interface EconomicDashboardProps {
  isDarkMode?: boolean;
}

export function EconomicDashboard({ isDarkMode }: EconomicDashboardProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<EconomicIndicator | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countryFilters = [
    { code: 'all', name: '전체' },
    { code: 'KR', name: '한국' },
    { code: 'US', name: '미국' },
    { code: 'JP', name: '일본' },
    { code: 'CN', name: '중국' }
  ];

  const filteredIndicators = selectedCountry === 'all'
    ? economicIndicators
    : economicIndicators.filter(ind => ind.country === selectedCountry);

  // 날짜별로 그룹화
  const groupedByDate = filteredIndicators.reduce((acc, indicator) => {
    const dateKey = indicator.releaseDate.toLocaleDateString('ko-KR');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(indicator);
    return acc;
  }, {} as Record<string, EconomicIndicator[]>);

  const getImportanceColor = (level: number) => {
    if (level === 3) return 'bg-red-100 text-red-800 border-red-300';
    if (level === 2) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const getImportanceLabel = (level: number) => {
    if (level === 3) return '🔴 High';
    if (level === 2) return '🟡 Medium';
    return '🟢 Low';
  };

  const getActualValueColor = (indicator: EconomicIndicator) => {
    if (indicator.actual_value === null) return 'text-gray-400';
    if (indicator.actual_value > indicator.forecast_value) return 'text-red-600';
    if (indicator.actual_value < indicator.forecast_value) return 'text-blue-600';
    return 'text-gray-700';
  };

  const getImpactIcon = (indicator: EconomicIndicator) => {
    if (indicator.actual_value === null) return <Minus className="size-4" />;
    if (indicator.actual_value > indicator.forecast_value) return <TrendingUp className="size-4" />;
    if (indicator.actual_value < indicator.forecast_value) return <TrendingDown className="size-4" />;
    return <Minus className="size-4" />;
  };

  const countryFlag = {
    KR: '🇰🇷',
    US: '🇺🇸',
    JP: '🇯🇵',
    CN: '🇨🇳'
  };

  return (
    <div className={`min-h-screen p-6 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="size-8 text-blue-600" />
            <h1 className={`font-bold text-3xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>경제 지표 캘린더</h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            주요 경제 지표를 확인하고 AI 기반 투자 인사이트를 받아보세요
          </p>
        </div>

        {/* Country Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {countryFilters.map(country => (
            <Button
              key={country.code}
              variant={selectedCountry === country.code ? 'default' : 'outline'}
              onClick={() => setSelectedCountry(country.code)}
              className={`flex items-center gap-2 ${
                isDarkMode && selectedCountry !== country.code
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
                  : ''
              }`}
            >
              {country.code === 'all' ? <Globe className="size-4" /> : <span>{countryFlag[country.code]}</span>}
              <span>{country.name}</span>
            </Button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-800'}`}> {/* border-gray-800 추가 */}
            <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>총 지표 수</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {filteredIndicators.length}개
            </p>
          </Card>
          <Card className={`p-4 ${
            isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-gray-800' // border-red-200에서 border-gray-800로
          }`}>
            <p className={`text-sm mb-1 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>🔴 High 중요도</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-red-200' : 'text-red-900'}`}>
              {filteredIndicators.filter(i => i.importance === 3).length}개
            </p>
          </Card>
          <Card className={`p-4 ${
            isDarkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-gray-800' // border-yellow-200에서 border-gray-800로
          }`}>
            <p className={`text-sm mb-1 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>🟡 Medium 중요도</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>
              {filteredIndicators.filter(i => i.importance === 2).length}개
            </p>
          </Card>
          <Card className={`p-4 ${
            isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-gray-800' // border-green-200에서 border-gray-800로
          }`}>
            <p className={`text-sm mb-1 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>발표 완료</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-200' : 'text-green-900'}`}>
              {filteredIndicators.filter(i => i.actual_value !== null).length}개
            </p>
          </Card>
        </div>

        {/* Indicators by Date */}
        <div className="space-y-6">
          {Object.entries(groupedByDate)
            .sort(([dateA], [dateB]) => {
              const a = new Date(dateA);
              const b = new Date(dateB);
              return b.getTime() - a.getTime();
            })
            .map(([date, indicators]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {date}
                  </div>
                  <Badge variant="secondary">{indicators.length}개 지표</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {indicators.map(indicator => (
                    <Card
                      key={indicator.indicator_id}
                      className={`p-5 hover:shadow-lg transition-all cursor-pointer border-2 ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                          : 'bg-white border-gray-800 hover:border-blue-300' // border-gray-200에서 border-gray-800로
                      }`}
                      onClick={() => setSelectedIndicator(indicator)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{countryFlag[indicator.country]}</span>
                            <Badge variant="outline" className={getImportanceColor(indicator.importance)}>
                              {getImportanceLabel(indicator.importance)}
                            </Badge>
                            <Badge variant="outline" className={
                              isDarkMode
                                ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                                : 'bg-blue-50 text-blue-700 border-blue-300'
                            }>
                              {indicator.category}
                            </Badge>
                            {indicator.actual_value !== null && (
                              <div className={getActualValueColor(indicator)}>
                                {getImpactIcon(indicator)}
                              </div>
                            )}
                          </div>

                          <h3 className={`font-bold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {indicator.name}
                          </h3>
                          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {indicator.description}
                          </p>

                          {/* 수치 정보 */}
                          <div className="flex gap-6 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>전월: </span>
                              <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {indicator.prev_value}{indicator.unit}
                              </span>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>예상: </span>
                              <span className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                {indicator.forecast_value}{indicator.unit}
                              </span>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>실제: </span>
                              {indicator.actual_value !== null ? (
                                <span className={`font-bold ${getActualValueColor(indicator)}`}>
                                  {indicator.actual_value}{indicator.unit}
                                </span>
                              ) : (
                                <span className="font-semibold text-gray-400">미발표</span>
                              )}
                            </div>
                            {indicator.gap_analysis !== undefined && indicator.actual_value !== null && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>괴리율: </span>
                                <span className={`font-bold ${
                                  indicator.gap_analysis > 0 ? 'text-red-600' : 'text-blue-600'
                                }`}>
                                  {indicator.gap_analysis > 0 ? '+' : ''}{indicator.gap_analysis.toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 관련 종목 미리보기 */}
                          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              관련 종목: {indicator.large_cap.length + indicator.mid_cap.length + indicator.small_cap.length}개
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {indicator.large_cap.slice(0, 3).map(stock => (
                                <Badge key={stock.code} variant="secondary" className="text-xs">
                                  {stock.name}
                                </Badge>
                              ))}
                              {indicator.large_cap.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{indicator.large_cap.length - 3}개 더보기
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          <ChevronRight className="size-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIndicator && (
        <IndicatorDetailModal
          indicator={selectedIndicator}
          onClose={() => setSelectedIndicator(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}