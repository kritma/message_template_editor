import { TemplateCondition, TemplateString } from '../../utils/dtoWrappers'
import { Container } from './Container'
import styles from './Condition.module.css'
import { useEditorDispatch } from '../EditorProvider/EditorProvider'
import { useEffect, useRef, useState } from 'react'

const TRANSITION_DURATION = 200 // ms

export function Condition({ self }: { self: TemplateCondition }) {
    const dispatch = useEditorDispatch()
    const [height, setHeight] = useState<number | 'auto'>(0)
    const condition = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHeight(condition.current!.clientHeight)
        setTimeout(() => setHeight('auto'), TRANSITION_DURATION)
    }, [])

    return (
        <div className={styles.condition_wrapper}
            style={
                {
                    transition: `all ${TRANSITION_DURATION}ms linear`,
                    height: height
                }
            }>
            <button className={styles.delete} onClick={(e) => {
                // right now it either clientHeight or 'auto' but we need clientHeight bcs css cant animate from/to "auto"
                setHeight(condition.current!.clientHeight)

                // defer so transition occurs
                setTimeout(() => setHeight(0), 0)

                // remove after transition
                setTimeout(() => dispatch({ type: 'delete_condition', id: self.id }), TRANSITION_DURATION)
            }}>
                x
            </button>
            <div ref={condition} className={styles.condition}>
                <div className={styles.branch_container}><p className={styles.branch}>if</p> <Container self={self.condition} /></div>
                <div className={styles.branch_container}><p className={styles.branch}>then</p> <Container self={self.then} /></div>
                <div className={styles.branch_container}><p className={styles.branch}>else</p> <Container self={self.otherwise} /></div>
            </div>
        </div>
    )
}