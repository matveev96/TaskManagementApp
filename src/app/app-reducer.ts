
const initialState = {
    themeMode: 'light' as ThemeMode
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_THEME': {
            return {
                ...state,
                themeMode: action.payload
            }
        }
        default:
            return state
    }
}

export const changeThemeAC = (themeMode: ThemeMode) => {
    return {type: 'CHANGE_THEME', payload: themeMode} as const
}

export type ChangeThemeAT = ReturnType<typeof changeThemeAC>

type ActionType = ChangeThemeAT

export type ThemeMode = 'dark' | 'light'

type InitialStateType = typeof initialState


