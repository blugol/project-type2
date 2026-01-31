import { EconomicEvent, EventJSON, ScheduleItem, StockJSON, Stock, StockCategory } from './types';

/**
 * 국가/통화 코드 변환
 * @param currency "USD", "KRW", "JPY", "CNY" 등
 */
function normalizeCountry(currency: string): 'KR' | 'US' | 'JP' | 'CN' {
  const normalized = currency.toUpperCase();
  
  if (normalized === 'USD' || normalized === 'US' || normalized === '미국') return 'US';
  if (normalized === 'JPY' || normalized === 'JP' || normalized === '일본') return 'JP';
  if (normalized === 'CNY' || normalized === 'CN' || normalized === '중국') return 'CN';
  if (normalized === 'KRW' || normalized === 'KR' || normalized === '한국') return 'KR';
  
  return 'KR'; // 기본값
}

/**
 * 이벤트 카테고리 추출 (이벤트 제목에서 키워드로 판단)
 */
function extractCategory(event: string, value: string): string {
  if (value === '휴일') return '휴일';
  
  if (event.includes('물가') || event.includes('CPI') || event.includes('PPI')) return '물가';
  if (event.includes('GDP') || event.includes('경제성장')) return 'GDP';
  if (event.includes('고용') || event.includes('실업') || event.includes('일자리')) return '고용';
  if (event.includes('주택') || event.includes('부동산')) return '부동산';
  if (event.includes('제조업') || event.includes('PMI')) return '제조업';
  if (event.includes('무역') || event.includes('수출') || event.includes('수입')) return '무역';
  if (event.includes('소비') || event.includes('판매')) return '소비';
  if (event.includes('금리') || event.includes('통화정책')) return '금융정책';
  if (event.includes('원유') || event.includes('재고')) return '원자재';
  
  return '경제지표';
}

/**
 * 카테고리별 색상 매핑
 */
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    '휴일': '#6B7280',
    '물가': '#EF4444',
    'GDP': '#10B981',
    '고용': '#3B82F6',
    '부동산': '#EC4899',
    '제조업': '#8B5CF6',
    '무역': '#F59E0B',
    '소비': '#14B8A6',
    '금융정책': '#10B981',
    '원자재': '#F97316',
    '경제지표': '#6366F1',
  };
  
  return colorMap[category] || '#3B82F6';
}

/**
 * 중요도 판단 (휴일, 주요 지표 등)
 */
function determineImportance(event: string, value: string): 'high' | 'medium' | 'low' {
  if (value === '휴일') return 'low';
  
  // 주요 지표
  const highPriorityKeywords = ['GDP', 'CPI', '비농업', '고용', '금리', 'FOMC', '소비자물가'];
  if (highPriorityKeywords.some(keyword => event.includes(keyword))) return 'high';
  
  // 중간 중요도
  const mediumPriorityKeywords = ['PMI', '주택', '무역', '실업'];
  if (mediumPriorityKeywords.some(keyword => event.includes(keyword))) return 'medium';
  
  return 'low';
}

/**
 * 카테고리별 관련 키워드 매핑
 */
function getCategoryKeywords(category: string): string[] {
  const keywordMap: Record<string, string[]> = {
    '휴일': [],
    '물가': ['은행', '보험', '금융', '지주', '식품', '음식료', '유통', '소매', '백화점', '편의점', '카드', '바이오'],
    'GDP': ['금융', '은행', '증권', '보험', '건설', '지주'],
    '고용': ['IT', 'IT서비스', '소프트웨어', '플랫폼', '서비스', '로봇', '자동화', 'AI', '인공지능', '컴퓨터', '시스템', '통신'],
    '부동산': ['건설', '토목', '시멘트', '가구', '인테리어', '유리', '케이블', '건재'],
    '제조업': ['반도체', '자동차', '기계', '철강', '비철금속', '화학', '전자', '전기', '제조', '부품', '소재', '장비', '디스플레이', '공작기계'],
    '무역': ['반도체', '자동차', '기계', '철강', '화학', '조선', '해운'],
    '소비': ['화장품', '패션', '의류', '섬유', '엔터', '콘텐츠', '영화', '게임', '여행', '레저', '항공', '면세점'],
    '금융정책': ['은행', '증권', '금융', '보험', '카드', '지주'],
    '원자재': ['에너지', '정유', '석유', '화학', '태양광', '풍력', '배터리', '이차전지', '조선', '운수창고', '항공', '가스', '철강'],
    '경제지표': ['반도체', '자동차', '철강', '화학'], // 기본 제조업
  };
  
  return keywordMap[category] || [];
}

/**
 * 이벤트와 관련된 종목 찾기
 */
