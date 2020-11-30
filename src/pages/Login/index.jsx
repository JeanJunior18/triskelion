import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles'
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function SignIn() {
  const history = useHistory()
  const classes = useStyles();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({text: null, show: false})
  const [username, setName] = useState('')
  const [password, setPass] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    if(!username || !password) {
      setError({
        text: 'Todos os campos são obrigatórios',
        show: true,
      })
      return
    }

    setLoading(true)

    api.post('/login', {
      name: username, password: password
    })
      .then(res => {
        setLoading(false)
        const { access_token } = res.data
        localStorage.setItem('authorization', access_token)
        history.push('/')
      })
    .catch(() => {
      setLoading(false)
      setError({
        text: 'Usuário ou senha incorretos',
        show: true
      })
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Triskelion
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPass(e.target.value)}
          />

          {error && <span style={{color: 'red'}}>{error.text}</span>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://jeanjunior18.github.io/lp-triskelion/">
            Triskelion
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
      </Box>
    </Container>
  );
}
