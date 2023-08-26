import { TemplateDto, TemplateConditionDto, TemplateContainerDto, TemplateStringDto } from './dto';

export function solveTemplate(template: TemplateDto, values: { [key: string]: string }): string {
    return solveContainer(template.root, values, template.variables)
}

export function solveContainer(container: TemplateContainerDto, values: { [key: string]: string }, variables: string[]): string {
    let result = ''
    for (const child of container.children) {
        switch (child.type) {
            case 'Condition':
                result += solveCondition(child, values, variables)
                break;
            case 'String':
                result += solveString(child, values, variables)
                break
            default:
                throw new Error('Not valid scheme, type property should be \'Condition\' or \'String\'')
        }
    }
    return result
}

export function solveCondition(condition: TemplateConditionDto, values: { [key: string]: string }, variables: string[]): string {
    if (solveContainer(condition.condition, values, variables) !== '') {
        return solveContainer(condition.then, values, variables)
    }
    return solveContainer(condition.otherwise, values, variables)
}

export function solveString(template_string: TemplateStringDto, values: { [key: string]: string }, variables: string[]): string {
    let regex = /\{([0-9A-Za-z]+)\}/g
    return template_string.value.replace(regex, (all, match) => variables.includes(match) ? (values[match] ?? '') : all)
}


