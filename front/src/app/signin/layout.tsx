'use client';
import React from 'react';
import Link from 'next/link';

import { Grid, Stack, Typography } from '@mui/material';

import AuthWrapper from './../../components/auth/Wrapper';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Войти</Typography>
                        <Typography component={Link} href="/signup" variant="body1" sx={[{ textDecoration: 'none' }, {}]} color="primary">
                            Зарегистрироваться
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default Layout;