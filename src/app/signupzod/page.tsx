'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(5, "Password must be atleast 5 characters")
        .max(20),
    confirm: z.string()
}).refine(data => data.password === data.confirm, {
    message: 'Password must match',
    path: ['confirm']
});

function SignupZod() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(SignUpSchema) })
    const onhandleSubmit = async (data: FieldValues) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        reset()
    }
    return (
        <Stack gap={2} p={4} component={'form'}
            onSubmit={handleSubmit(onhandleSubmit)}
        >
            <Box sx={{ fontSize: '25px', fontWeight: '700' }}>Sign Up Form</Box>
            <TextField label="Email" type='email' {...register('email')} />
            {errors.email && (<p>{`${errors.email.message}`}</p>)}
            <TextField label="Password" type='password' {...register('password')} />
            {errors.password && (<p>{`${errors.password.message}`}</p>)}
            <TextField label="Confirm Password" type='password' {...register('confirm')} />
            {errors.confirm && (<p>{`${errors.confirm.message}`}</p>)}
            <Button variant='contained' disabled={isSubmitting} type='submit'>Submit</Button>
        </Stack>
    )
}

export default SignupZod