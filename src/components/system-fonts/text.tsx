import { styled } from '@mui/material/styles';
import {
  FontWeightType,
  IntentType,
  SysFontFamilyType,
  fontColorType,
  fontSizeDesktop,
  fontSizeMobile,
  fontSizeTab,
  fontWeightType,
} from './text-local-const';

type SystemTextProps = {
  variant?: IntentType;
  fontWeight?: FontWeightType;
  fontFamily?: SysFontFamilyType;
  fontColor?:
    | 'light'
    | 'dark'
    | 'sys_gray'
    | 'sys_golden'
    | 'sys_success'
    | 'sys_danger';
};
export const SystemText = styled('p', {
  shouldForwardProp: (props) =>
    props !== 'variant' &&
    props !== 'fontWeight' &&
    props !== 'fontFamily' &&
    props !== 'fontColor',
})<SystemTextProps>(
  ({
    variant = 'h1',
    fontWeight = 'normal',
    fontFamily = 'Playfair Display',
    fontColor = 'dark',
    theme,
  }) => ({
    margin: '0px',
    padding: '0px',
    fontSize: fontSizeDesktop[variant],
    fontWeight: fontWeightType[fontWeight],
    fontFamily: fontFamily,
    color: fontColorType[fontColor],
    [theme.breakpoints.down('md')]: {
      fontSize: fontSizeTab[variant],
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: fontSizeMobile[variant],
    },
  })
);
