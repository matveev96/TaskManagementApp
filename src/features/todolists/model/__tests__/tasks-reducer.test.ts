import { addTodolist, removeTodolist } from "../todolistsSlice"
import { addTask, removeTask, tasksReducer, type TasksStateType, updateTask } from "../tasksSlice"
import { TaskPriority, TaskStatus } from "common/enums"
import type { DomainTask, UpdateTaskModel } from "../../api/tasksApi.types"
import type { Todolist } from "../../api/todolistsApi.types"

describe("TasksReducer tests", () => {
  let startState: TasksStateType
  let task: DomainTask
  let model: UpdateTaskModel
  let todolist: Todolist

  beforeEach(() => {
    startState = {
      todolistId1: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatus.New,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId1",
        },
        {
          id: "2",
          title: "JS",
          status: TaskStatus.New,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId1",
        },
        {
          id: "3",
          title: "React",
          status: TaskStatus.New,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId1",
        },
      ],
      todolistId2: [
        {
          id: "1",
          title: "bread",
          status: TaskStatus.New,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId2",
        },
        {
          id: "2",
          title: "milk",
          status: TaskStatus.Completed,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId2",
        },
        {
          id: "3",
          title: "tea",
          status: TaskStatus.Completed,
          deadline: "",
          description: "",
          startDate: "",
          addedDate: "",
          priority: TaskPriority.Hi,
          order: 0,
          todoListId: "todolistId2",
        },
      ],
    }

    task = {
      id: "4",
      title: "juce",
      status: TaskStatus.Completed,
      deadline: "",
      description: "",
      startDate: "",
      addedDate: "",
      priority: TaskPriority.Hi,
      order: 0,
      todoListId: "todolistId2",
    }

    model = {
      title: "SASS",
      description: startState["todolistId1"][0].description,
      status: TaskStatus.Completed,
      priority: startState["todolistId1"][0].priority,
      startDate: startState["todolistId1"][0].startDate,
      deadline: startState["todolistId1"][0].deadline,
    }

    todolist = {
      id: "todolistId3",
      title: "newTodolist",
      addedDate: "",
      order: 1,
    }
  })

  test("correct task should be added to correct array", () => {
    const endState = tasksReducer(startState, addTask({ task }))

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.Completed)
  })

  test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(startState, removeTask({ todolistId: "todolistId1", taskId: "2" }))

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState["todolistId2"].length).toBe(3)
  })

  test("status and title of specified task should be changed", () => {
    const endState = tasksReducer(startState, updateTask({ task: startState["todolistId1"][0], model }))

    expect(endState["todolistId1"][0].status).toBe(TaskStatus.Completed)
    expect(endState["todolistId1"][0].title).toBe("SASS")
    expect(endState["todolistId2"][0].title).toBe("bread")
  })

  test("new array should be added when new Todolist is added", () => {
    const endState = tasksReducer(startState, addTodolist({ todolist }))

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
      throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(keys[keys.length - 1]).toBe("todolistId3")
    expect(endState[newKey]).toEqual([])
  })

  test("property with todolistId should be deleted", () => {
    const endState = tasksReducer(startState, removeTodolist({ id: "todolistId2" }))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    expect(endState["todolistId2"]).toBeUndefined()
  })
})
