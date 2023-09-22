import { createTheme } from "@mui/material/styles";
import MontserratRegular from "../fonts/Montserrat-Regular.ttf";
import MontserratBold from "../fonts/Montserrat-Bold.ttf";

//TODO: put these interfaces in a declaration file (e.g. mui.theme.d.ts)
// Adding custom fonts to the default material ui theme
declare module "@mui/material/styles/" {
    interface Theme {
        customTypography: {
            bold: string;
        };
        customPallete: {
            costumer: string;
            broker: string;
            admin: string;
        };
    }
    interface ThemeOptions {
        customTypography?: {
            bold?: string;
        };
        customPallete?: {
            costumer?: string;
            broker?: string;
            admin?: string;
        };
    }
}

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat-Regular",
    },
    customTypography: {
        bold: "Montserrat-Bold",
    },
    customPallete: {
        costumer: "#FF5E00",
        broker: "#1C5E9F",
        admin: "#148E88",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Montserrat-Regular';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url(${MontserratRegular}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }

            @font-face {
              font-family: 'Montserrat-Bold';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url(${MontserratBold}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
});

export default theme;
