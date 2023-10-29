import Logo from '../../../assets/images/wise_logo_wordmark_color.png'
import * as styles from './index.module.css'

function Header() {

    return (
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logo}><img className={styles.logo} src={Logo}/></a>
        </div>
      </header>
    )
  }
  
  export default Header
