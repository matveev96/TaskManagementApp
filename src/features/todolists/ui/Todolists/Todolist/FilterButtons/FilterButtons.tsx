import Box from "@mui/material/Box";
import {changeTodolistFilterAC, FilterValuesType, DomainTodolist} from "../../../../model/todolists-reducer";
import Button from "@mui/material/Button";
import {filterButtonsContainerSx} from "./FilterButtons.styles";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: DomainTodolist
}

export const FilterButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch();
    const changeTodolistFilter = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter: filter}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('all')}
                    color={'inherit'}
            >All</Button>

            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('active')}
                    color={'primary'}
            >Active</Button>

            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('completed')}
                    color={'secondary'}
            >Completed</Button>
        </Box>
    );
};
