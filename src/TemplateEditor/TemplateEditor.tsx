import { useEffect } from "react"
import { Template } from "../dto/template"
import { Container } from "./TemplateComponent/Conatainer"
import styles from "./TemplateEditor.module.css"
import { VariablesButtons } from "./VariablesButtons/VariablesButtons"

export function TemplateEditor({ arrVarNames, template }: { arrVarNames: string[], template?: Template }) {
    if (template === undefined) {
        template = {
            root: { children: [{ type: "String", value: "hello world" }], type: "Container" }
        }
    }


    function onClick(varName: string) {

    }

    return (
        <div className={styles.editor}>
            <VariablesButtons arrVarNames={arrVarNames} onClick={onClick} />
            <Container self={template.root} />
            <button onClick={() => {
                console.log(JSON.stringify(template!.root))
            }}>click</button>
        </div>
    )
}

