import { useContext, useState } from "react";
import { TemplateString } from "../../dto/template";

export function String({ self }: { self: TemplateString }) {
    const [value, setValue] = useState(self.value)
    self.value = value
    return <input onFocus={console.log} onChange={e => setValue(e.target.value)} value={self.value} />
}