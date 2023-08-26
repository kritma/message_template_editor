import { useContext, useState } from "react";
import { useEditorDispatch } from "../EditorContext";
import { TemplateString } from "../../utils/dtoWrappers";
import styles from "./String.module.css"
import TextareaAutosize from 'react-textarea-autosize';

export function String({ self }: { self: TemplateString }) {
    const dispatch = useEditorDispatch()
    const [, setValue] = useState(self.value)

    return <TextareaAutosize
        className={styles.string}
        onChange={(e) => {
            setValue(() => { self.value = e.target.value; return e.target.value })
        }}
        onBlur={e => {
            if (e.target instanceof HTMLTextAreaElement)
                dispatch({ type: "set_selection", selection: { selectionPos: e.target.selectionStart, id: self.id } })
        }} value={self.value} />
}