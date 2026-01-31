// 경제 지표 기준치 및 해석 가이드

export interface IndicatorGuide {
  name: string; // 지표명
  basePoint: string; // 기준점 (평균치)
  highInterpretation: string; // 수치 높음 (Actual > 기준)
  lowInterpretation: string; // 수치 낮음 (Actual < 기준)
}

export const indicatorGuides: Record<string, IndicatorGuide> = {
  // PMI 관련
  'PMI': {
    name: 'PMI (제조업/서비스)',
    basePoint: '50.0',
    highInterpretation: '경기 확장 (호재)',
    lowInterpretation: '경기 위축 (악재)'
  },
  '제조업 PMI': {
    name: 'PMI (제조업/서비스)',
    basePoint: '50.0',
    highInterpretation: '경기 확장 (호재)',
    lowInterpretation: '경기 위축 (악재)'
  },
  '서비스업 PMI': {
    name: 'PMI (제조업/서비스)',
    basePoint: '50.0',
    highInterpretation: '경기 확장 (호재)',
    lowInterpretation: '경기 위축 (악재)'
  },
  
  // CPI 관련
  'CPI': {
    name: 'CPI (소비자물가)',
    basePoint: '2.0% (YoY)',
    highInterpretation: '인플레이션 (금리 인상)',
    lowInterpretation: '디플레이션/안정 (금리 인하)'
  },
  '소비자물가': {
    name: 'CPI (소비자물가)',
    basePoint: '2.0% (YoY)',
    highInterpretation: '인플레이션 (금리 인상)',
    lowInterpretation: '디플레이션/안정 (금리 인하)'
  },
  
  // 고용 관련
  '비농업고용': {
    name: '비농업고용 (NFP)',
    basePoint: '20만 건',
    highInterpretation: '경기 과열 (달러 강세)',
    lowInterpretation: '경기 침체 (금리 인하 기대)'
  },
  'NFP': {
    name: '비농업고용 (NFP)',
    basePoint: '20만 건',
    highInterpretation: '경기 과열 (달러 강세)',
    lowInterpretation: '경기 침체 (금리 인하 기대)'
  },
  '고용': {
    name: '비농업고용 (NFP)',
    basePoint: '20만 건',
    highInterpretation: '경기 과열 (달러 강세)',
    lowInterpretation: '경기 침체 (금리 인하 기대)'
  },
  
  // 실업률
  '실업률': {
    name: '실업률',
    basePoint: '4.0~5.0%',
    highInterpretation: '고용 시장 악화',
    lowInterpretation: '완전 고용 상태'
  },
  
  // 원유재고
  '원유재고': {
    name: '원유재고',
    basePoint: '0 (예상치 대비)',
    highInterpretation: '공급 과잉 (유가 하락)',
    lowInterpretation: '수요 부족/재고 감소 (유가 상승)'
  },
  
  // GDP
  'GDP': {
    name: 'GDP (성장률)',
    basePoint: '2.5%',
    highInterpretation: '성장 궤도',
    lowInterpretation: '저성장/경기 불황'
  },
  '성장률': {
    name: 'GDP (성장률)',
    basePoint: '2.5%',
    highInterpretation: '성장 궤도',
    lowInterpretation: '저성장/경기 불황'
  }
};

// 지표명으로 가이드 찾기
export function getIndicatorGuide(eventTitle: string): IndicatorGuide | null {
  // 정확한 매칭 먼저 시도
  if (indicatorGuides[eventTitle]) {
    return indicatorGuides[eventTitle];
  }
  
  // 부분 매칭 시도
  for (const key in indicatorGuides) {
    if (eventTitle.includes(key) || key.includes(eventTitle)) {
      return indicatorGuides[key];
    }
  }
  
  return null;
}
