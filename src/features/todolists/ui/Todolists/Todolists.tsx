import {useAppSelector} from "../../../../app/hooks";

import {selectTodolists} from "../../model/todolists-selectors";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(el => {

                return (
                    <Paper key={el.id}
                           elevation={4}
                           sx={{p: '0 20px 20px 20px'}}
                    >
                        <Todolist todolist={el}/>
                    </Paper>
                )
            })}
        </>
    );
};
