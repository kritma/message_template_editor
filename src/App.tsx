import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { TemplateEditor } from './TemplateEditor/TemplateEditor'

function App() {
  return (
    <div>
      <TemplateEditor arrVarNames={["name"]} />
    </div>
  )
}

export default App
