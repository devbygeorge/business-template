import Image from 'next/image'
import Link from 'next/link'
import styles from './About.module.css'

export default function About() {
  return (
    <>
     <section id="about" className={styles.about}>
        <div className="container" data-aos='fade-up'>

            <div className="text-center mb-5">
                <h2 className="heading">About Us</h2>
                <p className={styles.paragraph}>
                    Morbi tincidunt efficitur ligula id sodales. 
                    Sed semper eros a risus auctor, eget posuere odio tempor. 
                    Nullam eu mollis dolor. Integer quis sapien odio. Donec in leo neque. 
                    Etiam justo lectus, suscipit in posuere vitae, porttitor sit amet magna. 
                    Nulla quis magna congue, pellentesque nibh a, tincidunt eros. 
                    Aliquam sit amet sollicitudin lorem, quis blandit velit. 
                    Praesent sed eros congue, facilisis lorem nec, semper nulla. 
                    Nullam dapibus ultricies nunc at varius. 
                    Duis est lectus, viverra non placerat accumsan, ultrices vel lorem. 
                </p>
                <Link href="/aboutus">
                    <a className={styles.button} >More</a>
                </Link>
            </div>

            {/* ------------------ */}
            <div className="row align-items-stretch">
                <div className="col-lg-6 video-box" data-aos='fade-right' data-aos-delay='100'>
                    <div className={styles.image}>
                        <Image src='/images/thumbnail.jpg' layout="fill" objectFit="cover" alt="company footage"/>
                    </div>
                    <Link passHref href="https://www.youtube.com/watch?v=CiBu9_lkysA">
                        <a className={`glightbox ${styles.playButton}`} data-vbtype='video' data-autoplay='true'></a>
                    </Link>
                </div>
                <div className="col-lg-6 pt-3 pt-lg-0 d-flex flex-column justify-content-center" data-aos='fade-left' data-aos-delay='100'>
                    <h3 className={styles.subheading}>Purposes</h3>
                    <ul className={styles.list}>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Sed porta purus in lorem imperdiet, a posuere lectus tempor.
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Sed porta purus in lorem imperdiet.
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Etiam mattis quis massa ac efficitur. 
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Vivamus sed diam enim. Morbi scelerisque dolor mi. 
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Quis efficitur odio cursus eu. Duis nunc mi. 
                        </li>
                        <li>
                            <i className="bx bx-check-double"></i>
                            Eleifend imperdiet augue, nec volutpat ligula venenatis.
                        </li>
                        
                    </ul>
                </div>
            </div>
         </div>
     </section>
    </>
  )
}