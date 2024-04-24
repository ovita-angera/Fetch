import { useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input ,Box, Grid, Avatar, Button, Select, MenuItem, TextField, Container, Typography, CssBaseline } from '@mui/material'
// import axios from 'axios';

const defaultTheme = createTheme();

export default function AddServer() {
  const [file, setFile] = useState('');
  const [auth, setAuth] = useState('password');

  const handleSubmit = (event) => { 
    event.preventDefault()

    const server_data = new FormData(event.currentTarget);
    server_data.append("file", file)
    let server_data_json = Object.fromEntries(server_data);

    const payload = {
      ...server_data_json,
      "password": server_data_json.password,
      "filename": server_data_json.file.name
    }

    console.log(payload);

    // axios.post("https://httpbin.org/post", payload)
    //   .then(res => {
    //     if (res.status === 201) {
    //       console.log("Success");
    //       console.log(res.data);
    //     }
    //   })
    //   .catch(err => console.error(err))
    
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

              <Grid item xs={12}>
                <Select
                  fullWidth
                  labelId="connType"
                  id="connType"
                  name='connType'
                  value={auth}
                  label="Connection Type"
                  onChange={(e) => setAuth(e.target.value)}
                >
                  <MenuItem value="password">Password</MenuItem>
                  <MenuItem value="key">Key</MenuItem>
                </Select>
              </Grid>

              {auth !== "password" ? (
                <Grid item xs={12}> 
                  <Input
                  type='file'
                  onChange={ (event) => {
                    var blob = event.target.files[0];
                    setFile(blob)
                  }}
                  >
                    Choose file
                  </Input>
                </Grid>
              ) :
              (
                <Grid item xs={12}>
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
                  id="ip_address"
                  label="IP Address"
                  name="ip_address"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="operating_system"
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