function findRelatedStocks(category: string, event: string, allStocks: Stock[]): StockCategory[] {
  // 휴일이거나 종목이 없으면 빈 배열 반환
  if (category === '휴일' || allStocks.length === 0) {
    return [];
  }
  
  // 카테고리 키워드 가져오기
  const keywords = getCategoryKeywords(category);
  
  // 이벤트 제목에서 추가 키워드 추출
  const eventKeywords: string[] = [];
  if (event.includes('반도체')) eventKeywords.push('반도체', '웨이퍼', '칩', '파운드리');
  if (event.includes('자동차')) eventKeywords.push('자동차', '전기차', '배터리', '모빌리티');
  if (event.includes('석유') || event.includes('원유')) eventKeywords.push('석유', '정유', '원유', '에너지');
  if (event.includes('철강')) eventKeywords.push('철강', '제철', '금속');
  if (event.includes('화학')) eventKeywords.push('화학', '석유화학', '정밀화학');
  if (event.includes('전자')) eventKeywords.push('전자', '전기', '디스플레이');
  
  // 전체 키워드 합치기
  const allKeywords = [...keywords, ...eventKeywords];
  
  if (allKeywords.length === 0) {
    return [];
  }
  
  // 키워드와 매칭되는 종목 찾기
  const matchedStocks = allStocks.filter(stock => {
    const sectorLower = stock.sector.toLowerCase();
    const nameLower = stock.name.toLowerCase();
    
    return allKeywords.some(keyword => {
      const keywordLower = keyword.toLowerCase();
      return sectorLower.includes(keywordLower) || nameLower.includes(keywordLower);
    });
  });
  
  // 매칭된 종목이 없으면 빈 배열 반환
  if (matchedStocks.length === 0) {
    return [];
  }
  
  // 시가총액 기준으로 종목 분류
  const categorizedStocks: Record<'major' | 'mid' | 'small', Stock[]> = {
    major: [],
    mid: [],
    small: []
  };
  
  for (const stock of matchedStocks) {
    const tier = classifyStockTier(stock.marketCap);
    categorizedStocks[tier].push(stock);
  }
  
  // 각 티어별로 시가총액 내림차순 정렬 (시가총액이 큰 것부터)
  categorizedStocks.major.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
  categorizedStocks.mid.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
  categorizedStocks.small.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
  
  // 각 티어별 최대 개수 제한
  const MAX_PER_TIER = 10;
  const MAX_TOTAL = 30;
  
  // 티어별로 제한 적용
  const limitedMajor = categorizedStocks.major.slice(0, MAX_PER_TIER);
  const limitedMid = categorizedStocks.mid.slice(0, MAX_PER_TIER);
  const limitedSmall = categorizedStocks.small.slice(0, MAX_PER_TIER);
  
  // 전체 종목 수가 30개를 초과하면 조정
  const totalCount = limitedMajor.length + limitedMid.length + limitedSmall.length;
  let finalMajor = limitedMajor;
  let finalMid = limitedMid;
  let finalSmall = limitedSmall;
  
  if (totalCount > MAX_TOTAL) {
    // 우선순위: 대장주 > 중견기업 > 소기업
    const majorCount = Math.min(limitedMajor.length, MAX_PER_TIER);
    const remainingAfterMajor = MAX_TOTAL - majorCount;
    const midCount = Math.min(limitedMid.length, Math.floor(remainingAfterMajor * 0.6));
    const smallCount = MAX_TOTAL - majorCount - midCount;
    
    finalMajor = limitedMajor.slice(0, majorCount);
    finalMid = limitedMid.slice(0, midCount);
    finalSmall = limitedSmall.slice(0, smallCount);
  }
  
  const categories: StockCategory[] = [];
  
  if (finalMajor.length > 0) {
    categories.push({
      tier: 'major',
      tierName: '대장주',
      stocks: finalMajor
    });
  }
  
  if (finalMid.length > 0) {
    categories.push({
      tier: 'mid',
      tierName: '중견기업',
      stocks: finalMid
    });
  }
  
  if (finalSmall.length > 0) {
    categories.push({
      tier: 'small',
      tierName: '소기업',
      stocks: finalSmall
    });
  }
  
  return categories;
}

/**
 * ScheduleItem을 EconomicEvent로 변환
 */
function convertScheduleToEvent(
  dateStr: string,
  schedule: ScheduleItem,
  allStocks: Stock[]
): EconomicEvent {
  // 날짜와 시간을 결합하여 Date 객체 생성
  const date = new Date(dateStr);
  
  // 시간 정보 파싱 및 설정
  if (schedule.time && schedule.time !== '하루 종일') {
    const [hours, minutes] = schedule.time.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      date.setHours(hours, minutes, 0, 0);
    }
  }
  
  const country = normalizeCountry(schedule.currency);
  const category = extractCategory(schedule.event, schedule.value);
  const categoryColor = getCategoryColor(category);
  const importance = determineImportance(schedule.event, schedule.value);
  
  // 시간 정보가 있는 경우에만 제목에 추가
  let eventTitle = schedule.event;
  // 제목에는 시간을 추가하지 않음 (Date 객체에 이미 포함되어 있으므로)
  
  // 값 정보 추가
  let description = schedule.event;
  if (schedule.value && schedule.value !== '휴일') {
    description += ` (예상: ${schedule.value})`;
  }
  
  return {
    id: `event_${date.getTime()}_${Math.random().toString(36).substr(2, 9)}`,
    date,
    title: eventTitle,
    description,
    category,
    categoryColor,
    importance,
    country,
    details: `${schedule.event} - ${schedule.value}`,
    relatedStocks: findRelatedStocks(category, schedule.event, allStocks),
    lastUpdated: new Date() // 데이터 로드 시점을 업데이트 날짜로 설정
  };
}

