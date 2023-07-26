'use client';
import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export interface MainCardProps {
    border: boolean;
    children: React.ReactNode;
    elevation: number;
    content: boolean;
    contentSX: Record<string, unknown>;
    codeHighlight: boolean;
    sx: Record<string, unknown>;
    boxShadow: boolean;
    darkTitle: boolean;
    divider: boolean;
    secondary: React.ReactNode;
    shadow: string;
    title: string;
    [key: string]: unknown;
}

// eslint-disable-next-line react/display-name
const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            divider = true,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            codeHighlight,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    ...sx,
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.grey[800],
                    boxShadow: boxShadow && !border ? shadow || theme.shadows[0] : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow : 'inherit'
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem'
                    }
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && (
                    <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
                )}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && divider && <Divider />}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}

            </Card>
        );
    }
);

export default MainCard;