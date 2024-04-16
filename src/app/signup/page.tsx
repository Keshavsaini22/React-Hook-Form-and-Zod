'use client'
import { Box, Button, Stack, TextField } from '@mui/material'
import { resolve } from 'path'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm()
    const onhandleSubmit = async (data: FieldValues) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        reset()
    }
    return (
        <Stack gap={2} p={4} component={'form'}
            onSubmit={handleSubmit(onhandleSubmit)}
        >
            <Box sx={{ fontSize: '25px', fontWeight: '700' }}>Sign Up Form</Box>
            <TextField label="Email" type='email' {...register('email', {
                required: 'Email is required',
                // minLength:{
                //     value:5,
                //     message:'Minimun length should be 5'
                // }
            })} />
            {errors.email && (<p>{`${errors.email.message}`}</p>)}
            <TextField label="Password" type='password' {...register('password', {
                required: 'Password is required',
                minLength: {
                    value: 5,
                    message: 'Password must be atleast 5 characters'
                }
            })} />
            {errors.password && (<p>{`${errors.password.message}`}</p>)}
            <TextField label="Confirm Password" type='password' {...register('confirm', {
                required: 'Confirm password is required',
                validate: (value) => value === getValues('password') || "Password must match"
            })} />
            {errors.confirm && (<p>{`${errors.confirm.message}`}</p>)}
            <Button variant='contained' disabled={isSubmitting} type='submit'>Submit</Button>
        </Stack>
    )
}

export default Signup