import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    colors: {
        primary: "#2D3748",
        secondary: "#ED8936",
        background: "#F7FAFC",
        text: "#1A202C",
        muted: "#E2E8F0",
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
