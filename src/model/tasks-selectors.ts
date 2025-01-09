import {RootState} from "../app/store";
import {TasksType} from "../app/App";

export const selectTasks = (state: RootState): TasksType => state.tasks