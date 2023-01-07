import React from 'react'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
import * as helper from '../helper'

// joi 驗證規則
const schema = Joi.object({
  name: Joi.string().min(4).max(16).required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(6).max(255).required(),
  password_confirmation: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('password_confirmation')
    .messages({ 'any.only': '{{#label}} does not match' }),
  adminPassword: Joi.string().min(6).max(255).required()
})

const SignUp = () => {
  // debug 專用
  helper.debugTool.traceStack(SignUp)

  // hook 定義
  const theme = useTheme()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    // mode: 'onBlur',   // default mode : 'onSubmit'
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  })

  const [pageState, setPageState] = React.useState<PageState>({
    isLoading: false
  })

  // watch 定義
  const [email, password] = watch(['email', 'password']) // watch input value by passing the name of it

  // submit handler
  const onSubmit: SubmitHandler<Inputs> = data => {
    setPageState({ isLoading: true })

    // 驗證 adminPassword , 不合就 return
    if (data.adminPassword !== import.meta.env.VITE_signUp_adminPassword) {
      setPageState({
        isLoading: false,
        isError: true,
        message: ' 管理員密碼不對喔 ! 如需專屬帳號可聯絡作者建立'
      })
      return
    }

    fetch(`${import.meta.env.VITE_RESTful_api_endPoint}/user/signUp`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          // ---------- 註冊失敗
          setPageState({
            isLoading: false,
            isError: true,
            message: helper.ErrorMessageTransfer(data.message)
          })
        } else {
          // ---------- 註冊成功
          setPageState({ isLoading: false, isError: false })
          navigate('/SignIn')
        }
      })
      .catch(error => {
        setPageState({
          isLoading: false,
          isError: true,
          error,
          message: JSON.stringify(error)
        })
      })
  }

  return (
    <Paper className='pageContent'>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* // 密碼的圖示 及 SignUp title */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        {/* ------------------ 現在不開放 註冊通知  ------------------*/}
        <Alert severity='error' sx={{ width: '100%', margin: 0.5 }}>
          很抱歉，註冊需要密碼，可先使用 100 組預設帳號。
        </Alert>
        <Alert severity='warning' sx={{ width: '100%', margin: 0.25 }}>
          如需專屬帳號可聯絡作者建立
        </Alert>
        {/* ------------------------- 本體 Form 表單 --------------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -------------------------------- warming message */}
          {!!pageState.isError && (
            <Alert
              severity='error'
              sx={{ width: '100%' }}
              onClose={() => setPageState({ isError: false })}
            >
              {pageState.message}
            </Alert>
          )}
          {/* -------------------------------- name input controller */}
          <Controller
            name='name'
            control={control}
            defaultValue='user20'
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='name'
                  autoComplete='name'
                  error={error !== undefined}
                  helperText={error ? error.message : ''}
                />
              )
            }}
          />

          {/* -------------------------------- email input controller */}
          <Controller
            name='email'
            control={control}
            defaultValue='user20@example.com'
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  margin='normal'
                  fullWidth
                  label='Email Address'
                  autoComplete='email'
                  error={error !== undefined}
                  helperText={error ? error.message : ''}
                />
              )
            }}
          />
          {/* -------------------------------- password input controller */}
          <Controller
            name='password'
            control={control}
            defaultValue='123456'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin='normal'
                fullWidth
                type='password'
                label='password'
                autoComplete='current-password'
                error={error !== undefined}
                helperText={error ? error.message : ''}
              />
            )}
          />
          {/* -------------------------------- password_confirmation input controller */}
          <Controller
            name='password_confirmation'
            control={control}
            defaultValue='123456'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin='normal'
                fullWidth
                type='password'
                label='password_confirmation'
                error={error !== undefined}
                helperText={error ? error.message : ''}
              />
            )}
          />
          {/* -------------------------------- adminPassword input controller */}
          <Controller
            name='adminPassword'
            control={control}
            defaultValue='123456'
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin='normal'
                fullWidth
                type='password'
                label='adminPassword'
                error={error !== undefined}
                helperText={error ? error.message : ''}
              />
            )}
          />
          {/* -------------------------------- submit button */}
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={pageState.isLoading === true}
          >
            Sign Up
          </LoadingButton>
        </form>
      </Box>
    </Paper>
  )
}

export default SignUp

type Inputs = {
  name: string
  email: string
  password: string
  password_confirmation: string
  adminPassword: string
}
