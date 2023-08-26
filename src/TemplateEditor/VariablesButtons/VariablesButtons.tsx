import styles from './VariablesButtons.module.css'
import { VariableButton } from './VariableButton/VariableButton'

export function VariablesButtons({ arrVarNames }: { arrVarNames: string[] }) {
    return (
        <div className={styles.buttons}>
            {
                arrVarNames.map(variableName => <VariableButton key={variableName} varName={variableName} />)
            }
        </div>
    )
}