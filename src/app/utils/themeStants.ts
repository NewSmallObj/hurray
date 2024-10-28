
export const themes = ['light', 'dark', 'cupcake', 'pastel','valentine'];
export type Theme = 'light' | 'dark' | 'cupcake'| 'pastel' | 'valentine';

export const themeValues = {
  light: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#1677ff',
    }
  },
  dark: {
    '--background': '#0a0a0a',
    '--foreground': '#ededed',
    'token': {
      colorPrimary: '#1677ff',
    }
  },
  cupcake: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#1677ff',
      // borderRadiusOuter: 99
    }
  },
  pastel: {
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#70acc7',
      // borderRadiusOuter: 99
    }
  },
  valentine:{
    '--background': '#ffffff',
    '--foreground': '#171717',
    'token': {
      colorPrimary: '#af4670',
      // borderRadiusOuter: 99
    }
  }
};