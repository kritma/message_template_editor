import { createContext, ReactElement, ReactNode, useContext, useReducer } from 'react';
import { Template, TemplateConditionDto, TemplateContainerDto, TemplateStringDto } from '../dto/template';
import { TemplateCondition, TemplateContainer, TemplateString } from './dtoWrappers';

interface Selection {
    id: string
    selectionPos: number
}

export interface EditorContext {
    selection: Selection,
    root: TemplateContainer
}

type Action = { type: "set_selection", selection: Selection } |
{ type: "insert_condition" } |
{ type: "delete_condition", id: string } |
{ type: "insert_variable", variableName: string }

const default_template = new TemplateContainer([new TemplateString()])
const default_selection = { selectionPos: 0, id: default_template.children[0].id }

const EditorContext = createContext<EditorContext>({ selection: default_selection, root: default_template })
const EditorDispatchContext = createContext<React.Dispatch<Action>>(action => action);

export function EditorProvider({ children, template }: { children: ReactNode, template?: Template }) {
    const root = template ? new TemplateContainer(template.root) : default_template

    const [selection, dispatch] = useReducer<typeof tasksReducer>(tasksReducer, {
        selection: { selectionPos: 0, id: root.children[0].id },
        root
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
    state.root = new TemplateContainer(state.root)

    switch (action.type) {
        case "set_selection": {
            state.selection = action.selection
        } break
        case "insert_condition": {
            const { parent, component } = state.root.findComponent(state.selection!.id)! as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection!.selectionPos)
            const second = component.value.substring(state.selection!.selectionPos)
            const index = parent.children.indexOf(component)
            parent.children = [...parent.children.slice(0, index), new TemplateString(first),
            new TemplateCondition(), new TemplateString(second), ...parent.children.slice(index + 1)]
        } break
        case "delete_condition": {
            const { parent, component } = state.root.findComponent(action.id) as { parent: TemplateContainer, component: TemplateCondition }
            const index = parent.children.indexOf(component)!
            const first = parent.children[index - 1] as TemplateString
            const second = parent.children[index + 1] as TemplateString
            parent.children = [...parent.children.slice(0, index - 1), new TemplateString(first.value + second.value), ...parent.children.slice(index + 2)]
        } break
        case "insert_variable": {
            const { component } = state.root.findComponent(state.selection!.id)! as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection!.selectionPos)
            const second = component.value.substring(state.selection!.selectionPos)
            component.value = `${first}{${action.variableName}}${second}`
        } break
    }

    return state
}
