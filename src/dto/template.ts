
export interface Template {
    root: TemplateContainer
}

export interface TemplateContainer {
    type: "Container"
    children: (TemplateCondition | TemplateString)[]
}

export interface TemplateCondition {
    type: "Condition"
    condition: TemplateContainer
    then: TemplateContainer
    otherwise: TemplateContainer
}

export interface TemplateString {
    type: "String"
    value: string
}