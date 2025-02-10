import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer, DomainTodolist
} from '../todolists-reducer'

import { v1 } from 'uuid'
import type {Todolist} from "../../api/todolistsApi.types";


describe('TodolistReducer tests', () => {

    let startState: DomainTodolist[];
    let todolist: Todolist
    beforeEach(() => {

        startState = [
            {
                id: 'todolistId1',
                title: 'What to learn',
                filter: 'all',
                addedDate: '',
                order: 1
            },
            {
                id: 'todolistId2',
                title: 'What to buy',
                filter: 'all',
                addedDate: '',
                order: 1
            }
        ];

        todolist = {
            id: 'todolistId3',
            title: 'New Todolist',
            addedDate: '',
            order: 1
        }
    })

    test('correct Todolist should be removed', () => {

        const endState = todolistsReducer(startState, removeTodolistAC('todolistId1'))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe('todolistId2')
    })

    test('correct Todolist should add Todolist', () => {

        const endState = todolistsReducer(startState, addTodolistAC(todolist))

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe('New Todolist')
    })

    test('correct Todolist should change its name', () => {

        const endState = todolistsReducer(startState, changeTodolistTitleAC({ title: 'New Todolist', id: 'todolistId2' }))

        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe('New Todolist')
    })

    test('correct Todolist should change filter', () => {

        const endState = todolistsReducer(startState, changeTodolistFilterAC({id: 'todolistId1', filter: "active"}))

        expect(endState[0].filter).toBe("active")
        expect(endState[1].filter).toBe("all")
    })
})
