import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    onClick: (updateTitle: string) => void
}

export const EditableSpan = ({oldTitle, onClick}: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if(edit) onClick(updateTitle)
    }

    const updateTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)

    }

    return (
        edit ?
            <input value={updateTitle}
                   onBlur={editHandler}
                   autoFocus
                   onChange={updateTitleHandler}
            />
            :
            <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};
