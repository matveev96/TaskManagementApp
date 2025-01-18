import {TitleTodolistSx} from "./Todolist.styles";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../app/hooks";

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch();
    const changeTodoListTitle = (updatedTitle: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title: updatedTitle}))
    }

    const removeToDoList = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    return (
        <Box sx={TitleTodolistSx}>
            <h3><EditableSpan oldTitle={todolist.title} onClick={changeTodoListTitle}/></h3>
            <IconButton onClick={removeToDoList}>
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
};
