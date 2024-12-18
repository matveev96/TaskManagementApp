import { SxProps } from '@mui/material'

export const filterButtonsContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})

export const TitleContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
}
