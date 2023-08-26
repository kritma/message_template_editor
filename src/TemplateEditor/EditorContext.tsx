import { createContext, ReactNode, useContext, useReducer } from 'react';
import { TemplateDto } from '../utils/dto/dto';
import { Template, TemplateCondition, TemplateContainer, TemplateString } from '../utils/dto/dtoWrappers';

interface Selection {
    id: string
    selectionPos: number
}

export interface EditorContext {
    selection: Selection,
    template: Template
}

type Action = { type: "set_selection", selection: Selection } |
{ type: "insert_condition" } |
{ type: "delete_condition", id: string } |
{ type: "insert_variable", variableName: string }

const default_template = new Template({ variables: [], root: new TemplateContainer([new TemplateString()]) })
const default_selection = { selectionPos: 0, id: default_template.root.children[0].id }

const EditorContext = createContext<EditorContext>({ selection: default_selection, template: default_template })
const EditorDispatchContext = createContext<React.Dispatch<Action>>(action => action);

export function EditorProvider({ children, template, variables }: { children: ReactNode, template?: TemplateDto, variables: string[] }) {
    const t = template ? new Template({ variables: variables, root: new TemplateContainer(template.root) }) : default_template
    t.variables = variables

    const [selection, dispatch] = useReducer<typeof tasksReducer>(tasksReducer, {
        selection: { selectionPos: 0, id: t.root.children[0].id },
        template: t
    });

    return (
        <EditorContext.Provider value={selection}>
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

function tasksReducer(state: EditorContext, action: Action): EditorContext {
    state = structuredClone({ ...state })
    state.template = new Template(state.template)

    switch (action.type) {
        case "set_selection": {
            state.selection = action.selection
        } break
        case "insert_condition": {
            const { parent, component } = state.template.root.findComponent(state.selection.id) as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection.selectionPos)
            const second = component.value.substring(state.selection.selectionPos)
            const index = parent.children.indexOf(component)
            parent.children = [...parent.children.slice(0, index), new TemplateString(first),
            new TemplateCondition(), new TemplateString(second), ...parent.children.slice(index + 1)]
        } break
        case "delete_condition": {
            const { parent, component } = state.template.root.findComponent(action.id) as { parent: TemplateContainer, component: TemplateCondition }
            const index = parent.children.indexOf(component)!
            const first = parent.children[index - 1] as TemplateString
            const second = parent.children[index + 1] as TemplateString
            parent.children = [...parent.children.slice(0, index - 1), new TemplateString(first.value + second.value), ...parent.children.slice(index + 2)]
        } break
        case "insert_variable": {
            const { component } = state.template.root.findComponent(state.selection.id) as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection.selectionPos)
            const second = component.value.substring(state.selection.selectionPos)
            component.value = `${first}{${action.variableName}}${second}`
        } break
    }

    if (state.template.root.findComponent(state.selection.id) == null) {
        state.selection.id = state.template.root.children[0].id
        state.selection.selectionPos = 0
    }


    return state
}
