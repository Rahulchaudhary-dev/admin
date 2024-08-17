import { Theme, ThemeOptions } from '@mui/material/styles';

export type AppWrapperProps = {
  children: React.ReactNode | React.ReactNode[];
};
export type ThemeOptionsType = ThemeOptions & {
  customStylings?: Record<string, string>;
};
export type ThemeType = Theme & { customStylings?: Record<string, string> };
