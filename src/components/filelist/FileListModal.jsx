import { useState } from 'react';
import { MdViewList } from "react-icons/md";

import {
  Paper,Table,Select, Button, Dialog, MenuItem,TableRow,TableHead,TableBody,TableCell,InputLabel,Pagination,DialogTitle,DialogActions,DialogContent,
  TableContainer,
  TableFooter} from '@mui/material';

import './FileListModal.css';
import ConfirmationDialog from './ConfirmationDialog';

const FileListModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [storageUtilized, setStorageUtilized] = useState(0);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows displayed per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const fetchData = () => {
    // Simulated asynchronous request
    setTimeout(() => {
      const files = [
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file1.txt', size: 100 },
        { name: 'file2.txt', size: 150 },
        { name: 'file3.txt', size: 200 }
      ];
      const storage = files.reduce((acc, file) => acc + file.size, 0);
      setFileList(files);
      setStorageUtilized(storage);
    }, 1000);
  };

  const handleCloseModal = () => {
    // Reset any state variables related to the confirmation dialog (optional)
    setSelectedFileIndex(null);
    setShowModal(false); // Ensure only this state change is triggered
  };

  const handleOpenModal = () => {
    fetchData();
    setShowModal(true);
  };

  const handleClearFile = (index) => {
    setSelectedFileIndex(index);
    setShowModal(true);
  };

  const handleConfirmClearFile = () => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(selectedFileIndex, 1);
    setFileList(updatedFileList);
    setSelectedFileIndex(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedFiles = fileList.slice(startIndex, endIndex);

  // Check if there are any files to display
  const isEmpty = fileList.length === 0;

  return (
    <div>
      <Button
        onClick={handleOpenModal}
        className="custom-button"
        sx={{
          color: 'white',
          backgroundColor: 'maroon',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: 'rgb(223, 166, 166)',
            color: 'maroon',
          }, 
        }}
      >
        <MdViewList className="text-500 mr-2" />
        Open File List
      </Button>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="file-list-dialog-title"
        aria-describedby="file-list-dialog-description"
        maxWidth="lg"
        fullWidth
        style={{ background: 'white' }}

      >
       
        <DialogContent>
        
          <Paper style={{ backgroundColor: '#e0e0e0',
                          borderRadius: '8px' }}>
            {isEmpty ? (
              <p>No files found.</p>
            ) : (
              <>
                 <DialogTitle id="file-list-dialog-title" className="dialog-title">
                              File List
                 </DialogTitle>
                <TableContainer>
                <Table className="custom-table">
                  <TableHead>
                      <TableRow>
                        <TableCell component='th' className="custom-cell">File Name</TableCell>
                        <TableCell component='th' className="custom-cell">Storage Utilized</TableCell>
                        <TableCell component='th' className="custom-cell">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedFiles.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell component='td' className="custom-cell">{file.name}</TableCell>
                          <TableCell align="left" component='td' className="custom-cell">{file.size} KB</TableCell>
                          <TableCell align="left" component='td' className="custom-cell">
                            <Button
                              onClick={() => handleClearFile(index)}
                              className="custom-button"
                              sx={{
                                color: 'white',
                                backgroundColor: 'maroon',
                                borderRadius: '10px',
                                '&:hover': {
                                  backgroundColor: 'rgb(223, 166, 166)',
                                  color: 'maroon',
                                },
                              }}
                            >
                              Clear
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableFooter sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                      <InputLabel id="rows-per-page-label">Select Rows Per Page To Display</InputLabel>
                      <Select 
                        labelId="rows-per-page-label"
                        id="rows-per-page"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        label="Rows per Page"
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                      </Select>
                      <Pagination
                        count={Math.ceil(fileList.length / rowsPerPage)} 
                        page={currentPage}
                        onChange={handlePageChange}
                      />
                    </TableFooter>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
          <p>Total Storage Utilized: {storageUtilized} KB</p>
        </DialogContent>
        <DialogActions>
          <Button className="custom-button" onClick={handleCloseModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
          open={showModal && selectedFileIndex !== null}
          onClose={() => setSelectedFileIndex(null)}
          onConfirm={handleConfirmClearFile}
      />
    </div>
  );
};

export default FileListModal;

