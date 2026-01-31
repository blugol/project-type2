import { Stock, StockCategory, EconomicEvent } from './types';

// ===================================================================
// 샘플 데이터 (예시용)
// 실제 운영 시에는 /src/app/data/uploaded/ 폴더의 JSON 파일을 사용하세요
// ===================================================================

// 모크 주식 데이터
const semiconductorStocks: StockCategory[] = [
  {
    tier: 'major',
    tierName: '대장주 (대기업)',
    stocks: [
      { code: '005930', name: '삼성전자', sector: '반도체 제조업' },
      { code: '000660', name: 'SK하이닉스', sector: '반도체 제조업' },
    ]
  },
  {
    tier: 'mid',
    tierName: '중견기업',
    stocks: [
      { code: '042700', name: '한미반도체', sector: '특수 목적용 기계 제조업' },
      { code: '067310', name: '하나마이크론', sector: '반도체 제조업' },
      { code: '222800', name: '심텍', sector: '인쇄회로기판(PCB) 제조업' },
    ]
  },
  {
    tier: 'small',
    tierName: '소기업',
    stocks: [
      { code: '060310', name: '3S', sector: '측정, 시험, 항해, 제어 및 기타 정밀기기 제조업; 광학기기 제외,반도체 웨이퍼 캐리어' },
      { code: '265520', name: 'AP시스템', sector: '특수 목적용 기계 제조업,디스플레이 제조 장비' },
      { code: '211270', name: 'AP위성', sector: '통신 및 방송 장비 제조업,위성통신 단말기' },
    ]
  }
];

const batteryStocks: StockCategory[] = [
  {
    tier: 'major',
    tierName: '대장주 (대기업)',
    stocks: [
      { code: '373220', name: 'LG에너지솔루션', sector: '배터리' },
      { code: '066970', name: '엘앤에프', sector: '배터리' },
    ]
  },
  {
    tier: 'mid',
    tierName: '중견기업',
    stocks: [
      { code: '086520', name: '에코프로', sector: '배터리' },
      { code: '247540', name: '에코프로비엠', sector: '배터리' },
      { code: '278280', name: '천보', sector: '배터리' },
    ]
  },
  {
    tier: 'small',
    tierName: '소기업',
    stocks: [
      { code: '328130', name: '루닛', sector: '배터리' },
      { code: '267980', name: '매일유업', sector: '배터리' },
      { code: '189860', name: '서울반도체', sector: '배터리' },
    ]
  }
];

const exportStocks: StockCategory[] = [
  {
    tier: 'major',
    tierName: '대장주 (대기업)',
    stocks: [
      { code: '005380', name: '현대자동차', sector: '자동차' },
      { code: '051910', name: 'LG화학', sector: '화학' },
    ]
  },
  {
    tier: 'mid',
    tierName: '중견기업',
    stocks: [
      { code: '012330', name: '현대모비스', sector: '자동차 부품' },
      { code: '000270', name: '기아', sector: '자동차' },
    ]
  },
  {
    tier: 'small',
    tierName: '소기업',
    stocks: [
      { code: '204320', name: '만도', sector: '자동차 부품' },
      { code: '064960', name: '에스엠', sector: '자동차 부품' },
    ]
  }
];

const interestRateStocks: StockCategory[] = [
  {
    tier: 'major',
    tierName: '대장주 (대기업)',
    stocks: [
      { code: '055550', name: '신한지주', sector: '금융' },
      { code: '086790', name: '하나금융지주', sector: '금융' },
      { code: '105560', name: 'KB금융', sector: '금융' },
    ]
  },
  {
    tier: 'mid',
    tierName: '중견기업',
    stocks: [
      { code: '029780', name: '삼성카드', sector: '금융' },
      { code: '138930', name: 'BNK금융지주', sector: '금융' },
    ]
  },
  {
    tier: 'small',
    tierName: '소기업',
    stocks: [
      { code: '006220', name: '제주은행', sector: '금융' },
      { code: '024110', name: '기업은행', sector: '금융' },
    ]
  }
];

