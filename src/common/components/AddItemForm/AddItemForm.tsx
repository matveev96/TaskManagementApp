import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: AddItemFormPropsType) => {
  const [itemTitle, setItemTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (itemTitle.trim() !== "") {
      addItem(itemTitle.trim())
      setItemTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        error={!!error}
        helperText={error}
        value={itemTitle}
        size={"small"}
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        disabled={disabled}
      />
      <IconButton onClick={addItemHandler} disabled={disabled}>
        <AddBoxIcon color={disabled ? "disabled" : "primary"} />
      </IconButton>
    </Box>
  )
}
