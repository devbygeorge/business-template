import Image from 'next/image'
import styles from './Team.module.css'

export default function Team() {
  return (
    <>
        <section id="team" className="team back-color">
            <div className="container" data-aos='fade-up'>
                <h2 className="heading mb-3">Team</h2>
                <p className="paragraph">Company Core Members</p>
                <div className="row justify-content-center align-items-stretch">

                    <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos='fade-up' data-aos-delay='100'>
                        <div className={styles.member}>
                            <div className={styles.image}>
                                <Image src="/images/team/member-1.jpg" layout="fill" objectFit="cover" objectPosition="top" quality="100" alt="Dawn A. Burns" />
                                <div className={styles.social}>
                                    <a href="#" rel="noreferrer" target="_blank" >
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="#" rel="noreferrer" target="_blank">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h4>Dawn A. Burns</h4>
                                <span>Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos='fade-up' data-aos-delay='200'>
                        <div className={styles.member}>
                            <div className={styles.image}>
                            <Image src="/images/team/member-2.jpg" layout="fill" objectFit="cover" objectPosition="top" quality="100" alt="Bertha E. Torres" />
                                <div className={styles.social}>
                                    <a href="#" rel="noreferrer" target="_blank" >
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="#" rel="noreferrer" target="_blank">
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h4>Bertha E. Torres</h4>
                                <span>Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos='fade-up' data-aos-delay='300'>
                        <div className={styles.member}>
                            <div className={styles.image}>
                                <Image src="/images/team/member-3.jpg" layout="fill" objectFit="cover" objectPosition="top" quality="100" alt="Lewis R. Servais" />
                                <div className={styles.social}>
                                    <a href="#" rel="noreferrer" target="_blank" >
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="#" rel="noreferrer" target="_blank" >
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="#" rel="noreferrer" target="_blank" >
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h4>Lewis R. Servais</h4>
                                <span>Founder</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}