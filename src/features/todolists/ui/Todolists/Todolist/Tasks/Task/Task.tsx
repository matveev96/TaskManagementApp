import {useAppDispatch} from "../../../../../../../app/hooks";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "../../../../../model/tasks-reducer";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";

import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItemSx} from "./Task.styles";

type Props = {
    task: TaskType,
    todolistId: string
}

export const Task = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch();

    const removeTask = () => {
        dispatch(RemoveTaskAC({todolistId: todolistId, id: task.id}))
    }

    const changeTaskTitle = (updatedTitle: string) => {
        dispatch(ChangeTaskTitleAC({title: updatedTitle, todolistId: todolistId, id: task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(ChangeTaskStatusAC({isDone: newStatusValue, todolistId, id: task.id}))
    }
    return (
        <ListItem sx={getListItemSx(task.isDone)}
                  disableGutters
                  disablePadding
        >
            <div>
                <Checkbox checked={task.isDone}
                          color={'primary'}
                          size={"small"}
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title}
                              onClick={(updateTitle: string) => changeTaskTitle(updateTitle)}/>
            </div>

            <IconButton onClick={removeTask}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </ListItem>
    );
};
