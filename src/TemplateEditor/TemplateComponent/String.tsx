import { useEditorDispatch } from '../EditorProvider/EditorProvider';
import { TemplateString } from '../../utils/dtoWrappers';
import styles from './String.module.css'
import TextareaAuto from 'react-textarea-autosize';

export function String({ self }: { self: TemplateString }) {
    const dispatch = useEditorDispatch()

    return <TextareaAuto
        className={styles.string}
        onChange={(e) => {
            dispatch({ type: 'set_value', id: self.id, value: e.target.value })
            dispatch({ type: 'set_selection', selection: { selectionStart: e.target.selectionStart, selectionEnd: e.target.selectionEnd, id: self.id } })
        }}
        onBlur={e => {
            if (e.target instanceof HTMLTextAreaElement)
                dispatch({ type: 'set_selection', selection: { selectionStart: e.target.selectionStart, selectionEnd: e.target.selectionEnd, id: self.id } })
        }} value={self.value} />
}