import { useEffect, useState } from "react"
import { Template } from "../dto/template"
import { Container } from "./TemplateComponent/Container"
import styles from "./TemplateEditor.module.css"
import { VariablesButtons } from "./VariablesButtons/VariablesButtons"
import { EditorProvider, useEditor, useEditorDispatch } from "./EditorContext"
import { TemplatePreview } from "./TemplatePreview/TemplatePreview"
import { PopupButton } from "../utils/Popup"

export function TemplateEditor({ arrVarNames, template, callbackSave }: { arrVarNames: string[], template?: Template, callbackSave: (template: Template) => void }) {
    return (
        <EditorProvider template={template}>
            <Editor arrVarNames={arrVarNames} callbackSave={callbackSave} />
        </EditorProvider>
    )
}

function Editor({ arrVarNames, callbackSave }: { arrVarNames: string[], callbackSave: (template: Template) => void }) {
    const editor = useEditor()
    const dispatch = useEditorDispatch()


    return (
        <div className={styles.editor}>
            <VariablesButtons arrVarNames={arrVarNames} />
            <button className={styles.button} onClick={() => {
                dispatch({ type: "insert_condition" })
            }}>Add condition</button>
            <div className={styles.root_container}>
                <Container self={editor.root} />
            </div>
            <div className={styles.button_container}>
                <PopupButton text="preview">
                    <TemplatePreview arrVarNames={arrVarNames} template={{ root: editor.root }} />
                </PopupButton>
                <button className={styles.button} onClick={() => { callbackSave({ root: editor.root.toDto() }) }}>save</button>
            </div>
        </div>
    )
}

