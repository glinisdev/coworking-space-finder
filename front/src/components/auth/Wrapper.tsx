'use client';
import React from 'react';
import { Box, Grid, Theme } from '@mui/material';

// import Logo from 'components/Logo';
import AuthFooter from './Footer';
import MainCard from './../MainCard';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ minHeight: '100vh' }}>
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '100vh'
            }}
        >
            <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                LOGO
                {/* <Logo /> */}
            </Grid>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                >
                    <Grid item>
                        <MainCard
                            sx={{
                                maxWidth: { xs: 400, lg: 475 },
                                margin: { xs: 2.5, md: 3 },
                                '& > *': {
                                    flexGrow: 1,
                                    flexBasis: '50%'
                                }
                            }}
                            content={false}
                            border={false}
                            boxShadow
                            shadow={(theme: Theme) => theme.shadows[3]}
                        >
                            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid>
        </Grid>
    </Box>
);

export default AuthWrapper;