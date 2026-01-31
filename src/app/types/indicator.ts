// 경제 지표 타입 정의

export type ImportanceLevel = 1 | 2 | 3; // 3=High, 2=Medium, 1=Low

export type IndicatorCategory = 
  | 'Employment' 
  | 'Inflation' 
  | 'GDP' 
  | 'Manufacturing'
  | 'Housing'
  | 'Trade'
  | 'ConsumerConfidence';

export interface EconomicIndicator {
  indicator_id: string;
  category: IndicatorCategory;
  importance: ImportanceLevel;
  name: string;
  description: string;
  base_guide: string;
  country: 'KR' | 'US' | 'JP' | 'CN'; // 한국, 미국, 일본, 중국
  releaseDate: Date;
  
  // 수치 데이터
  prev_value: number;
  forecast_value: number;
  actual_value: number | null; // null이면 아직 발표 전
  unit: string; // 'K', 'M', '%', 'Pt' 등
  
  // 분석 데이터
  gap_analysis?: number; // (actual - forecast) / forecast * 100
  
  // 기사 생성용
  headline_pool: {
    good: string; // actual > forecast
    bad: string; // actual < forecast
    neutral: string; // actual ≈ forecast
  };
  
  // 종목 매핑
  large_cap: StockMapping[];
  mid_cap: StockMapping[];
  small_cap: StockMapping[];
  
  // 히스토리 데이터
  history?: HistoricalData[];
  
  // 가이드 툴팁
  tooltip?: string;
}

export interface StockMapping {
  code: string;
  name: string;
  desc: string; // 왜 이 지표와 관련이 있는지
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
}

export interface HistoricalData {
  date: Date;
  value: number;
  forecast?: number;
}

// 지표별 분석 리포트
export interface IndicatorReport {
  headline: string;
  summary: string;
  impact: 'positive' | 'negative' | 'neutral';
  marketSentiment: string;
  sectorImpact: {
    sector: string;
    impact: string;
  }[];
}
