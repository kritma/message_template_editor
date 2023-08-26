import { TemplateCondition } from '../../utils/dtoWrappers'
import { Container } from './Container'
import styles from './Condition.module.css'
import { useEditorDispatch } from '../EditorContext'

export function Condition({ self }: { self: TemplateCondition }) {
    const dispatch = useEditorDispatch()
    return (
        <div className={styles.condition_wrapper}>
            <button className={styles.delete} onClick={() => dispatch({ type: 'delete_condition', id: self.id })}>
                x
            </button>
            <div className={styles.condition}>
                <div className={styles.branch_container}><p className={styles.branch}>if</p> <Container self={self.condition} /></div>
                <div className={styles.branch_container}><p className={styles.branch}>then</p> <Container self={self.then} /></div>
                <div className={styles.branch_container}><p className={styles.branch}>else</p> <Container self={self.otherwise} /></div>
            </div>
        </div>
    )
}