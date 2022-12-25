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

const SignIn = () => {
  const theme = useTheme()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

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
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id='email'
            name='email'
            required
            margin='normal'
            fullWidth
            label='Email Address'
            autoComplete='email'
            autoFocus
          />
          <TextField
            id='password'
            name='password'
            required
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            autoComplete='current-password'
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
        </Box>
      </Box>
    </Paper>
  )
}

export default SignIn
