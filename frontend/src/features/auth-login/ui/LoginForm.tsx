import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { AppError } from '@/shared/api/types'
import { authErrorMessage } from '@/features/auth-login/model/errors'
import { useLoginMutation } from '@/features/auth-login/model/useLoginMutation'
import { ru } from '@/shared/i18n/ru'

export function LoginForm() {
  const login = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login.mutate({ email: email.trim(), password: password.trim() })
  }

  const adminOnly = login.isError && login.error instanceof AppError && login.error.code === 'admin_only'
  const errorText =
    login.isError && !adminOnly ? authErrorMessage(login.error) : null

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <Typography variant="h6">{ru.auth.signIn}</Typography>
      {import.meta.env.DEV ? (
        <Alert severity="info" variant="outlined">
          {ru.auth.devAccountsHint}
        </Alert>
      ) : null}
      <TextField
        label={ru.auth.email}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={login.isPending}
      />
      <TextField
        label={ru.auth.password}
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={login.isPending}
      />
      {adminOnly ? (
        <Alert severity="warning">{ru.errors.adminOnly}</Alert>
      ) : null}
      {errorText ? <Alert severity="error">{errorText}</Alert> : null}
      <Button type="submit" variant="contained" disabled={login.isPending}>
        {login.isPending ? ru.auth.signingIn : ru.auth.signIn}
      </Button>
    </Stack>
  )
}
