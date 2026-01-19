/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export const getTodayDate = (): string => {
  const today = new Date();
  return formatDate(today);
};

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD 문자열을 'YYYY년 MM월 DD일' 형식으로 변환
 */
export const formatDisplayDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 두 날짜 사이의 일수 차이 계산
 */
export const getDaysDifference = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * 특정 날짜의 요일 반환 (0: 일요일 ~ 6: 토요일)
 */
export const getDayOfWeek = (dateStr: string): number => {
  const date = new Date(dateStr);
  return date.getDay();
};

/**
 * 요일 숫자를 한글로 변환
 */
export const getDayOfWeekKorean = (dayNum: number): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayNum];
};

/**
 * 이번 주의 시작일과 종료일 반환 (월요일 시작)
 */
export const getWeekRange = (date: Date = new Date()): { start: string; end: string } => {
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 월요일 기준
  
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    start: formatDate(monday),
    end: formatDate(sunday),
  };
};

/**
 * 이번 달의 시작일과 종료일 반환
 */
export const getMonthRange = (date: Date = new Date()): { start: string; end: string } => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay),
  };
};
