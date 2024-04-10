import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

import Box from '@mui/material/Box';
const defaultTheme = createTheme();

export default function AddServer() {
    const [username, setUsername] = useState('')
    const [hostname, setHostname] = useState('')
    const [ip, setIp] = useState('')
    const [password, setPassword] = useState('')
    const [os, setOs] = useState('')
    const [status, setStatus] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = (event) => { 
      event.preventDefault()

      const payload = {
        hostname,
        username,
        'ip-address': ip,
        password,
        'operating-system': os,
        status,
        'server-type': type
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      fetch('http://localhost:5500/servers', options)
      .then((res) => {
        if (!res.ok) throw Error('Something went wrong')
        window.alert('Server added successfully!')
      })
      .catch((error) => alert(error.message))
    };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 5
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000'  }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Server Configuration
          </Typography>
          <form 
          onSubmit={handleSubmit} 
          style={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '6px',
            justifyContent: 'stretch'
          }}
          >
            <FormControl>
              <TextField
                name="hostname"
                required
                fullWidth
                id="hostname"
                label="Hostname"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                autoFocus
              />
            </FormControl>

            <FormControl>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
        
            <FormControl>
              <TextField
                required
                fullWidth
                id="ip-address"
                label="IP Address"
                name="ip-address"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <TextField
                required
                fullWidth
                name="operating-system"
                label="Operating System"
                id="os"
                value={os}
                onChange={(e) => setOs(e.target.value)}
              />
            </FormControl>        
          
            <FormControl>
              <TextField
                required
                fullWidth
                name="status"
                label="Status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel id="select-server">Type Of Server</InputLabel>
              <Select
                labelId="select-server"
                id="select-server"
                label="Type Of Server"
                value={type}
                onChange={(event) => {
                  setType(event.target.value)
                }}
              >
                <MenuItem value='app'>App Server</MenuItem>
                <MenuItem value='web'>Web Server</MenuItem>
                <MenuItem value='db'>DB Server</MenuItem>
                <MenuItem value='file'>File Server</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'maroon' }}
              >
                  Add Server
              </Button>
            </FormControl>
            
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}