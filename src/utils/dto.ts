export interface TemplateDto {
    root: TemplateContainerDto
    variables: string[]
}

export type TemplateComponentDto = TemplateConditionDto | TemplateStringDto

export interface TemplateContainerDto {
    children: TemplateComponentDto[]
}

export interface TemplateConditionDto {
    type: 'Condition'
    condition: TemplateContainerDto
    then: TemplateContainerDto
    otherwise: TemplateContainerDto
}

export interface TemplateStringDto {
    type: 'String'
    value: string
}