import tap from "tap"
import { TemplateComponentDto, TemplateConditionDto, TemplateContainerDto, TemplateDto, TemplateStringDto } from "../src/utils/dto"
import { solveCondition, solveContainer, solveString, solveTemplate } from "../src/utils/solveTemplate.js"

function createString(value: string): TemplateStringDto {
    return { value, type: "String" }
}

function createContainer(children: TemplateComponentDto[]): TemplateContainerDto {
    return { children }
}

function createCondition(condition: string, then: string, otherwise: string): TemplateConditionDto {
    return { type: "Condition", condition: createContainer([createString(condition)]), then: createContainer([createString(then)]), otherwise: createContainer([createString(otherwise)]) }
}

tap.test("solve string without variables", async (test) => {
    const template_string = createString("do you want some chips?")

    const values = {}
    let result = solveString(template_string, values, Object.keys(values))

    test.pass("solveString executed successfully")

    const wanted = "do you want some chips?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}"`)
})

tap.test("solve string with all variables", async (test) => {
    const template_string = createString("hey {name}, do you want some{thing}?")

    const values = { name: "John", thing: " chips" }
    let result = solveString(template_string, values, Object.keys(values))

    test.pass("solveString executed successfully")

    const wanted = "hey John, do you want some chips?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}" and values ${JSON.stringify(values)}`)
})


tap.test("solve string with undefined variable", async (test) => {
    const template_string = createString("hey {name}, do you want some{thing}?")

    const values = { name: "John" }
    let result = solveString(template_string, values, ["name", "thing"])

    test.pass("solveString executed successfully")

    const wanted = "hey John, do you want some?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}" and values ${JSON.stringify(values)}`)
})

tap.test("solve string with not a variable in brackets", async (test) => {
    const template_string = createString("hey {name}, do you want some{thing}?")

    const values = { name: "John" }
    let result = solveString(template_string, values, ["name",])

    test.pass("solveString executed successfully")

    const wanted = "hey John, do you want some{thing}?"
    test.equal(result, wanted, `solveString should return "${wanted}" with template: "${template_string.value}" and values ${JSON.stringify(values)}`)
})


tap.test("solve condition", async (test) => {
    const template_condition = createCondition("{name}", "hello {name}!", "hello, how can i call you?")

    const values = { name: "John" }
    let result = solveCondition(template_condition, values, Object.keys(values))

    test.pass("solveCondition executed successfully")

    const wanted = "hello John!"
    test.equal(result, wanted, `solveCondition should return "${wanted}"`)
})


tap.test("solve condition else", async (test) => {
    const template_condition = createCondition("{name}", "hello {name}!", "hello, how can i call you?")

    const values = {}

    let result = solveCondition(template_condition, values, ["name"])

    test.pass("solveCondition executed successfully")

    const wanted = "hello, how can i call you?"
    test.equal(result, wanted, `solveCondition should return "${wanted}"`)
})


tap.test("solve container with condition in it", async (test) => {
    const template_container = createContainer([createCondition("{name}", "hello {name}!", "hello, how can i call you?")])

    const values = {}

    let result = solveContainer(template_container, values, ["name"])

    test.pass("solveContainer executed successfully")

    const wanted = "hello, how can i call you?"
    test.equal(result, wanted, `solveContainer should return "${wanted}"`)
})

tap.test("solve condition container with not valid component", async (test) => {

    test.throws(() => solveContainer(createContainer([{} as TemplateStringDto]), {}, []), { message: "Not valid scheme, type property should be Condition or String" }, "should throws error")
})

tap.test("solve template", async (test) => {

    const template: TemplateDto = { variables: ["expression"], root: createContainer([createCondition("{expression}", "this was {expression}", "")]) }

    const values = { expression: "awesome!" }

    let result = solveTemplate(template, values)

    test.pass("solveTemplate executed successfully")

    const wanted = "this was awesome!"
    test.equal(result, wanted, `solveTemplate should return "${wanted}"`)
})