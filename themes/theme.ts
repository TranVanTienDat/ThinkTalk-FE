import { CssVarsThemeOptions, extendTheme, PaletteRange } from "@mui/joy";
import { colors, darkColors } from "./colors";

declare module "@mui/joy/styles" {
  interface Palette {
    primary: PaletteRange;
    secondary: PaletteRange;
    custom: PaletteRange & {
      cloudGray: string;
      skyBlueTint: string;
      softBlue: string;
      hotPink: string;
      textDisabled: string;
      cornflower8: string;
      cornflowerTransparent: string;
      lightGray: string;
      lavenderGray: string;
      textInputQuest: string;
      fieryRed: string;
      lightGray100: string;
    };
    icon: PaletteRange & {
      primary: string;
    };
  }
}

const generateThemeOptions = (): CssVarsThemeOptions => {
  return {
    fontFamily: {
      body: "Roboto, sans-serif",
      display: "Roboto, sans-serif",
    },
    fontWeight: {
      xs: 400,
      sm: 500,
      md: 600,
      lg: 700,
      xl: 800,
    },

    colorSchemes: {
      light: {
        palette: {
          primary: colors.primary,
          secondary: colors.secondary,
          custom: colors.custom,
          icon: colors.icon,
        },
      },
      dark: {
        palette: {
          primary: darkColors.primary,
          secondary: darkColors.secondary,
          custom: darkColors.custom,
          icon: darkColors.icon,
        },
      },
    },
    components: {
      JoySelect: {
        styleOverrides: {
          root: {
            color: colors.secondary[200],
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
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            color: colors.secondary[200],
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
            color: colors.secondary[100],
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "12px",
            borderColor: colors.secondary[300],
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
            height: "36px",
            fontWeight: 600,
            padding: "12px",
            "&:hover": {
              color: colors.primary[700],
              backgroundColor: colors.custom.softBlue,
            },
          },
        },
      },
      JoyIconButton: {
        styleOverrides: {
          root: {
            color: colors.primary[700],
            backgroundColor: colors.custom.softBlue,
          },
        },
      },
      JoyTab: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            width: "100%",
            paddingX: "8px",
            "&.Mui-selected": {
              backgroundColor: colors.custom.softBlue,
              color: colors.primary[700],
            },
            '&:not(.Mui-selected, [aria-selected="true"]):hover': {
              backgroundColor: colors.custom.softBlue,
              color: colors.primary[700],
            },
          },
        },
      },
      JoyTabPanel: {
        styleOverrides: {
          root: {
            padding: "24px",
          },
        },
      },
      JoySheet: {
        styleOverrides: {
          root: {
            border: "none",
            borderWidth: 0,
          },
        },
      },
    },
  };
};
export const theme = extendTheme(generateThemeOptions());
