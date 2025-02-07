import {RootState} from "../../../app/store";
import type {DomainTodolist} from "./todolists-reducer";

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists