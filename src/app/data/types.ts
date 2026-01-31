// 주식 종목 인터페이스
export interface Stock {
  code: string;       // 종목번호
  name: string;       // 종목이름
  sector: string;     // 관련재료업황섹터
  marketCap?: number; // 시가총액 (원) - 선택적
}

// 주식 카테고리 (대장주/중견기업/소기업)
export interface StockCategory {
  tier: 'major' | 'mid' | 'small';
  tierName: string;
  stocks: Stock[];
}

// 경제 일정 이벤트
export interface EconomicEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  importance: 'high' | 'medium' | 'low';
  country: 'KR' | 'US' | 'JP' | 'CN';
  details?: string;
  relatedStocks?: StockCategory[];
  // 수치 데이터
  prev_value?: number;
  forecast_value?: number;
  actual_value?: number | null;
  unit?: string;
  // 데이터 업데이트 날짜
  lastUpdated?: Date;
  // 경제 지표 추가 정보
  gap_analysis?: number; // 괴리율 (actual - forecast) / forecast * 100
  base_guide?: string; // 해석 가이드
  tooltip?: string; // 툴팁 설명
}

// JSON 파일에서 로드할 일정 데이터 형식 (실제 업로드 형식)
export interface ScheduleItem {
  time: string;           // "23:45" 또는 "하루 종일"
  currency: string;       // "USD", "KRW", "JPY", "CNY"
  event: string;          // "제조업 구매관리자지수 (1월)"
  value: string;          // "51.8" 또는 "휴일"
}

export interface EventJSON {
  date: string;           // "2026-02-02" (YYYY-MM-DD 형식)
  day: string;            // "월요일"
  schedules: ScheduleItem[];
}

// JSON 파일에서 로드할 종목 데이터 형식
export interface StockJSON {
  name: string;           // 종목이름
  code: string;           // 종목번호
  sector: string;         // 관련재료업황섹터
}