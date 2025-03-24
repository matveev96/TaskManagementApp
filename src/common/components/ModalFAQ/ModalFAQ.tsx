import React from "react"
import { Modal } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectModalFAQ, setModalFAQ } from "../../../app/appSlice"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Button from "@mui/material/Button"

const ModalFaq = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    overflow: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const openModalFAQ = useAppSelector(selectModalFAQ)

  const dispatch = useAppDispatch()

  const changeModalFAQHandler = () => {
    dispatch(setModalFAQ({ modalFAQ: false }))
  }

  return (
    <Modal
      open={openModalFAQ}
      onClose={changeModalFAQHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button variant="outlined" onClick={changeModalFAQHandler} sx={{ width: "50px", alignSelf: "flex-end", mb: 2 }}>
          close
        </Button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          FAQ for Task Management App
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Task Management App is a task-tracking application designed to help you organize your tasks efficiently. You
          can create, manage, and track your to-do lists and tasks with ease.
        </Typography>
        <List id="modal-modal-description" sx={{ mt: 2 }}>
          Key Features:
          <ListItem>1. Todolists: Create, delete, and rename to-do lists</ListItem>
          <ListItem>2. Tasks: Add, delete, and edit tasks within to-do lists</ListItem>
          <ListItem>3. Task Filtering: All, Active, Completed</ListItem>
          Technologies Used:
          <ListItem>1. React: UI library for building components</ListItem>
          <ListItem>2. Redux Toolkit (RTK): State management</ListItem>
          <ListItem>3. RTK Query: Data fetching and caching</ListItem>
          <ListItem>4. Material-UI (MUI): Pre-designed UI components</ListItem>
          <ListItem>5. TypeScript: Static type checking for safer code</ListItem>
          <ListItem>6. REST API: Backend communication for CRUD operations</ListItem>
        </List>
      </Box>
    </Modal>
  )
}

export default ModalFaq
