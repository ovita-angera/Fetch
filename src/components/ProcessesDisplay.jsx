import { useEffect, useState} from 'react';
import {Box, Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton, Button } from '@mui/material'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function ProcessesDisplay() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [processes, setProcesses] = useState([])

  useEffect(() => {
    const fetchProcesses = async () => {
        const response = await fetch('http://localhost:5500/processes')
        const data = await response.json();
        setProcesses(data)
        console.log(data)
    }

    fetchProcesses()
  }, [])

  // Avoid a layout jump when reaching the last page with empty processes.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - processes.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleKillProcess = (e) => {
    e.preventDefault()
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} >
        <TableHead sx={{ background: '#000', color: '#fff'}}>
            <TableRow>
              <TableCell component='th'>PID</TableCell>
              <TableCell component='th' align="left" >Process Name</TableCell>
              <TableCell component='th' align="left" >CPU Util</TableCell>
              <TableCell component='th' align="left" >Memory Util</TableCell>
              <TableCell component='th' align="left" >Status</TableCell>
              <TableCell component='th' align="left" >Uptime</TableCell>
              <TableCell component='th' align="left" >Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? processes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : processes
          ).map((process) => (
            <TableRow key={process.pid}>
              <TableCell component="td" scope="process">
                {process.pid}
              </TableCell>
              <TableCell component="td" align="left">
                {process.name}
              </TableCell>
              <TableCell component="td" align="left">
                {process.cpu}
              </TableCell>
              <TableCell component="td" align="left">
                {process.memory}
              </TableCell>
              <TableCell component="td" align="left">
                {process.status}
              </TableCell>
              <TableCell component="td" align="left">
                {process.running_time}
              </TableCell>
              <TableCell component="td" align='left'>
                <Button variant="contained" color="default" onClick={handleKillProcess}>
                  Kill                  
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={processes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'processes per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}