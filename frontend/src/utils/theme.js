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
    grid: {
        templatesColumns: {
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
        },
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
        body: "'Montserrat', sans-serif",
    heading: "'Montserrat', sans-serif",
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        bold: 700,
    },
    components: {
        Select: {
            baseStyle: {
                field: {
                    _focus: { boxShadow: 'none' },
                    borderRadius: 'lg',
                    bg: 'gray.50',
                    border: 'none',
                },
                menu: {
                    bg: 'white',
                    border: 'none',
                    boxShadow: 'sm',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    transformOrigin: 'top center',
                    transform: 'scaleY(0.97)',
                    opacity: 0,
                    _focus: {
                        transform: 'scaleY(1)',
                        opacity: 1,
                    }
                }
            }
        }
    }
});

export default theme;