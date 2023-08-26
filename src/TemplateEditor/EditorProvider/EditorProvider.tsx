import { ReactNode, createContext, useContext, useReducer } from 'react';
import { TemplateDto } from '../../utils/dto';
import { Template, TemplateContainer, TemplateString } from '../../utils/dtoWrappers';
import { Action, EditorContextType, tasksReducer } from './EditorContext';

const default_template = new Template({ variables: [], root: new TemplateContainer([new TemplateString()]) })
const default_selection = { selectionPos: 0, id: default_template.root.children[0].id }

const EditorContext = createContext<EditorContextType>({ selection: default_selection, template: default_template })
const EditorDispatchContext = createContext<React.Dispatch<Action>>(action => action);

export function EditorProvider({ children, template, variables }: { children: ReactNode, template?: TemplateDto, variables: string[] }) {
    const t = template ? new Template({ variables: variables, root: new TemplateContainer(template.root) }) : default_template
    t.variables = variables

    const [context, dispatch] = useReducer<typeof tasksReducer>(tasksReducer, {
        selection: { selectionPos: 0, id: t.root.children[0].id },
        template: t
    });

    return (
        <EditorContext.Provider value={context}>
            <EditorDispatchContext.Provider value={dispatch}>
                {children}
            </EditorDispatchContext.Provider>
        </EditorContext.Provider>
    );
}

export function useEditor() {
    return useContext(EditorContext)
}

export function useEditorDispatch() {
    return useContext(EditorDispatchContext)!
}