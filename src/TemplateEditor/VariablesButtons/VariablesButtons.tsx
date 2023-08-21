import styles from "./VariableButtons.module.css"
import { VariableButton } from "./VariableButton/VariableButton"

export function VariablesButtons({ arrVarNames, onClick }: { arrVarNames: string[], onClick: (variableName: string) => void }) {
    return (
        <div>
            {
                arrVarNames.map(variableName => <VariableButton key={variableName} varName={variableName} onClick={() => onClick(variableName)} />)
            }
        </div>
    )
}