// 모크 경제 일정 데이터
export const mockEconomicEvents: EconomicEvent[] = [
  {
    id: 'today-1',
    date: new Date(), // 오늘 날짜로 설정
    title: '미국 비농업 고용지수 발표',
    description: '미국 노동부의 1월 비농업 고용 통계가 발표됩니다.',
    category: '고용지표',
    categoryColor: '#EF4444',
    importance: 'high',
    country: 'US',
    prev_value: 120,
    forecast_value: 100,
    actual_value: 41,
    unit: 'K',
    gap_analysis: -59,
    base_guide: '고용 지표가 예상치를 크게 하회하면 경기 침체 우려가 커지며, 금리 인하 기대감이 높아질 수 있습니다. 반도체, IT 기업들의 고용 감소는 업황 악화 신호일 수 있습니다.',
    tooltip: '비농업 고용지수(NFP)는 미국 경제의 건강도를 측정하는 핵심 지표입니다. 농업, 정부, 비영리 단체를 제외한 모든 사업체의 신규 고용 인원을 집계하며, 매월 첫째 주 금요일에 발표됩니다.',
    lastUpdated: new Date(2026, 0, 31),
    details: `미국 1월 비농업 고용이 예상치를 크게 하회했습니다.

주요 원인:
• 기술 업계 대규모 감원 지속
• 제조업 고용 감소
• 소비 위축으로 서비스업 고용 둔화

시장 영향:
금리 인하 기대감이 높아지면서 성장주에 긍정적일 수 있으나, 경기 침체 우려도 동반됩니다.`,
    relatedStocks: semiconductorStocks
  },
  {
    id: '1',
    date: new Date(2026, 0, 15),
    title: '반도체 수출 실적 발표',
    description: '1월 반도체 수출 실적이 전년 대비 25% 증가하며 역대 최고치를 경신했습니다.',
    category: '반도체',
    categoryColor: '#3B82F6',
    importance: 'high',
    country: 'KR',
    prev_value: 120,
    forecast_value: 140,
    actual_value: 150,
    unit: '억 달러',
    gap_analysis: 7.14, // (150-140)/140*100
    base_guide: '반도체 수출액이 예상치를 상회하면 관련 주식에 긍정적 영향을 미치며, 특히 AI 반도체와 메모리 반도체 기업의 수익성 개선이 기대됩니다.',
    tooltip: '반도체 수출 실적은 한국 경제의 핵심 지표로, 글로벌 IT 수요와 직결됩니다. AI 붐으로 인해 HBM 등 고부가 제품 수출이 급증하고 있습니다.',
    lastUpdated: new Date(2026, 0, 31), // 2026년 1월 31일 업데이트
    details: `반도체 수출액이 150억 달러를 돌파하며 전년 동월 대비 25% 증가했습니다.

주요 원인:
• AI 반도체 수요 급증 (40% 증가)
• 메모리 반도체 가격 상승 (평균 15%)
• 중국 시장 회복세 (20% 증가)

향후 전망:
2026년 상반기에도 이러한 성장세가 지속될 것으로 예상됩니다. 특히 AI 서버용 HBM(고대역폭 메모리) 수요가 계속 증가할 것으로 보입니다.`,
    relatedStocks: semiconductorStocks
  },
  {
    id: '2',
    date: new Date(2026, 0, 20),
    title: '한국은행 금리 결정',
    description: '한국은행 금융통화위원회가 기준금리를 동결할 것으로 예상됩니다.',
    category: '금정책',
    categoryColor: '#10B981',
    importance: 'high',
    country: 'KR',
    details: `한국은행이 2월 금융통화위원회에서 기준금리를 현행 3.50%로 동결할 것으로 전망니다.

결정 배경:
• 물가 상승률 안정세 (2.8%)
• 경제 성장률 둔화 우려
• 글로벌 금융시장 불확실성

시장 영향:
금리 동결 시 은행주의 단기 변동성이 예상되며, 부동산 시장에는 제한적인 영향이 있을 것으로 보입니다.`,
    relatedStocks: interestRateStocks
  },
  {
    id: '3',
    date: new Date(2026, 0, 25),
    title: '2차전지 기업 실적 발표',
    description: '주요 2차전지 기업들의 4분기 실적이 발표됩니다.',
    category: '2차전지',
    categoryColor: '#F59E0B',
    importance: 'medium',
    country: 'KR',
    details: `국내 주요 배터리 제조사들의 4분기 실적 발표가 예정되어 있습니다.

예상 실적:
• LG에너지솔루션: 매출 8조원 (+15% YoY)
• SK온: 적자  감소 예상
• 삼성SDI: 영업이익 개선

주요 이슈:
전기차 시장 성장 둔화에도 불구하고 ESS(에너지저장장치) 부문의 강세가 실적을 견인할 것으로 예상됩니다.`,
    relatedStocks: batteryStocks
  },
  {
    id: '4',
    date: new Date(2026, 0, 28),
    title: '수출입 통계 발표',
    description: '1월 무역수지 및 수출입 통계가 발표됩니다.',
    category: '무역',
    categoryColor: '#8B5CF6',
    importance: 'medium',
    country: 'KR',
    details: `산업통상자원부가 1월 무역계를 발표합니다.

예상 수치:
• 수출: 580억 달러 (+12% YoY)
• 수입: 550억 달러 (+8% YoY)
• 무역수지: 30억 달러 흑자

품목별 동향:
반도체(+25%), 자동차(+18%), 석유화학(+5%) 등이 수출 증가를 주도할 것으로 예상됩니다.`,
    relatedStocks: exportStocks
  },
  {
    id: '5',
    date: new Date(2026, 1, 5),
    title: 'AI 반도체 신규 투자 발표',
    description: '삼성전자가 AI 반도체 분야에 대규모 투자를 발표할 예정입니다.',
    category: '반도체',
    categoryColor: '#3B82F6',
    importance: 'high',
    country: 'KR',
    details: `삼성전자가 AI 반도체 개발에 3년간 20조원을 투자한다고 발표할 예정입니다.

투자 계획:
• 파운드리 사업 강화: 10조원
• AI 칩 개: 7조원
• 인프라 구축: 3조원

기대 효과:
2027년까지 차세대 AI 반도체 양산 체제를 갖추고, 글로벌 시장 점유율을 현재 15%에서 25%로 확대할 계획입니다.`,
    relatedStocks: semiconductorStocks
  },
  {
    id: '6',
    date: new Date(2026, 1, 12),
    title: '전기차 보조금 정책 발표',
    description: '정부가 2026년 전기차 구매 보조금 정책을 발표합니다.',
    category: '2차전지',
    categoryColor: '#F59E0B',
    importance: 'medium',
    country: 'KR',
    details: `환경부가 2026년 전기차 구매 보조금 정책을 확정 발표합니다.

주요 내용:
• 국고보조금: 차량당 최대 600만원
• 지자체 보조금: 지역별 차등 지원
• 충전 인프라 확대: 3000개소 추 구축

영향 분석:
보조금 지원 확대로 전기차 판매가 전년 대비 30% 증가할 것으로 예상되며, 배터리 제조사들의 수주 증가가 기대됩니다.`,
    relatedStocks: batteryStocks
  },
  {
    id: '7',
    date: new Date(2026, 1, 18),
    title: '소비자물가지수 발표',
    description: '1월 소비자물가지수가 발표되며 금리 정책에 영향을 줄 전망입니다.',
    category: '금융정책',
    categoryColor: '#10B981',
    importance: 'high',
    country: 'KR',
    details: `통계청이 1월 소비자물가지수를 발표합다.

예상치:
• 전년 동월 대비: 2.6% 상승
• 전월 대비: 0.3% 상승
• 근원물가: 2.2% 상승

시사점:
물가 상승률이 한국은행 목표치(2.0%) 근처에서 안정화되고 있어, 향후 금리 인하 가능성이 높아질 것으로 예상됩니다.`,
    relatedStocks: interestRateStocks
  },
  {
    id: '8',
    date: new Date(2026, 1, 22),
    title: '자동차 생산 통계 발표',
    description: '1월 국내 자동차 생산 및 판매 계가 발표됩니다.',
    category: '무역',
    categoryColor: '#8B5CF6',
    importance: 'low',
    country: 'KR',
    details: `한국자동차산업협회가 1월 자동차 산업 동향을 발표합니다.

예상 실적:
• 국내 생산: 35만대 (+8% YoY)
• 내수 판매: 15만대 (+5% YoY)
• 수출: 20만대 (+10% YoY)

특징:
전기차 및 하이브리드 차량의 생산 비중이 전체의 40%를 넘어서며 친환경차 전환이 가속화되고 있습니다.`,
    relatedStocks: exportStocks
  }
];