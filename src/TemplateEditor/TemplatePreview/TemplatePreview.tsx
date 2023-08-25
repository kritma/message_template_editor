
import { useEffect, useState } from "react"
import { Template } from "../../dto/template"
import { solveTemplate } from "../../utils/solveTemplate"
import styles from "./TemplatePreview.module.css"

export function TemplatePreview({ template, arrVarNames }: { arrVarNames: string[], template: Template }) {
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
                    arrVarNames.map(v => <input key={v} className={styles.variable} placeholder={v} onChange={e => {
                        variables[v] = e.target.value
                        setVariables({ ...variables })
                    }} />)
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