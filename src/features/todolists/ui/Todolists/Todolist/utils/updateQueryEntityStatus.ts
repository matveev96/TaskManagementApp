import { todolistsApi } from "../../../../api/todolistsApi"
import type { RequestStatus } from "../../../../../../app/appSlice"
import type { AppDispatch } from "../../../../../../app/store"

export const updateEntityStatus = (props: { status: RequestStatus; dispatch: AppDispatch; id: string }) => {
  const { status, dispatch, id } = props
  dispatch(
    todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
      const currentTodolist = state.find((tl) => tl.id === id)
      if (currentTodolist) {
        currentTodolist.entityStatus = status
      }
    }),
  )
}
