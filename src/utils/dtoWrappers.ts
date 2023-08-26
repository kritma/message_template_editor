import { TemplateConditionDto, TemplateContainerDto, TemplateDto, TemplateStringDto } from "./dto";

export class TemplateString {
    value: string;
    type: "String" = "String";
    id: string = crypto.randomUUID()

    constructor(value?: string | TemplateStringDto | TemplateString) {
        if (value === undefined) {
            this.value = ""
        } else {
            if (typeof value === "string") {
                this.value = value
            } else {
                this.value = value.value

                if (value.hasOwnProperty("id")) {
                    this.id = (value as TemplateString).id
                }
            }
        }
    }
    toDto(): TemplateStringDto {
        return { type: "String", value: this.value }
    }
}


export class TemplateCondition {
    condition: TemplateContainer;
    then: TemplateContainer;
    otherwise: TemplateContainer;
    type: "Condition" = "Condition";
    id: string = crypto.randomUUID()

    constructor(templateCondition?: TemplateConditionDto | TemplateCondition) {
        if (templateCondition === undefined) {
            this.condition = new TemplateContainer([new TemplateString()])
            this.then = new TemplateContainer([new TemplateString()])
            this.otherwise = new TemplateContainer([new TemplateString()])
        } else {
            this.condition = new TemplateContainer(templateCondition.condition)
            this.then = new TemplateContainer(templateCondition.then)
            this.otherwise = new TemplateContainer(templateCondition.otherwise)
            if (templateCondition.hasOwnProperty("id")) {
                this.id = (templateCondition as TemplateCondition).id
            }
        }
    }
    toDto(): TemplateConditionDto {
        return { type: "Condition", condition: this.condition.toDto(), then: this.then.toDto(), otherwise: this.otherwise.toDto() }
    }
    findComponent(id: string): { component: TemplateCondition | TemplateString, parent: TemplateContainer } | null {
        for (const component of [this.condition, this.then, this.otherwise]) {
            const found = component.findComponent(id)
            if (found !== null) {
                return found
            }
        }

        return null
    }

}
export type TemplateComponent = TemplateCondition | TemplateString

export class TemplateContainer {
    children: TemplateComponent[];
    constructor(value: TemplateContainerDto | TemplateContainer | TemplateComponent[]) {
        if (Array.isArray(value)) {
            this.children = value
        } else {
            this.children = value.children.map(e => {
                switch (e.type) {
                    case "Condition":
                        return new TemplateCondition(e)
                    case "String":
                        return new TemplateString(e)
                }
            })
        }
    }

    toDto(): TemplateContainerDto {
        return { children: this.children.map(child => child.toDto()) }
    }

    findComponent(id: string): { component: TemplateCondition | TemplateString, parent: TemplateContainer } | null {
        for (const component of this.children) {
            if (component.id === id) {
                return { component, parent: this }
            } else {
                if (component.type === "Condition") {
                    const found = component.findComponent(id)
                    if (found !== null) {
                        return found
                    }
                }
            }
        }

        return null
    }
}

export class Template {
    root: TemplateContainer
    variables: string[]
    constructor(template: TemplateDto) {
        this.root = new TemplateContainer(template.root)
        this.variables = template.variables
    }
    toDto(): TemplateDto {
        return { root: this.root.toDto(), variables: this.variables }
    }
}