/**
 * JSON 파일에서 일정 데이터 로드
 */
export async function loadEventsFromJSON(): Promise<EconomicEvent[]> {
  try {
    // 동적 import로 JSON 로드 (에러 처리 포함)
    const eventsModule = await import('./uploaded/events.json');
    const eventsJSON: EventJSON[] = eventsModule.default;
    
    const stocks = await loadStocksFromJSON();
    
    // 모든 스케줄을 EconomicEvent로 변환
    const events: EconomicEvent[] = [];
    
    for (const eventDay of eventsJSON) {
      for (const schedule of eventDay.schedules) {
        events.push(convertScheduleToEvent(eventDay.date, schedule, stocks));
      }
    }
    
    return events;
  } catch (error) {
    console.error('⚠️ 일정 데이터 로드 중 오류:', error);
    return [];
  }
}

/**
 * JSON 파일에서 종목 데이터 로드
 */
export async function loadStocksFromJSON(): Promise<Stock[]> {
  try {
    // stocks2.json에서 시가총액 정보 로드 시도
    try {
      const stocks2Module = await import('./uploaded/stocks2.json');
      const stocks2JSON: any[] = stocks2Module.default;
      
      return stocks2JSON.map((s: any) => ({
        code: s.종목코드,
        name: s.종목명,
        sector: s.소속부 || '기타',
        marketCap: s.시가총액 || 0
      }));
    } catch (stocks2Error) {
      console.warn('⚠️ stocks2.json 로드 실패, stocks.json으로 대체:', stocks2Error);
      
      // stocks.json으로 폴백
      const stocksModule = await import('./uploaded/stocks.json');
      const stocksJSON: StockJSON[] = stocksModule.default;
      
      return stocksJSON.map(s => ({
        code: s.code,
        name: s.name,
        sector: s.sector || '기타',
        marketCap: undefined
      }));
    }
  } catch (error) {
    console.error('⚠️ 종목 데이터 로드 중 오류:', error);
    return [];
  }
}

/**
 * 시가총액 기준으로 티어 분류
 * 대형주: 2조 원 이상
 * 중형주: 5,000억 원 이상 ~ 2조 원 미만
 * 소형주: 5,000억 원 미만
 */
function classifyStockTier(marketCap: number | undefined): 'major' | 'mid' | 'small' {
  if (!marketCap || marketCap === 0) {
    // 시가총액 정보가 없으면 소기업으로 분류
    return 'small';
  }
  
  const TWO_TRILLION = 2_000_000_000_000; // 2조 원
  const FIVE_HUNDRED_BILLION = 500_000_000_000; // 5,000억 원
  
  if (marketCap >= TWO_TRILLION) {
    return 'major'; // 대형주
  } else if (marketCap >= FIVE_HUNDRED_BILLION) {
    return 'mid'; // 중형주
  } else {
    return 'small'; // 소형주
  }
}

/**
 * 종목 데이터를 카테고리별로 그룹화
 * @param stocks 전체 종목 리스트
 * @param stockCodes 선택된 종목 코드 배열
 */
export function groupStocksByTier(stocks: Stock[], stockCodes: string[]): StockCategory[] {
  const selectedStocks = stockCodes
    .map(code => stocks.find(s => s.code === code))
    .filter((s): s is Stock => s !== undefined);
  
  if (selectedStocks.length === 0) return [];
  
  // 시가총액 기준으로 티어 분류
  const categorizedStocks: Record<'major' | 'mid' | 'small', Stock[]> = {
    major: [],
    mid: [],
    small: []
  };
  
  for (const stock of selectedStocks) {
    const tier = classifyStockTier(stock.marketCap);
    categorizedStocks[tier].push(stock);
  }
  
  const categories: StockCategory[] = [];
  
  if (categorizedStocks.major.length > 0) {
    categories.push({
      tier: 'major',
      tierName: '대장주',
      stocks: categorizedStocks.major
    });
  }
  
  if (categorizedStocks.mid.length > 0) {
    categories.push({
      tier: 'mid',
      tierName: '중견기업',
      stocks: categorizedStocks.mid
    });
  }
  
  if (categorizedStocks.small.length > 0) {
    categories.push({
      tier: 'small',
      tierName: '소기업',
      stocks: categorizedStocks.small
    });
  }
  
  return categories;
}