import styles from "./VariableButton.module.css"

export function VariableButton({ varName, onClick }: { varName: string, onClick: () => void }) {
    return (
        <button onClick={onClick}>
            {`{${varName}}`}
        </button>
    )
}