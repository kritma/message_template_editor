import React, { useState } from "react";
import styles from "./Popup.module.css";

function Popup({ children, closePopup }: { children: React.ReactNode, closePopup: () => void }) {
    return (
        <div className={styles.popup_container}>
            <div>
                {children}
            </div>
            <button className={styles.button} onClick={closePopup}>Close</button>
        </div>
    );
};

export function PopupButton({ text, children }: { children: React.ReactNode, text: string, }) {
    const [isOpen, SetOpenState] = useState(false)
    return <>
        <button className={styles.button} onClick={() => { SetOpenState(true) }}>{text}</button>
        {isOpen ? <Popup closePopup={() => SetOpenState(false)}>{children}</Popup> : null}
    </>
}
