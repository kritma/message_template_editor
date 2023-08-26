import { TemplateDto } from '../utils/dto'
import { Container } from './TemplateComponent/Container'
import styles from './TemplateEditor.module.css'
import { VariablesButtons } from './VariablesButtons/VariablesButtons'
import { EditorProvider, useEditor } from './EditorProvider/EditorProvider'
import { TemplatePreview } from './TemplatePreview/TemplatePreview'
import { PopupButton } from '../utils/Popup/Popup'
import { AddConditionButton } from './AddConditionButton/AddConditionButton'

export function TemplateEditor({ arrVarNames, template, callbackSave }: { arrVarNames: string[], template?: TemplateDto, callbackSave: (template: TemplateDto) => void }) {
    return (
        <EditorProvider template={template} variables={arrVarNames}>
            <Editor arrVarNames={arrVarNames} callbackSave={callbackSave} />
        </EditorProvider>
    )
}

function Editor({ arrVarNames, callbackSave }: { arrVarNames: string[], callbackSave: (template: TemplateDto) => void }) {
    const editor = useEditor()

    return (
        <div className={styles.editor}>
            <VariablesButtons arrVarNames={arrVarNames} />
            <AddConditionButton />
            <div className={styles.root_container}>
                <Container self={editor.template.root} />
            </div>
            <div className={styles.button_container}>
                <PopupButton text='preview'>
                    <TemplatePreview arrVarNames={arrVarNames} template={editor.template.toDto()} />
                </PopupButton>
                <button className={styles.button} onClick={() => { callbackSave(editor.template.toDto()) }}>save</button>
            </div>
        </div>
    )
}

