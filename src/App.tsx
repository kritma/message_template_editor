import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { TemplateEditor } from './TemplateEditor/TemplateEditor'
import { EditorProvider } from './TemplateEditor/EditorContext'
import { Template } from './dto/template'

function App() {
  const arrVarNames: string[] = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['firstname', 'lastname', 'company', 'position']
  const template: Template | null = localStorage.template ? JSON.parse(localStorage.template) : null;

  return (
    <TemplateEditor arrVarNames={arrVarNames} template={template ?? undefined} callbackSave={() => { }} />
  )
}

export default App
