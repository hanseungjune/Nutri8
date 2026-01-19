/**
 * Nutri8 디자인 시스템 - 테마 정의
 * 6주차: UI/UX 개선
 */

// 컬러 팔레트 (개선된 버전)
export const Colors = {
  // Primary Colors (메인 브랜드 컬러)
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  primaryBg: '#E8F5E9',
  
  // Secondary Colors
  secondary: '#2196F3',
  secondaryLight: '#64B5F6',
  secondaryDark: '#1976D2',
  secondaryBg: '#E3F2FD',
  
  // Accent Colors
  accent: '#FF9800',
  accentLight: '#FFB74D',
  accentDark: '#F57C00',
  accentBg: '#FFF3E0',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
    inverse: '#FFFFFF',
  },
  
  // Background Colors
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
    dark: '#EEEEEE',
  },
  
  // Border Colors
  border: {
    light: '#E0E0E0',
    main: '#BDBDBD',
    dark: '#9E9E9E',
  },
  
  // Chart Colors
  chart: {
    protein: '#FF6384',
    carbs: '#36A2EB',
    fat: '#FFCE56',
    calories: '#4CAF50',
  },
  
  // Gradient Colors
  gradient: {
    primary: ['#4CAF50', '#81C784'],
    secondary: ['#2196F3', '#64B5F6'],
    accent: ['#FF9800', '#FFB74D'],
  },
} as const;

// 타이포그래피
export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
} as const;

// 간격 (Spacing)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

// 둥근 모서리 (Border Radius)
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// 그림자 (Shadow)
export const Shadow = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// 애니메이션 Duration
export const Animation = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 500,
} as const;

// 공통 스타일 패턴
export const CommonStyles = {
  // Card 스타일
  card: {
    backgroundColor: Colors.background.paper,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    ...Shadow.base,
  },
  
  // Input 스타일
  input: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    fontSize: Typography.fontSize.md,
    backgroundColor: Colors.background.paper,
  },
  
  // Button 스타일
  button: {
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // 중앙 정렬
  centered: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Row (가로 정렬)
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
} as const;

// 테마 전체 export
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadow: Shadow,
  animation: Animation,
  common: CommonStyles,
} as const;

export type ThemeType = typeof Theme;
