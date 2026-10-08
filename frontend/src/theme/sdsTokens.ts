export interface SdsThemeConfig {
  mode: 'dark' | 'light' | 'high_contrast';
  fontScale: 100 | 115 | 130;
  deviceView: 'web' | 'tablet' | 'mobile';
  userRole: 'Central Admin' | 'RICM Principal' | 'PACS Secretary' | 'Rural Trainee';
}

export const SDS_SPACING = {
  '2xs': '2px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export const SDS_RADII = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const SDS_COLORS = {
  navy: {
    950: '#070b14',
    900: '#0b132b',
    800: '#1c2541',
    700: '#3a506b',
  },
  saffron: {
    500: '#f59e0b',
    400: '#fbbf24',
    600: '#d97706',
  },
  teal: {
    600: '#0d9488',
    500: '#14b8a6',
    400: '#2dd4bf',
  },
  slate: {
    950: '#020617',
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
    300: '#cbd5e1',
    100: '#f1f5f9',
  },
  emerald: {
    500: '#10b981',
    400: '#34d399',
  },
  rose: {
    500: '#f43f5e',
  },
};
