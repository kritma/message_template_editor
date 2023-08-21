import { createContext, ReactElement, useContext, useReducer } from 'react';

export interface Selection {
    selection: {
        selected: Object
        selectionPos: number
        selectionTarget: HTMLElement
    } | null
}


const SelectionContext = createContext<Selection>({ selection: null })
const SelectionDispatchContext = createContext<React.Dispatch<{
    selected: Object
    selectionPos: number
    selectionTarget: HTMLElement
}> | null>(null);


export function TasksProvider({ children }: { children: ReactElement }) {
    const [selection, dispatch] = useReducer<typeof tasksReducer>(tasksReducer, { selection: null });

    return (
        <SelectionContext.Provider value={selection}>
            <SelectionDispatchContext.Provider value={dispatch}>
                {children}
            </SelectionDispatchContext.Provider>
        </SelectionContext.Provider>
    );
}

export function useTasks() {
    return useContext(SelectionContext);
}

export function useTasksDispatch() {
    return useContext(SelectionDispatchContext);
}

function tasksReducer(state: Selection, action: {
    selected: Object
    selectionPos: number
    selectionTarget: HTMLElement
}): Selection {
    return { selection: { ...action } }
}
