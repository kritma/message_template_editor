import { Template, TemplateCondition, TemplateContainer, TemplateString } from "../dto/template";

export function solveTemplate(template: Template, values: { [key: string]: string }): string {
    return solveContainer(template.root, values)
}

export function solveContainer(container: TemplateContainer, values: { [key: string]: string }): string {
    let result = ""
    for (const child of container.children) {
        switch (child.type) {
            case "Condition":
                result += solveCondition(child, values)
                break;
            case "String":
                result += solveString(child, values)
                break
            default:
                throw new Error(`Not valid scheme, type property should be Condition or String`)
        }
    }
    return result
}

export function solveCondition(condition: TemplateCondition, values: { [key: string]: string }): string {
    if (solveContainer(condition.condition, values) !== "") {
        return solveContainer(condition.then, values)
    }
    return solveContainer(condition.otherwise, values)
}

export function solveString(template_string: TemplateString, values: { [key: string]: string }): string {
    let regex = /\{([0-9A-Za-z]+)\}/g
    return template_string.value.replace(regex, (_, match) => values[match] ?? "")
}


