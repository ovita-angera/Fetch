import { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Avatar, Button, Select, MenuItem, TextField, Container, Typography, CssBaseline } from '@mui/material'
import axios from 'axios';

const defaultTheme = createTheme();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddServer() {
  const [file, setFile] = useState(null);
  const [auth, setAuth] = useState('password');

  const handleSubmit = (event) => { 
    event.preventDefault()

    const server_data = new FormData(event.currentTarget);
    const server_data_json = Object.fromEntries(server_data);
    const value = auth !== "password" ? file : ""
    const payload = {...server_data_json, "auth_type": auth, "auth": value}

    axios.post(``, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(payload);

    // reset the form
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
          <Avatar sx={{ m: 1, bgcolor: '#000'}}>
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
                <Select
                  fullWidth
                  labelId="connType"
                  id="connType"
                  value={auth}
                  label="Connection Type"
                  onChange={(e) => setAuth(e.target.value)}
                >
                  <MenuItem value="password">Password</MenuItem>
                  <MenuItem value="key">Key</MenuItem>
                </Select>
              </Grid>

              {auth !== "password" ? (
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onClickCapture={(event) => {
                      setFile(event.relatedTarget.file[0])
                    }}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
              </Grid>
              ) :
              (
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
              )}

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
                  name="operating-system"
                  label="Operating System"
                  id="os"
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="status"
                  label="Status"
                  id="status"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="type"
                  label="Type Of Server"
                  id="type_of_server"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'maroon' }}
            >
                Add Server
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}