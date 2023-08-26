import { TemplateEditor } from './TemplateEditor/TemplateEditor'
import { TemplateDto } from './utils/dto'

export function LocalStorageTemplateLoader() {
    const arrVarNames: string[] = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['firstname', 'lastname', 'company', 'position']
    const template: TemplateDto | null = localStorage.template ? JSON.parse(localStorage.template) : null;

    return (
        <TemplateEditor arrVarNames={arrVarNames} template={template ?? undefined} callbackSave={(template: TemplateDto) => {
            localStorage.template = JSON.stringify(template)
            localStorage.arrVarNames = JSON.stringify(template.variables)
        }} />
    )
}


