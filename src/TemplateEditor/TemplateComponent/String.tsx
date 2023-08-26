import { useState } from 'react';
import { useEditorDispatch } from '../EditorProvider/EditorProvider';
import { TemplateString } from '../../utils/dtoWrappers';
import styles from './String.module.css'
import TextareaAuto from 'react-textarea-autosize';

export function String({ self }: { self: TemplateString }) {
    const dispatch = useEditorDispatch()

    // hack so react updates this component
    const [, setValue] = useState(self.value)

    return <TextareaAuto
        className={styles.string}
        onChange={(e) => {
            // state syncing + hack for react
            setValue(() => { self.value = e.target.value; return self.value })
        }}
        onBlur={e => {
            if (e.target instanceof HTMLTextAreaElement)
                dispatch({ type: 'set_selection', selection: { selectionPos: e.target.selectionStart, id: self.id } })
        }} value={self.value} />
}