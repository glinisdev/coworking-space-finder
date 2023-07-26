'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import AnimateButton from '@/components/AnimateButton';
import apiClient from '@/utils/api-client';
import { AxiosError } from 'axios';

const SignIn = () => {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Проверьте email, кажется в нём ошибка').max(255).required('Введите email'),
        password: Yup.string().max(255).required('Введите пароль')
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const [checked, setChecked] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const onSubmit = async (formValues: any) => {
        setSubmitError(null);
        try {
            await apiClient.request({
                url: 'user/login',
                method: 'POST',
                data: {
                    ...formValues,
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }) as Promise<Record<string, unknown>>;
        } catch (error) {
            const axiosError = error as AxiosError<{error: {
                message: string;
            }}>; 
            const errorText = axiosError?.response?.data?.error?.message as string; 
            setSubmitError(errorText);
            return;
        }

        router.push('/'); 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Логин</InputLabel>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        type="text"
                                        placeholder="Введите email"
                                        fullWidth
                                        error={Boolean(fieldState.isTouched && fieldState.error)}
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {fieldState.error.message}
                                        </FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">Пароль</InputLabel>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        fullWidth
                                        error={Boolean(fieldState.isTouched && fieldState.error)}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Введите пароль"
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {fieldState.error.message}
                                        </FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={(event) => setChecked(event.target.checked)}
                                    name="checked"
                                    color="primary"
                                    size="small"
                                />
                            }
                            label={<Typography variant="h6">Сохранить вход</Typography>}
                        />
                        <Typography component={Link} href="/password/recovery" variant="h6" sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline', } }} color="text.primary">
                            Забыли пароль?
                        </Typography>
                    </Stack>
                </Grid>
                {submitError && (
                    <Grid item xs={12}>
                        <FormHelperText error>{submitError}</FormHelperText>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <AnimateButton type='scale'>
                        <Button
                            disableElevation
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Войти
                        </Button>
                    </AnimateButton>
                </Grid>
                {/* <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption"> Login with</Typography>
                        </Divider>
                    </Grid>
                    <Grid item xs={12}>
                        // social icons
                    </Grid> */}
            </Grid>
        </form>
    );
}

export default SignIn;