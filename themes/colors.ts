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
