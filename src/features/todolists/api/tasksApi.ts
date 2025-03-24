import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import type { BaseResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          params: { ...args, count: PAGE_SIZE },
        }
      },
      providesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        method: "POST",
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ taskId, todolistId }) => ({
        method: "DELETE",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      async onQueryStarted({ todolistId, taskId }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")
        let patchResulted: any[] = []
        cachedArgsForQuery.forEach(({ args }) => {
          patchResulted.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, args: { page: args.page } }, (state) => {
                const index = state.items.findIndex((tl) => tl.id === taskId)
                if (index !== -1) {
                  state.items.splice(index, 1)
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch (e) {
          patchResulted.forEach((patchResult) => patchResult.undo())
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")
        let patchResulted: any[] = []
        cachedArgsForQuery.forEach(({ args }) => {
          patchResulted.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, args: { page: args.page } }, (state) => {
                const task = state.items.find((tl) => tl.id === taskId)
                if (task) {
                  task.status = model.status
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch (e) {
          patchResulted.forEach((patchResult) => patchResult.undo())
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
