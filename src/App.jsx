import ServicesDisplay from "./components/ServicesDisplay"
import AddServer from "./components/AddServer"
import { useState } from "react"
import { Button, Modal, Box } from "@mui/material"
import './App.css'
import ProcessesDisplay from "./components/ProcessesDisplay"


const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
      variant="contained" 
      onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
           position: 'relative',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '50%',
           bgcolor: 'background.paper',
           border: '1px solid #000',
           boxShadow: 24,
           borderRadius: '20px'
        }}>
          <AddServer />
        </Box>
      </Modal>
      <ServicesDisplay />
      <ProcessesDisplay />
    </>
  )
}

export default App
