
import { useEffect, useState } from "react"
import { TemplateDto } from "../../utils/dto/dto"
import { solveTemplate } from "../../utils/solveTemplate"
import styles from "./TemplatePreview.module.css"

export function TemplatePreview({ template, arrVarNames }: { arrVarNames: string[], template: TemplateDto }) {
    const [variables, setVariables] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        for (const variable of arrVarNames) {
            variables[variable] = ""
        }
        setVariables({ ...variables })
    }, [])

    return (
        <div className={styles.preview}>
            <div className={styles.variables}>
                {
                    arrVarNames.map(v => (
                        <div className={styles.variable}>
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