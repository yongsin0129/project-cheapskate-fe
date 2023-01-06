import React from 'react'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Grid, Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
import { MeContext } from '../context'
import * as helper from '../helper'

// joi 驗證規則
const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(6).max(255).required()
})

const SignIn = () => {
  // context 取得
  const { MeToken, setMeToken, Me, setMe } = React.useContext(MeContext)

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

  // 監控 context_Me 確認有無登入成功並取到 Me User
  React.useEffect(() => {
    if (!!Me) {
      setPageState({ isLoading: false, isError: false })
      navigate('/FollowedMovies')
    }
  }, [Me])

  // watch 定義
  const [email, password] = watch(['email', 'password']) // watch input value by passing the name of it

  // submit handler
  const onSubmit: SubmitHandler<Inputs> = data => {
    setPageState({ isLoading: true })
    fetch(`${import.meta.env.VITE_RESTful_api_endPoint}/user/signIn`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          // ---------- 登入失敗
          setPageState({
            isLoading: false,
            isError: true,
            message: helper.ErrorMessageTransfer(data.message)
          })
        } else {
          // ---------- 登入成功
          localStorage.setItem(
            'jwt_token',
            JSON.stringify(data.data[0].jwtToken)
          )

          //
          setMeToken!(data.data[0].jwtToken)
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -------------------------------- warming message */}
          {!!pageState.isError && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {pageState.message}
            </Alert>
          )}

          {/* -------------------------------- email input controller */}
          <Controller
            name='email'
            control={control}
            defaultValue='user20@example.com'
            rules={{
              required: { value: true, message: '信箱不可為空' },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // email RegExp
                message: '請輸入有效的信箱'
              }
            }}
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
            rules={{
              required: { value: true, message: '密碼不可為空' },
              minLength: { value: 6, message: '最短長度為 6 ' }
            }}
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

          {/* -------------------------------- submit button */}
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={pageState.isLoading === true}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to='/'>Forgot password?</Link>
            </Grid>
            <Grid item xs sx={{ textAlign: 'end' }}>
              <Link to='/SignUp'>{"Don't have an account?"}</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  )
}

export default SignIn

type Inputs = {
  email: string
  password: string
}
