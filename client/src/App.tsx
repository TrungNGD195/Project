import { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import './App.css';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, error, login, register, logout } = useAuth();
  const [tab, setTab] = useState(0);

  // Simple Google OAuth link; token will be returned via URL hash by server
  const googleAuthUrl = useMemo(
    () => 'http://localhost:3000/auth/google',
    [],
  );

  // Optional: parse token from URL hash if returned by OAuth and clear it from URL
  useEffect(() => {
    if (window.location.hash.startsWith('#accessToken=')) {
      // In a fuller app, we would set the token then fetch current user profile
      // For now, just clean the hash
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Tasks App</Typography>
          {user && (
            <Button color="inherit" onClick={() => void logout()}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        {!user ? (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>{String(error)}</Alert>
            )}

            <Box role="tabpanel" hidden={tab !== 0} sx={{ mt: 2 }}>
              {tab === 0 && <LoginForm onSubmit={login} loading={loading} />}
            </Box>
            <Box role="tabpanel" hidden={tab !== 1} sx={{ mt: 2 }}>
              {tab === 1 && <RegisterForm onSubmit={register} loading={loading} />}
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <MuiLink href={googleAuthUrl} underline="hover">
                Continue with Google
              </MuiLink>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Welcome, {user.full_name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {user.email} • role: {user.role}
            </Typography>
            <Button variant="contained" onClick={() => void logout()}>
              Logout
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

function LoginForm({ onSubmit, loading }: { onSubmit: (data: { email: string; password: string }) => Promise<unknown>; loading: boolean; }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = loading || !email || !password;
  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); void onSubmit({ email, password }); }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" disabled={disabled}>
          {loading ? <CircularProgress size={20} /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
}

function RegisterForm({ onSubmit, loading }: { onSubmit: (data: { full_name: string; email: string; password: string }) => Promise<unknown>; loading: boolean; }) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = loading || !full_name || !email || !password;
  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); void onSubmit({ full_name, email, password }); }}>
      <TextField
        fullWidth
        label="Full name"
        margin="normal"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" disabled={disabled}>
          {loading ? <CircularProgress size={20} /> : 'Create account'}
        </Button>
      </Box>
    </Box>
  );
}

export default App;
