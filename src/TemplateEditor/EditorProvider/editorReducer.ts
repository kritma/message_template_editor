import { Template, TemplateCondition, TemplateContainer, TemplateString } from "../../utils/dtoWrappers"

type Selection = {
    id: string
    selectionPos: number
}

// selection changes only on blur, so it`s ok
export type EditorContextType = {
    selection: Selection,
    template: Template
}

export type Action = { type: 'set_selection', selection: Selection } |
{ type: 'insert_condition' } |
{ type: 'delete_condition', id: string } |
{ type: 'insert_variable', variableName: string }


export function editorReducer(state: EditorContextType, action: Action): EditorContextType {
    state = structuredClone({ ...state })
    // structuredClone doesn`t copy functions
    state.template = new Template(state.template)

    switch (action.type) {
        case 'set_selection':
            state.selection = action.selection
            break
        case 'insert_condition': {
            const { parent, component } = state.template.root.findComponent(state.selection.id) as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection.selectionPos)
            const second = component.value.substring(state.selection.selectionPos)
            const index = parent.children.indexOf(component)
            parent.children = [...parent.children.slice(0, index), new TemplateString(first),
            new TemplateCondition(), new TemplateString(second), ...parent.children.slice(index + 1)]
        } break
        case 'delete_condition': {
            const { parent, component } = state.template.root.findComponent(action.id) as { parent: TemplateContainer, component: TemplateCondition }
            const index = parent.children.indexOf(component)!
            const first = parent.children[index - 1] as TemplateString
            const second = parent.children[index + 1] as TemplateString
            parent.children = [...parent.children.slice(0, index - 1), new TemplateString(first.value + second.value), ...parent.children.slice(index + 2)]
        } break
        case 'insert_variable': {
            const { component } = state.template.root.findComponent(state.selection.id) as { parent: TemplateContainer, component: TemplateString }
            const first = component.value.substring(0, state.selection.selectionPos)
            const second = component.value.substring(state.selection.selectionPos)
            component.value = `${first}{${action.variableName}}${second}`
        } break
    }

    // selection is always correct
    if (state.template.root.findComponent(state.selection.id) == null) {
        state.selection.id = state.template.root.children[0].id
        state.selection.selectionPos = 0
    }


    return state
}
