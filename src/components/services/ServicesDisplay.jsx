import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import axios from 'axios';

import ServiceCard from './common/ServiceCard';

import { HiArrowCircleUp, HiArrowCircleDown, HiOutlineDotsVertical } from "react-icons/hi";

const ServicesDisplay = () => {
  const [services ,setServices] = useState([])
  const [active, setActive] = useState(0)
  const [inactive, setInactive] = useState(0)
  const [numberOfServices, setNumberOfServices] = useState(0)

  const isActive = (service) => service.status === '+';
  const isInactive = (service) => service.status === '-';

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get(`http://192.168.91.247:8008/api/v1/services/3.130.157.173`);
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
        sx={{ display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between', alignContent: 'strech'}}
      >
        <ServiceCard title='Online' detail={active} icon={<HiArrowCircleUp />} color='#54f542'/>
        <ServiceCard title='Offline' detail={inactive} icon={<HiArrowCircleDown />} color='#fa4848'/>
        <ServiceCard title='Total' detail={numberOfServices} icon={<HiOutlineDotsVertical />} color='#48e8fa'/>
      </Stack>

    <TableContainer component={Paper} sx={{ mt: '12px' }}>
        <Table aria-label="services-table" sx={{ alignContent: 'center', margin: 'auto' }}>
          <TableHead sx={{background: '#f70a35'}}>
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
