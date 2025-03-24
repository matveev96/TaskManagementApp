import { Todolist } from "./todolistsApi.types"
import type { BaseResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"
import type { DomainTodolist } from "../lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      async onQueryStarted(todolistId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((tl) => tl.id === todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ title, id }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistMutation } =
  todolistsApi
