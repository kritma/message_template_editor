export interface TemplateDto {
    root: TemplateContainerDto
    variables: string[]
}

export type TemplateComponentDto = TemplateConditionDto | TemplateStringDto

export type TemplateContainerDto = {
    children: TemplateComponentDto[]
}

export type TemplateConditionDto = {
    type: 'Condition'
    condition: TemplateContainerDto
    then: TemplateContainerDto
    otherwise: TemplateContainerDto
}

export type TemplateStringDto = {
    type: 'String'
    value: string
}