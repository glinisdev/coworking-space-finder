"use client";
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Box,
    Button,
    // Divider,
    FormControl,
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

import AnimateButton from '@/components/AnimateButton';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import apiClient from '@/utils/api-client';
import { AxiosError } from 'axios';

const SignUp = () => {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().max(255).required('Введите имя'),
        lastName: Yup.string().max(255).required('Введите фамилию'),
        email: Yup.string().email('Проверьте email, кажется в нём ошибка').max(255).required('Введите email'),
        password: Yup.string().max(255).required('Введите пароль')
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const [level, setLevel] = React.useState<{ label: string; color: string; }>();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    React.useEffect(() => {
        changePassword('');
    }, []);

    const onSubmit = async (formValues: any) => {
        setSubmitError(null);
        try {
            await apiClient.request({
                url: 'user/create',
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

        router.push('/signin'); 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="firstname-signup">Имя *</InputLabel>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        type="firstname"
                                        placeholder="Ваше имя"
                                        fullWidth
                                        error={Boolean(fieldState.isTouched && fieldState.error)}
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {fieldState.error.message}
                                        </FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-signup">Фамилия *</InputLabel>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        type="lastname"
                                        placeholder="Ваша фамилия"
                                        fullWidth
                                        error={Boolean(fieldState.isTouched && fieldState.error)}
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="helper-text-lastname-signup">
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
                        <InputLabel htmlFor="email-signup">Email *</InputLabel>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        type="text"
                                        placeholder="Ваш email"
                                        fullWidth
                                        error={Boolean(fieldState.isTouched && fieldState.error)}
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="helper-text-email-signup">
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
                        <InputLabel htmlFor="password-signup">Пароль</InputLabel>
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
                                        name="password"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            changePassword(e.target.value);
                                        }}
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
                                        placeholder="******"
                                    />
                                    {fieldState.isTouched && fieldState.error && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {fieldState.error.message}
                                        </FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </Stack>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {submitError && (
                    <Grid item xs={12}>
                        <FormHelperText error>{submitError}</FormHelperText>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Продолжая регистрация вы подтверждаете, что ознакомлены и полностью согласны с &nbsp;
                        <Typography component={Link} href="#" variant="subtitle2" sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline', } }} color="primary">
                            Terms of Service
                        </Typography>
                        &nbsp; и &nbsp;
                        <Typography component={Link} href="#" variant="subtitle2" sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline', } }} color="primary">
                            Privacy Policy
                        </Typography>
                    </Typography>
                </Grid>
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
                            Зарегистрироваться
                        </Button>
                    </AnimateButton>
                </Grid>

                {/* <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption">Sign up with</Typography>
                        </Divider>
                    </Grid> */}
                {/* <Grid item xs={12}>
                        // social icons
                    </Grid> */}
            </Grid>
        </form>
    );
}

export default SignUp;
