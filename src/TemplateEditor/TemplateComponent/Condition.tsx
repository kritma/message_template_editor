import { TemplateCondition } from "../dtoWrappers"
import { Container } from "./Container"
import styles from "./Condition.module.css"
import { useEditorDispatch } from "../EditorContext"
export function Condition({ self }: { self: TemplateCondition }) {
    const dispatch = useEditorDispatch()
    return (
        <div className={styles.condition_wrapper}>
            <button className={styles.delete} onClick={() => dispatch({ type: "delete_condition", id: self.id })}>
            </button>
            <div className={styles.condition}>
                <div className={styles.if}><p>if</p> <Container self={self.condition} /></div>
                <div className={styles.then}><p>then</p> <Container self={self.then} /></div>
                <div className={styles.otherwise}><p>else</p> <Container self={self.otherwise} /></div>
            </div>
        </div>
    )
}