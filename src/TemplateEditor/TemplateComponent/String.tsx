import { useState } from 'react';
import { useEditorDispatch } from '../EditorProvider/EditorProvider';
import { TemplateString } from '../../utils/dtoWrappers';
import styles from './String.module.css'
import TextareaAuto from 'react-textarea-autosize';

export function String({ self }: { self: TemplateString }) {
    const dispatch = useEditorDispatch()
    const [, setValue] = useState<void>()

    return <TextareaAuto
        className={styles.string}
        onChange={(e) => {
            setValue(() => { self.value = e.target.value })
        }}
        onBlur={e => {
            if (e.target instanceof HTMLTextAreaElement)
                dispatch({ type: 'set_selection', selection: { selectionPos: e.target.selectionStart, id: self.id } })
        }} value={self.value} />
}