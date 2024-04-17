import PropTypes from 'prop-types';
import './css/styles.css';

import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import { CardContent, Container, Typography } from '@mui/material';


const ServiceCard = ({ title, icon, detail }) => {
  return (
    <Box sx={{ maxWidth: '30%' }}>
        <Card>
            <CardContent display={'flex'} flexDirection={'row'}>
                <Container display={'flex'} flexDirection={'column'} gap={2}>
                    {icon}
                    <Typography variant='h3'>
                        {title}
                    </Typography>
                </Container>
                <Container>
                    <Typography>
                        {detail}
                    </Typography>
                </Container>
            </CardContent>
        </Card>
    </Box>
  )
}

ServiceCard.defaultProps = {
    title: 'Enter title',
    icon: null,
    detail: 'Enter details here'
}


ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    detail: PropTypes.number.isRequired
}

export default ServiceCard