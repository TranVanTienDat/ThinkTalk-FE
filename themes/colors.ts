export const colors = {
  primary: {
    "50": "#eff3ff",
    "100": "#dee7ff",
    "200": "#beceff",
    "300": "#9db6ff",
    "400": "#7d9dff",
    "500": "#5c85ff",
    "600": "#4a6dd6",
    "700": "#3755ad",
    "800": "#253d85",
    "900": "#12255c",
  },
  secondary: {
    "100": "#181818", // header
    "200": "#646464", // body
    "300": "#b7b5be", // placeholder
    "400": "#F1F1F1",
  },
  custom: {
    textDisabled: "#9fa6ad",
    textInputQuest: "#7b6fbe",
    cornflower8: "#5c85ff14",
    cornflowerTransparent: "#5C85FF3D",
    cloudGray: "#edeff4cc",
    skyBlueTint: "#e6eefdcc",
    softBlue: "#155aef14",
    hotPink: "#FF4E9D",
    lightGray: "#E9E9E9",
    lavenderGray: "#E4E2F2",
    fieryRed: "#FF2B1F",
    lightGray100: "#F5F5F5",
  },

  icon: {
    primary: "#7b6fbe",
  },
} as const;

export type ColorTokens = typeof colors;

export const darkColors = {
  primary: {
    "50": "#1a2238",
    "100": "#212c4a",
    "200": "#2b3a63",
    "300": "#35587d",
    "400": "#3f6b99",
    "500": "#4980b3",
    "600": "#5c85ff", // giữ nguyên brand
    "700": "#7d9dff",
    "800": "#9db6ff",
    "900": "#beceff",
  },
  secondary: {
    "100": "#F1F1F1", // header (light text)
    "200": "#b7b5be", // body
    "300": "#646464", // placeholder
    "400": "#2a2a2a", // background
  },
  custom: {
    textDisabled: "#5a5f66",
    textInputQuest: "#9d91f5",
    cornflower8: "#5c85ff14", // giữ nguyên opacity
    cornflowerTransparent: "#5C85FF3D",
    cloudGray: "#2f2f2fcc",
    skyBlueTint: "#33406acc",
    softBlue: "#155aef14",
    hotPink: "#FF4E9D",
    lightGray: "#3a3a3a",
    lavenderGray: "#3e3b5a",
    fieryRed: "#FF665C",
    lightGray100: "#1c1c1c",
  },

  icon: {
    primary: "#9d91f5",
  },
} as const;

export type DarkColorTokens = typeof darkColors;
