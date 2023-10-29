import MerchantForm from '../components/form'
import Footer from '../components/layout/footer'
import Header from '../components/layout/header'
import HeroImg from '../assets/images/hero.svg'
import HeroImgBackground from '../assets/images/hero-background.jpg'
import * as styles from './MerchantApp.module.css'

function MerchantApp() {

  return (
    <>
      <div className={styles.wrapper}>
      <Header />
        <section className={styles.hero}>
                <div className={styles.shell}>
                    <figure className={styles.hero__background}>
                        <img src={HeroImgBackground} alt="" width="1440" height="900" />
                    </figure>
                    <div className={styles.hero__inner}>
                        <figure className={styles.hero__image}>
                            <img src={HeroImg} alt="" width="708" height="466" />
                        </figure>
                        <div className={styles.hero__content}>
                            <h1>WiseChoice</h1>
                            <p>A comprehensive health care benefits bundle</p>
                            <MerchantForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
      <Footer />
    </>
  )
}

export default MerchantApp