import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios";

const InstanceView = ({ service }) => {
    const [instances, setInstances] = useState([])

    useEffect(() => {
        const fetchInstances = async () => {

            const filterService = (value) => {
                return value.name === service;
            }

            const response = await axios.get('http://localhost:5500/processes')
            const data = response.data;

            const filteredData = data.filter(filterService);

            setInstances(filteredData);
        }

        fetchInstances()
    },[service]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4">
                Service
            </Typography>
            <Table sx={{ minWidth: 500 }} aria-label="service instance table">
                <TableHead sx={{ background: "#f70a35" }}>
                    <TableCell component={'th'} align="left">
                        CPU Util
                    </TableCell>
                    <TableCell component={'th'} align="left">
                        Memory Util
                    </TableCell>
                    <TableCell component={'th'} align="left">
                        Status
                    </TableCell>
                    <TableCell component={'th'} align="left">
                        Running Time
                    </TableCell>
                    <TableCell component={'th'} align="left">
                        Action
                    </TableCell>
                </TableHead>
                <TableBody>
                    {instances.map((instance, index) => (
                        <TableRow key={index}>
                            <TableCell component='td'>{instance.cpu}</TableCell>
                            <TableCell component='td'>{instance.memory}</TableCell>
                            <TableCell component='td'>{instance.status}</TableCell>
                            <TableCell component='td'>{instance.running_time}</TableCell>
                            <TableCell component='td'>
                                <Button variant='container'>
                                    Kill Instance
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

InstanceView.propTypes = {
    service: PropTypes.string.isRequired
}

export default InstanceView