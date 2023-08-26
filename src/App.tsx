import { PopupButton } from './utils/Popup/Popup'
import { LocalStorageTemplateLoader } from './LocalStorageTemplateLoader'
import styles from './App.module.css'
function App() {
  return (
    <div className={styles.app}>
      <PopupButton text='Message Editor'>
        <LocalStorageTemplateLoader />
      </PopupButton>
    </div>
  )
}

export default App
