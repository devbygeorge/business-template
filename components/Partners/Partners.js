import Image from 'next/image'
import styles from './Partners.module.css'

// Partner Logos
import company1 from '@/public/images/partners/company-1.png'
import company2 from '@/public/images/partners/company-2.png'
import company3 from '@/public/images/partners/company-3.png'
import company4 from '@/public/images/partners/company-4.png'
import company5 from '@/public/images/partners/company-5.png'
import company6 from '@/public/images/partners/company-6.png'

export default function Partners() {
  return (
    <>
        <section id="partners" className={`${styles.partners} back-color`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company1} alt="autospeed" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company2} alt="cheshire county" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company3} alt="croft's accountants" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company4} alt="fast banana" loading="eager" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company5} alt="greens food suppliers" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <a href="#" rel="noreferrer" target="_blank">
                            <Image src={company6} alt="yoga baby" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}