const Colors = {
  light: {
    text:       '#111111',
    background: '#FFFFFF',
    surface:    '#FFF0F3',
    primary:    '#C9556F',
    secondary:  '#F5C0CC',
    accent:     '#FFE4EC',
    muted:      '#777777',
    link:       '#C9556F',
  },
  dark: {
    text:       '#FBF9F9',
    background: '#0E1422',
    surface:    '#141B2C',
    primary:    '#FF85A1',
    secondary:  '#FF85A1',
    accent:     '#1E2A3A',
    muted:      '#A3ADC2',
    link:       '#17B9C4',
  },
} as const;

export { Colors };
export type ColorScheme = 'light' | 'dark';
export type ColorKey = keyof typeof Colors.light;
