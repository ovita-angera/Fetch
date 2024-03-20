import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
// import { useState } from 'react';

const defaultTheme = createTheme();

export default function AddServer() {
    const [type, setType] = useState('')

    const handleSubmit = (event) => { 
      event.preventDefault()

    const server_data = new FormData(event.currentTarget)
    const server_data_json = Object.fromEntries(server_data)
    const payload = { ...server_data_json, "server-type": type}

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    fetch('http://localhost:5500/servers', options)
    .then((res) => {
      if (!res.ok) throw Error('Something went wrong')
    })
    .catch((error) => alert(error.message))

    event.target.reset();
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="hostname"
                  required
                  fullWidth
                  id="hostname"
                  label="Hostname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ip-address"
                  label="IP Address"
                  name="ip-address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="operating-system"
                  label="Operating System"
                  id="os"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="status"
                  label="Status"
                  id="status"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
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
                </Box>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'maroon' }}
              >
                  Add Server
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}