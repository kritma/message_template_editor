import tap from "tap"
import { TemplateComponentDto, TemplateConditionDto, TemplateContainerDto, TemplateStringDto } from "../src/utils/dto/dto"
import { solveCondition, solveString } from "../src/utils/solveTemplate.js"

function createString(value: string): TemplateStringDto {
    return { value, type: "String" }
}

function createContainer(children: TemplateComponentDto[]): TemplateContainerDto {
    return { children }
}

function createCondition(condition: string, then: string, otherwise: string): TemplateConditionDto {
    return { type: "Condition", condition: createContainer([createString(condition)]), then: createContainer([createString(then)]), otherwise: createContainer([createString(otherwise)]) }
}


tap.test("solve string", async (test) => {
    const template_string = createString("hey {name}, do you want some{thing}?")

    const values = { name: "John", thing: " chips" }
    let result = solveString(template_string, values, Object.keys(values))

    test.pass("solveString executed sucessfully")

    const wanted = "hey John, do you want some chips?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}" and variables ${JSON.stringify(values)}`)
})


tap.test("solve string with undefined variable", async (test) => {
    const template_string = createString("hey {name}, do you want some{thing}?")

    const values = { name: "John" }
    let result = solveString(template_string, values, Object.keys(values))

    test.pass("solveString executed sucessfully")

    const wanted = "hey John, do you want some?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}" and variables ${JSON.stringify(values)}`)
})


tap.test("solve condition", async (test) => {
    const template_condition = createCondition("{name}", "hello {name}!", "hello, how can i call you?")

    const values = { name: "John" }
    let result = solveCondition(template_condition, values, Object.keys(values))

    test.pass("solveCondition executed sucessfully")

    const wanted = "hello John!"
    test.equal(result, wanted, `solveCondition should return "${wanted}"`)
})


tap.test("solve condition else", async (test) => {
    const template_condition = createCondition("{name}", "hello {name}!", "hello, how can i call you?")

    const values = {}

    let result = solveCondition(template_condition, values, Object.keys(values))

    test.pass("solveCondition executed sucessfully")

    const wanted = "hello, how can i call you?"
    test.equal(result, wanted, `solveCondition should return "${wanted}"`)
})

