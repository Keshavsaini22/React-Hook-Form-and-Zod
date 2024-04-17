'use client'
import { SignUpSchema, TsignUpSchema } from '@/Types/allTypes.d';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

function SignupZod() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<TsignUpSchema>({ resolver: zodResolver(SignUpSchema) })
    const onhandleSubmit = async (data: TsignUpSchema) => {
        console.log('data: ', data);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch('/api/signupzod', {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                confirm: data.confirm
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        const responseData = await response.json()
        if (!response.ok) {
            alert("Submitting form failed")
            return
        }
        if (responseData.errors) {
            const errors = responseData.errors
            if (errors.email) {
                setError('email', {
                    type: "server",
                    message: errors.email,
                })
            }
            else if (errors.password) {
                setError('password', {
                    type: "server",
                    message: errors.password,
                })
            } else if (errors.confirm) {
                setError('confirm', {
                    type: "server",
                    message: errors.confirm,
                })
            }
            else {
                alert("Something went wrong!")
            }
        }
        reset()
    }
    return (
        <Stack gap={2} p={4} component={'form'}
            onSubmit={handleSubmit(onhandleSubmit)}
        >
            <Box sx={{ fontSize: '25px', fontWeight: '700' }}>Sign Up Form</Box>
            <TextField label="Email"  {...register('email')} />
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