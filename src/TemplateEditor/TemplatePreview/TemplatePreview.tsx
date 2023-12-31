
import { useState } from 'react'
import { TemplateDto } from '../../utils/dto'
import { solveTemplate } from '../../utils/solveTemplate'
import styles from './TemplatePreview.module.css'

export function TemplatePreview({ template, arrVarNames }: { arrVarNames: string[], template: TemplateDto }) {
    const [variables, setVariables] = useState<{ [key: string]: string }>({})

    return (
        <div className={styles.preview}>
            <div className={styles.variables}>
                {
                    // for ease of state management
                    arrVarNames.map(v => (
                        <div key={v} className={styles.variable}>
                            <label className={styles.variable_name} htmlFor={v}>{v}</label>
                            <input key={v} id={v} placeholder={v} className={styles.variable_input} onChange={e => {
                                variables[v] = e.target.value
                                setVariables({ ...variables })
                            }} />
                        </div>
                    ))
                }
            </div>
            <pre className={styles.solved}>
                {
                    solveTemplate(template, variables)
                }
            </pre>
        </div>
    )
}