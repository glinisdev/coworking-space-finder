import { PaletteOptions } from "@mui/material";
import { blue, red, yellow, cyan, green } from '@mui/material/colors';

const PaletteColors = (): Partial<PaletteOptions> => {
    
    const grey = {
        50: '#ffffff',
        100: '#fafafa',
        200: '#f5f5f5',
        300: '#f0f0f0',
        400: '#d9d9d9',
        500: '#595959',
        600: '#8c8c8c',
        700: '#262626',
        800: '#bfbfbf',
        900: '#141414',
        A100: '#434343',
        A200: '#1f1f1f',
        A400: '#8c8c8c',
        A700: '#fafafb',
        dark: '#000000',
    };
    
    const contrastText = '#fff';

    return {
        primary: {
            ...blue,
            contrastText
        },
        secondary: {
            ...grey,
            contrastText: grey[50]
        },
        error: {
            ...red,
            contrastText
        },
        warning: {
            ...yellow,
            contrastText: grey[100]
        },
        info: {
            ...cyan,
            contrastText
        },
        success: {
            ...green,
            contrastText
        },
        grey,
    };
};

export default PaletteColors;
