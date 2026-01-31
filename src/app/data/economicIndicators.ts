import { EconomicIndicator } from '@/app/types/indicator';

// Mock 경제 지표 데이터
export const economicIndicators: EconomicIndicator[] = [
  {
    indicator_id: 'US_NFP_01',
    category: 'Employment',
    importance: 3,
    name: '미국 비농업 고용지수 (NFP)',
    description: '전국 비농업 부문의 고용 변화량을 나타내는 지표로, 경기 방향성을 가장 직관적으로 보여줍니다.',
    base_guide: '100K 이상이면 양호, 200K 이상이면 매우 강함',
    country: 'US',
    releaseDate: new Date(2026, 0, 10), // 1월 10일
    prev_value: 120,
    forecast_value: 100,
    actual_value: 41,
    unit: 'K',
    gap_analysis: -59,
    headline_pool: {
      good: '고용 시장 활황, 미국 경제 탄탄한 성장세',
      bad: '고용 시장 한파, 경기 침체 공포가 주식 시장 덮치나',
      neutral: '고용 지표 예상치 부합, 시장 반응 제한적'
    },
    large_cap: [
      {
        code: '005930',
        name: '삼성전자',
        desc: '글로벌 수요 민감, 미국 고용 악화 시 IT 수요 감소',
        price: 71500,
        change: -2300,
        changePercent: -3.12,
        marketCap: '시가총액 427조원'
      },
      {
        code: '000660',
        name: 'SK하이닉스',
        desc: 'HBM 수출 비중 높음, 미국 경기 영향 직접적',
        price: 185000,
        change: -5500,
        changePercent: -2.89,
        marketCap: '시가총액 134조원'
      }
    ],
    mid_cap: [
      {
        code: '042700',
        name: '한미반도체',
        desc: 'HBM 테스트 장비 공급, 반도체 CAPEX 연동',
        price: 89000,
        change: -3200,
        changePercent: -3.47,
        marketCap: '시가총액 7.2조원'
      },
      {
        code: '095340',
        name: 'ISC',
        desc: '반도체 테스트 솔루션, 수출 의존도 높음',
        price: 52300,
        change: -1800,
        changePercent: -3.33,
        marketCap: '시가총액 2.1조원'
      }
    ],
    small_cap: [
      {
        code: '399720',
        name: '가온칩스',
        desc: 'AI 반도체 디자인하우스, 물량 변동 민감',
        price: 34200,
        change: -1500,
        changePercent: -4.20,
        marketCap: '시가총액 0.8조원'
      }
    ],
    history: [
      { date: new Date(2025, 7, 1), value: 142, forecast: 135 },
      { date: new Date(2025, 8, 1), value: 159, forecast: 140 },
      { date: new Date(2025, 9, 1), value: 138, forecast: 145 },
      { date: new Date(2025, 10, 1), value: 105, forecast: 130 },
      { date: new Date(2025, 11, 1), value: 120, forecast: 115 },
      { date: new Date(2026, 0, 1), value: 41, forecast: 100 }
    ],
    tooltip: 'NFP(Non-Farm Payroll)는 농업을 제외한 모든 산업의 고용 변화를 측정합니다. 미국 연방준비제도(Fed)의 금리 정책에 가장 큰 영향을 주는 지표입니다.'
  },
  {
    indicator_id: 'US_CPI_01',
    category: 'Inflation',
    importance: 3,
    name: '미국 소비자물가지수 (CPI)',
    description: '소비자가 구매하는 상품과 서비스의 평균 가격 변동을 측정하는 지표',
    base_guide: '2% 목표치 기준, 높을수록 물가상승 압력',
    country: 'US',
    releaseDate: new Date(2026, 0, 15),
    prev_value: 2.7,
    forecast_value: 2.9,
    actual_value: 3.4,
    unit: '%',
    gap_analysis: 17.2,
    headline_pool: {
      good: '물가 안정 신호, 금리 인하 기대감 고조',
      bad: '물가 상승 가속화, 긴축 장기화 우려',
      neutral: 'CPI 예상치 부합, 연준 정책 방향성 유지'
    },
    large_cap: [
      {
        code: '105560',
        name: 'KB금융',
        desc: '금리 상승 시 순이자마진(NIM) 개선 효과',
        price: 78200,
        change: 2100,
        changePercent: 2.76,
        marketCap: '시가총액 32조원'
      },
      {
        code: '055550',
        name: '신한지주',
        desc: '대출 금리 인상 수혜, 예대마진 확대',
        price: 52300,
        change: 1500,
        changePercent: 2.95,
        marketCap: '시가총액 38조원'
      }
    ],
    mid_cap: [
      {
        code: '029780',
        name: '삼성카드',
        desc: '금리 상승 시 카드론 마진율 개선',
        price: 38900,
        change: 800,
        changePercent: 2.10,
        marketCap: '시가총액 5.3조원'
      }
    ],
    small_cap: [
      {
        code: '138930',
        name: 'BNK금융지주',
        desc: '지방은행, 금리 민감도 높음',
        price: 9240,
        change: 180,
        changePercent: 1.99,
        marketCap: '시가총액 2.8조원'
      }
    ],
    history: [
      { date: new Date(2025, 7, 1), value: 2.9, forecast: 3.0 },
      { date: new Date(2025, 8, 1), value: 2.5, forecast: 2.6 },
      { date: new Date(2025, 9, 1), value: 2.4, forecast: 2.5 },
      { date: new Date(2025, 10, 1), value: 2.6, forecast: 2.4 },
      { date: new Date(2025, 11, 1), value: 2.7, forecast: 2.7 },
      { date: new Date(2026, 0, 1), value: 3.4, forecast: 2.9 }
    ],
    tooltip: 'CPI는 도시 소비자들이 구매하는 상품과 서비스 바구니의 가격 변화를 추적합니다. 연준의 금리 결정에 핵심적인 영향을 미칩니다.'
  },
  {
    indicator_id: 'KR_GDP_01',
    category: 'GDP',
    importance: 3,
    name: '한국 GDP 성장률',
    description: '국내총생산의 전년 대비 또는 전분기 대비 성장률',
    base_guide: '연 3% 이상이면 양호, 2% 미만이면 저성장',
    country: 'KR',
    releaseDate: new Date(2026, 0, 25),
    prev_value: 2.2,
    forecast_value: 2.5,
    actual_value: null, // 아직 발표 전
    unit: '%',
    headline_pool: {
      good: '한국 경제 회복세, 내수 소비 살아나',
      bad: 'GDP 쇼크, 경기 침체 본격화',
      neutral: 'GDP 성장률 예상치 수준, 완만한 회복세'
    },
    large_cap: [
      {
        code: '005930',
        name: '삼성전자',
        desc: 'GDP 증가 시 반도체 수요 증가',
        price: 71500,
        change: 0,
        changePercent: 0,
        marketCap: '시가총액 427조원'
      },
      {
        code: '005380',
        name: '현대차',
        desc: '내수 경기 연동성 높음, 자동차 판매 직결',
        price: 245000,
        change: 0,
        changePercent: 0,
        marketCap: '시가총액 52조원'
      }
    ],
    mid_cap: [
      {
        code: '012330',
        name: '현대모비스',
        desc: '자동차 부품, 내수 경기 민감',
        price: 289000,
        change: 0,
        changePercent: 0,
        marketCap: '시가총액 43조원'
      }
    ],
    small_cap: [
      {
        code: '064960',
        name: 'SNT모티브',
        desc: '2차전지 소재, 투자 심리 영향',
        price: 58300,
        change: 0,
        changePercent: 0,
        marketCap: '시가총액 1.2조원'
      }
    ],
    history: [
      { date: new Date(2025, 7, 1), value: 2.8, forecast: 2.6 },
      { date: new Date(2025, 8, 1), value: 2.3, forecast: 2.5 },
      { date: new Date(2025, 9, 1), value: 2.0, forecast: 2.3 },
      { date: new Date(2025, 10, 1), value: 2.1, forecast: 2.2 },
      { date: new Date(2025, 11, 1), value: 2.2, forecast: 2.4 }
    ],
    tooltip: 'GDP는 한 나라의 경제 규모와 성장률을 나타내는 가장 중요한 거시경제 지표입니다.'
  },
  {
    indicator_id: 'US_PMI_01',
    category: 'Manufacturing',
    importance: 2,
    name: '미국 제조업 PMI',
    description: '제조업 구매관리자 지수, 기업 활동의 확장/위축을 나타냄',
    base_guide: '50 기준, 50 이상이면 확장, 미만이면 위축',
    country: 'US',
    releaseDate: new Date(2026, 0, 5),
    prev_value: 49.3,
    forecast_value: 49.5,
    actual_value: 47.8,
    unit: 'Pt',
    gap_analysis: -3.4,
    headline_pool: {
      good: '제조업 회복 신호, 글로벌 수요 증가세',
      bad: '제조업 위축 심화, 산업 경기 둔화',
      neutral: 'PMI 보합권, 제조업 현상 유지'
    },
    large_cap: [
      {
        code: '005490',
        name: 'POSCO홀딩스',
        desc: '제조업 PMI와 철강 수요 직접 연동',
        price: 392000,
        change: -8500,
        changePercent: -2.12,
        marketCap: '시가총액 34조원'
      }
    ],
    mid_cap: [
      {
        code: '010140',
        name: '삼성중공업',
        desc: '조선업 수주, 제조업 경기 민감',
        price: 12450,
        change: -320,
        changePercent: -2.51,
        marketCap: '시가총액 7.8조원'
      }
    ],
    small_cap: [
      {
        code: '001570',
        name: '금양',
        desc: '화학 소재, 제조업 수요 변동',
        price: 89200,
        change: -2100,
        changePercent: -2.30,
        marketCap: '시가총액 1.4조원'
      }
    ],
    history: [
      { date: new Date(2025, 7, 1), value: 51.2, forecast: 50.8 },
      { date: new Date(2025, 8, 1), value: 50.5, forecast: 51.0 },
      { date: new Date(2025, 9, 1), value: 49.8, forecast: 50.2 },
      { date: new Date(2025, 10, 1), value: 49.1, forecast: 49.5 },
      { date: new Date(2025, 11, 1), value: 49.3, forecast: 49.0 },
      { date: new Date(2026, 0, 1), value: 47.8, forecast: 49.5 }
    ],
    tooltip: 'PMI(Purchasing Managers Index)는 50을 기준으로 경기 확장과 위축을 판단합니다. 선행지표로서 중요도가 높습니다.'
  }
];

