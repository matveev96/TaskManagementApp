import type { BaseResponse } from "common/types"
import type { LoginArgs, MeResponse } from "./authApi.types"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (args) => ({
        method: "POST",
        url: "auth/login",
        body: args,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
    me: build.query<BaseResponse<MeResponse>, void>({
      query: () => "auth/me",
    }),
  }),
})

export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi
