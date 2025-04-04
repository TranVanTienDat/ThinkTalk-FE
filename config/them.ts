import { CssVarsThemeOptions, extendTheme, PaletteRange } from "@mui/joy";
import { colors } from "./colors";

declare module "@mui/joy/styles" {
  interface Palette {
    primary: PaletteRange;
    secondary: PaletteRange;
    cornflowerBlue: PaletteRange;
    text: PaletteRange & {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    custom: PaletteRange & {
      cloudGray: string;
      skyBlueTint: string;
      softWhite: string;
      hotPink: string;
      textDisabled: string;
      cornflower8: string;
      cornflowerTransparent: string;
      lightGray: string;
      lavenderGray: string;
      textInputQuest: string;
      fieryRed: string;
      whiteTransparent24: string;
      whiteTransparent64: string;
      whiteTransparent48: string;
    };
    gradient: {
      primary: string;
      bg: string;
    };
    icon: PaletteRange & {
      primary: string;
    };
  }
}

// const defaultTheme = extendTheme()
export const generateThemeOptions = (): CssVarsThemeOptions => {
  return {
    fontFamily: {
      body: "Afacad",
      code: "Afacad",
      display: "Afacad",
    },

    colorSchemes: {
      light: {
        palette: {
          primary: colors.primary,
          secondary: colors.secondary,
          cornflowerBlue: colors.cornflowerBlue,
          text: colors.text,
          custom: colors.custom,
          icon: colors.icon,
          gradient: {
            primary: `linear-gradient(90deg, ${colors.secondary[500]}, ${colors.cornflowerBlue[500]})`,
            bg: `linear-gradient(210deg, ${colors.custom.cloudGray} 11.55%, ${colors.custom.skyBlueTint} 72.23%)`,
          },
        },
      },
    },
    components: {
      JoySelect: {
        styleOverrides: {
          root: {
            color: colors.text.secondary,
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "12px",
            boxShadow: "none",
            borderColor: colors.custom.lightGray,
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          listbox: {
            "--ListItemDecorator-size": "30px",
            boxShadow: "0px 6px 12px -2px rgba(21, 21, 21, 0.08)",
            padding: 0,
            border: "none",
          },
        },
      },
      JoyMenu: {
        styleOverrides: {
          root: {
            border: "none",
            boxShadow: "0px 6px 12px -2px rgba(21, 21, 21, 0.08)",
            color: colors.text.secondary,
            padding: 0,
          },
        },
      },

      JoyDivider: {
        styleOverrides: {
          root: {
            "--joy-palette-divider": colors.custom.cornflowerTransparent,
            "--Divider-lineColor": "var(--joy-palette-divider)",
          },
        },
      },
      JoyInput: {
        styleOverrides: {
          root: {
            color: colors.text.primary,
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "12px",
            borderColor: colors.text.tertiary,
            height: "40px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      JoyButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            height: "40px",
            fontWeight: 600,
            minWidth: 80,
          },
        },
      },
    },
  };
};
