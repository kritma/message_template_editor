import { TemplateContainer } from "../../dto/template";
import { String } from "./String";

export function Container({ self }: { self: TemplateContainer }) {
    return <>{
        self.children.map(c => {
            switch (c.type) {
                case "String":
                    return <String self={c} />
                case "Condition":
                    return <p></p>
                default:
                    throw new Error("no such type")
            }
        })
    }</>
}