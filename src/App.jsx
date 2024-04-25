import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import AddServer from "./components/servers/AddServer";
import ServicesDisplay from "./components/services/ServicesDisplay";
import ProcessesDisplay from "./components/processes/ProcessesDisplay";
import { Process } from "./components/processes/Process";

import './App.css'
import FileListModal from "./components/filelist/FileListModal";


const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  return (
    <>
      <Button
      variant="contained" 
      onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          overflow: 'auto',
          marginTop: '2px'
        }}
      >
        <Box sx={{
          margin: 'auto',
          paddingTop: '2px',
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '20px'
        }}>
          <AddServer />
          <hr />
          <Process />
          <hr />
          <FileListModal />
        </Box>
      </Modal>
      <ServicesDisplay />
      <br />
      <ProcessesDisplay />
    </>
  )
}

export default App
