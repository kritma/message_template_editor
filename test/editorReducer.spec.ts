import tap from "tap"
import { EditorContextType, editorReducer } from '../src/TemplateEditor/EditorProvider/editorReducer'
import { Template, TemplateCondition, TemplateString } from "../src/utils/dtoWrappers"

tap.test("insert condition", async (test) => {
    const template = new Template({ root: { children: [] }, variables: [] })
    template.root.children.push(new TemplateString("bobabiba"))

    const state: EditorContextType = { selection: { selectionStart: 4, selectionEnd: 8, id: template.root.children[0].id }, template }

    const result = editorReducer(state, { type: "insert_condition" })

    test.pass("editorReducer executed successfully")
    const wanted = {
        root: {
            children: [
                { type: "String", value: "boba" },
                { type: "Condition" },
                { type: "String", value: "" }
            ]
        }
    }
    test.match(result.template, wanted, `${JSON.stringify(result.template.toDto())}`)
})

tap.test("insert variable", async (test) => {
    const template = new Template({ root: { children: [] }, variables: [] })
    template.root.children.push(new TemplateString("variable: here"))

    const state: EditorContextType = { selection: { selectionStart: 10, selectionEnd: 14, id: template.root.children[0].id }, template }

    const result = editorReducer(state, { type: "insert_variable", variableName: "variable" })

    test.pass("editorReducer executed successfully")
    const wanted = {
        root: {
            children: [
                { type: "String", value: "variable: {variable}" },
            ]
        }
    }
    test.match(result.template, wanted, `${JSON.stringify(result.template.toDto())}`)
})

tap.test("delete condition", async (test) => {
    const template = new Template({ root: { children: [] }, variables: [] })

    const first = "big"
    const second = " money"
    template.root.children.push(new TemplateString(first))
    template.root.children.push(new TemplateCondition())
    template.root.children.push(new TemplateString(second))


    const state: EditorContextType = { selection: { selectionStart: 0, selectionEnd: 0, id: template.root.children[0].id }, template }

    const result = editorReducer(state, { type: "delete_condition", id: template.root.children[1].id })

    test.pass("editorReducer executed successfully")
    const wanted = {
        root: {
            children: [
                { type: "String", value: first + second }
            ]
        }
    }
    test.match(result.template, wanted, `${JSON.stringify(result.template.toDto())}`)
})

tap.test("set value", async (test) => {
    const template = new Template({ root: { children: [] }, variables: [] })

    template.root.children.push(new TemplateString("Hi, my name is, what?"))


    const state: EditorContextType = { selection: { selectionStart: 0, selectionEnd: 0, id: template.root.children[0].id }, template }

    const result = editorReducer(state, { type: "set_value", value: "My name is, who?", id: template.root.children[0].id })

    test.pass("editorReducer executed successfully")
    const wanted = {
        root: {
            children: [
                { type: "String", value: "My name is, who?" }
            ]
        }
    }
    test.match(result.template, wanted, `${JSON.stringify(result.template.toDto())}`)
})
