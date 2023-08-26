import { useEditorDispatch } from "../EditorProvider/EditorProvider"
import styles from './AddConditionButton.module.css'

export function AddConditionButton() {
    const dispatch = useEditorDispatch()

    return (
        <button className={styles.button} onClick={() => { dispatch({ type: 'insert_condition' }) }}>
            Add condition
        </button>
    )
}