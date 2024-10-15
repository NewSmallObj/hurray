
export const themes = ['light', 'dark', 'cupcake', 'pastel','valentine'];
export type Theme = 'light' | 'dark' | 'cupcake'| 'pastel' | 'valentine';

export const themeValues = {
  light: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {}
  },
  dark: {
    '--background': '#0a0a0a',
    '--foreground': '#ededed',
    'token': {}
  },
  cupcake: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#291334',
      borderRadius: 99
    }
  },
  pastel: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#70acc7',
      borderRadius: 99
    }
  },
  valentine:{
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#af4670',
      borderRadius: 99
    }
  }
};