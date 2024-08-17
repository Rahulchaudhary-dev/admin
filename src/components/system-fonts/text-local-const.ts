export type IntentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'b1' | 'b2' | 'b3';
export type FontWeightType = 'light' | 'normal' | 'medium' | 'bold';
export type SysFontFamilyType = 'Rubik' | 'Playfair Display';

export const fontSizeDesktop: Record<IntentType, string> = {
  h1: '80px',
  h2: '60px',
  h3: '34px',
  h4: '26px',
  h5: '21px',
  b1: '18px',
  b2: '16px',
  b3: '12px',
};

export const fontSizeTab: Record<IntentType, string> = {
  h1: '64px',
  h2: '48px',
  h3: '28px',
  h4: '21px',
  h5: '16px',
  b1: '16px',
  b2: '14px',
  b3: '12px',
};

export const fontSizeMobile: Record<IntentType, string> = {
  h1: '34px',
  h2: '28px',
  h3: '21px',
  h4: '20px',
  h5: '16px',
  b1: '14px',
  b2: '12px',
  b3: '12px',
};

export const fontWeightType: Record<FontWeightType, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 600,
};

export const fontColorType: Record<
  'light' | 'dark' | 'sys_gray' | 'sys_golden' | 'sys_success' | 'sys_danger',
  string
> = {
  dark: '#171A1D',
  light: '#fff',
  sys_gray: '#666666',
  sys_golden: '#B89D4F',
  sys_success: '#0A9500',
  sys_danger: '#BA0635',
};
