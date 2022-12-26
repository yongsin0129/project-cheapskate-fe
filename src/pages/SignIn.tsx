import React from 'react'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Grid, Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

const SignIn = () => {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    // mode: 'onBlur',   // default mode : 'onSubmit'
    reValidateMode: 'onChange'
  })
  console.log('errors : ', JSON.stringify(errors))

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)
  const [email, password] = watch(['email', 'password']) // watch input value by passing the name of it
  console.log('watch email : ', email)
  console.log('watch password : ', password)

  return (
    <Paper className='pageContent'>
      <Box
        sx={{
          marginTop: 8,
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
          {/* -------------------------------- email input controller */}
          <Controller
            name='email'
            control={control}
            defaultValue=''
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
            defaultValue=''
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

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/'>Forgot password?</Link>
            </Grid>
            <Grid item xs sx={{ textAlign: 'end' }}>
              <Link to='/SignUp'>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  )
}

export default SignIn