// 지표 분석 리포트 생성 함수
export function generateReport(indicator: EconomicIndicator) {
  if (indicator.actual_value === null) {
    return null;
  }

  const diff = indicator.actual_value - indicator.forecast_value;
  const isGood = diff > 0;
  const isNeutral = Math.abs(diff) < (indicator.forecast_value * 0.05); // 5% 이내면 중립

  let impact: 'positive' | 'negative' | 'neutral';
  let headline: string;
  let summary: string;

  if (isNeutral) {
    impact = 'neutral';
    headline = indicator.headline_pool.neutral;
    summary = `${indicator.name}이(가) ${indicator.actual_value}${indicator.unit}로 발표되었습니다. 이는 시장 예상치인 ${indicator.forecast_value}${indicator.unit}와 유사한 수준으로, 시장에 큰 서프라이즈는 없을 것으로 보입니다.`;
  } else if (isGood) {
    impact = 'positive';
    headline = indicator.headline_pool.good;
    summary = `${indicator.name}이(가) ${indicator.actual_value}${indicator.unit}로 집계되었습니다. 이는 예상치인 ${indicator.forecast_value}${indicator.unit}를 크게 상회하는 수치로, ${indicator.category === 'Employment' ? '고용 시장이 예상보다 견조함' : indicator.category === 'Inflation' ? '물가 상승 압력이 예상보다 강함' : '경기가 예상보다 양호함'}을 나타냅니다.`;
  } else {
    impact = 'negative';
    headline = indicator.headline_pool.bad;
    summary = `${indicator.name}이(가) ${indicator.actual_value}${indicator.unit}로 발표되었습니다. 이는 예상치인 ${indicator.forecast_value}${indicator.unit}에 크게 못 미치는 수치로, ${indicator.category === 'Employment' ? '기업들이 신규 채용을 극도로 자제하고 있음' : indicator.category === 'Inflation' ? '물가 안정화 신호' : '경기 둔화 우려'}를 보여줍니다.`;
  }

  const marketSentiment = impact === 'positive' 
    ? '시장은 긍정적으로 반응할 것으로 예상되며, 관련 섹터 주식들의 상승이 기대됩니다.'
    : impact === 'negative'
    ? '시장은 부정적으로 반응할 가능성이 높으며, 관련 섹터에 투자 시 주의가 필요합니다.'
    : '시장은 제한적인 반응을 보일 것으로 예상됩니다.';

  const sectorImpact = [
    { sector: '반도체', impact: impact === 'positive' ? '수출 수요 증가 기대' : '글로벌 수요 위축 우려' },
    { sector: '금융', impact: impact === 'positive' ? '대출 수요 증가' : '부실 채권 증가 리스크' },
    { sector: '제조업', impact: impact === 'positive' ? '설비 투자 확대' : '가동률 하락 우려' }
  ];

  return {
    headline,
    summary,
    impact,
    marketSentiment,
    sectorImpact
  };
}
