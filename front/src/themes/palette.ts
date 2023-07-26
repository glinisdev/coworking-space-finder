import { PaletteMode } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

import PaletteColors from './colors';


const Palette = (mode: PaletteMode) => {
    const paletteColors = PaletteColors();
    if (!paletteColors.grey) {
        return;
    }

    return createPalette({
        mode,
        ...paletteColors,
        common: {
            black: '#000',
            white: '#fff'
        },
        text: {
            primary: paletteColors.grey[700],
            secondary: paletteColors.grey[500],
            disabled: paletteColors.grey[400]
        },
        action: {
            disabled: paletteColors.grey[300]
        },
        divider: paletteColors.grey[200],
        background: {
            paper: paletteColors.grey[50],
            default: paletteColors.grey[100],
        },
    });
};

export default Palette;
