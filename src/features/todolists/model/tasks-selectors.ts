import {RootState} from "../../../app/store";
import {TasksStateType} from "./tasks-reducer";

export const selectTasks = (state: RootState): TasksStateType => state.tasks