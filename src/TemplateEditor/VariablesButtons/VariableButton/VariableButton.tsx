import { useEditorDispatch } from "../../EditorContext";
import styles from "./VariableButton.module.css"

export function VariableButton({ varName }: { varName: string }) {
    const dispatch = useEditorDispatch()!
    return (
        <button className={styles.button} onClick={() => dispatch({ type: "insert_variable", variableName: varName })}>
            {`{${varName}}`}
        </button>
    )
}