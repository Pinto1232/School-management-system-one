import { extendTheme } from "@chakra-ui/react";



const theme = extendTheme({
    breakpoints: {
        base: "0px",
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
    },
    colors: {
        primary: "#2D3748",
        secondary: "#ED8936",
        background: "#F7FAFC",
        text: "#1A202C",
        muted: "#E2E8F0",
        buttonPrimaryBlue: '#3182ce',
        buttonSecondaryGreen: '#319795'
    },
    fonts: {
        body: "'Open Sans', sans-serif",
        heading: "'Montserrat', sans-serif",
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        bold: 700,
    },
});

export default theme;
