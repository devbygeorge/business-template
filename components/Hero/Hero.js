import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <>
      <section id="hero" className={styles.hero}>
        <div className="container position-relative" data-aos="fade-up" data-aos-delay='100'>
            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                    
                    <h1 className={styles.heading}>Company Projects Template</h1>
                    <Image src='/images/logo.png' alt="company logo" width={290} height={290}/>
                    <h2 className={styles.subheading}>Slogan goes here</h2>
                    <a href="#" className={styles.button}>Join Us</a>
                
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='200'>
                    <div className={styles.box}>
                        <h4>Badge 1</h4>
                        <p>Ut volutpat porttitor eros vel suscipit. Suspendisse pharetra.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='300'>
                    <div className={styles.box}>
                        <h4>Badge 2</h4>
                        <p>Nullam interdum euismod dui, vitae dapibus mauris ullamcorper.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='400'>
                    <div className={styles.box}>
                        <h4>Badge 3</h4>
                        <p>In scelerisque nisl id leo vehicula. vel tincidunt.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='500'>
                    <div className={styles.box}>
                        <h4>Badge 4</h4>
                        <p>aecenas tristique lacus et felis scelerisque ullamcorper. Mauris in elit.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='600'>
                    <div className={styles.box}>
                        <h4>Badge 5</h4>
                        <p>Cras porttitor arcu a semper sollicitudin. Morbi.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='700'>
                    <div className={styles.box}>
                        <h4>Badge 6</h4>
                        <p>Pellentesque ullamcorper nisl eget metus vulputate ullamcorper. </p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='800'>
                    <div className={styles.box}>
                        <h4>Badge 7</h4>
                        <p>In hac habitasse platea dictumst. Pellentesque tristique tellus.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4" data-aos='zoom-in' data-aos-delay='900'>
                    <div className={styles.box}>
                        <h4>Badge 8</h4>
                        <p>Quisque vestibulum mauris quis pretium aliquam. Donec auctor et.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}