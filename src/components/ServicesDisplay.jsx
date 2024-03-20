import axios from 'axios'
import { useState, useEffect } from 'react';
import { Card, CardContent, Table, Paper, Stack, TableRow, TableBody, TableCell, TableHead, Typography, TableContainer, Container, CardHeader } from '@mui/material'

const ServicesDisplay = () => {
  const [services ,setServices] = useState([])
  const [active, setActive] = useState(0)
  const [inactive, setInactive] = useState(0)
  const [numberOfServices, setNumberOfServices] = useState(0)

  const isActive = (service) => service.status === '+';
  const isInactive = (service) => service.status === '-';

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get(`http://localhost:5500/services`);
      const service_data = response.data;

      const online = service_data.filter(isActive).length;
      const offline = service_data.filter(isInactive).length;
      const total_services = service_data.length;

      setServices(service_data)
      setActive(online)
      setInactive(offline)
      setNumberOfServices(total_services)
    }

    fetchServices()
  }, []);

  return (
    <Container>
      <Stack
        className='services-summary'
        direction='row'
        spacing={4}
        sx={{ justifyContent: 'center', alignContent: 'center'}}
      >
        <Card>
          <CardHeader
            title="Number of Online Services"
            subheader="Server ip"
          />
          <CardContent>
            <Typography variant='h4' color="secondary">
              {active}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Number of Offline Services"
            subheader="Server ip"
          />
          <CardContent>
            <Typography variant='h4' color="secondary">
              {inactive}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Total Number of Services"
            subheader="Server ip"
          />
          <CardContent>
            <Typography variant='h4' color="secondary">
              {numberOfServices}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

    <TableContainer component={Paper} sx={{ mt: '12px' }}>
        <Table aria-label="services-table" sx={{ alignContent: 'center', margin: 'auto' }}>
          <TableHead sx={{ background: '#111'}}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Service Name</TableCell>
              <TableCell align="left" sx={{ color: '#fff' }}>Number of Instances</TableCell>
              <TableCell align="left" sx={{ color: '#fff' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {service.name}
                </TableCell>
                <TableCell align='left'>
                  {Math.floor(Math.random()*1000) + 1}
                </TableCell>
                <TableCell align="left">
                  {service.status === '+'? 'Online': 'Offline'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ServicesDisplay
