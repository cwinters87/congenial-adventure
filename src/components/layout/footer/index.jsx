import * as styles from './index.module.css'

function Footer() {

  return (
    <footer className={styles.footer}>
        <div className={styles.wrapper}>
            <p>© Wise Coverage 2023</p>
            <div className={styles.linkWrapper}>
                <a href="/">Privacy Policy</a>
                <a href="/">Terms of Use</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
