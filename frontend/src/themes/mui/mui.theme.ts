import { createTheme } from "@mui/material/styles";
import MontserratRegular from "../fonts/Montserrat-Regular.ttf";
import MontserratSemiBold from "../fonts/Montserrat-SemiBold.ttf";
import MontserratBold from "../fonts/Montserrat-Bold.ttf";

//TODO: put these interfaces in a declaration file (e.g. mui.theme.d.ts)
// Adding custom fonts to the default material ui theme
declare module "@mui/material/styles/" {
    interface Theme {
        customTypography: {
            semiBold: string;
            bold: string;
        };
        customPallete: {
            user: string;
            realtor: string;
            admin: string;
            grey: string;
        };
    }
    interface ThemeOptions {
        customTypography?: {
            semiBold?: string;
            bold?: string;
        };
        customPallete?: {
            user?: string;
            realtor?: string;
            admin?: string;
            grey?: string;
        };
    }
}

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat-Regular",
    },
    customTypography: {
        semiBold: "Montserrat-SemiBold",
        bold: "Montserrat-Bold",
    },
    customPallete: {
        user: "#FF5E00",
        realtor: "#1C5E9F",
        admin: "#148E88",
        grey: "#3A3B3C",
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
                font-family: 'Montserrat-SemiBold';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: url(${MontserratSemiBold}) format('truetype');
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
