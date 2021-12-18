import Image from 'next/image'
import styles from './Questions.module.css'

export default function Questions() {
  return (
    <>
        <section id="faq" className="faq back-color">
            <div className="container" data-aos='fade-up'>
                <h2 className="heading">FAQ</h2>
                <p className="paragraph">Frequently Asked Questions by Members</p>
                <ul className={styles.list}>

                        <li data-aos='fade-up' data-aos-delay='100'>
                            <i id={styles.help} className="bx bx-help-circle icon-help"></i> 
                            <a className="collapsed" data-bs-toggle='collapse' data-bs-target='#faq-list-1'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                <i id={styles.show} className="bx bx-chevron-down icon-show"></i>
                                <i id={styles.close} className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div id="faq-list-1" className="collapse">
                                <p className={styles.paragraph}>
                                    Morbi eu sapien quis sem sollicitudin lacinia.
                                    Sed at dui porta, pellentesque lacus vel, hendrerit quam.
                                </p>
                            </div>
                        </li>
                    
                        <li data-aos='fade-up' data-aos-delay='200'>
                            <i id={styles.help} className="bx bx-help-circle icon-help"></i> 
                            <a className="collapsed" data-bs-toggle='collapse' data-bs-target='#faq-list-2'>
                                Integer ut dui semper, dictum metus in, bibendum elit.
                                <i id={styles.show} className="bx bx-chevron-down icon-show"></i>
                                <i id={styles.close} className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div id="faq-list-2" className="collapse">
                                <p className={styles.paragraph}>
                                    Nulla tempus augue at enim scelerisque, luctus rhoncus ante congue.
                                    Phasellus nec lorem sit amet magna vulputate pellentesque id eget purus.
                                </p>
                            </div>
                        </li>
                    
                        <li data-aos='fade-up' data-aos-delay='300'>
                            <i id={styles.help} className="bx bx-help-circle icon-help"></i> 
                            <a className="collapsed" data-bs-toggle='collapse' data-bs-target='#faq-list-3'>
                                Integer ut lacus tincidunt, mollis dui et, finibus erat.
                                <i id={styles.show} className="bx bx-chevron-down icon-show"></i>
                                <i id={styles.close} className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div id="faq-list-3" className="collapse">
                                <p className={styles.paragraph}>
                                    Ut efficitur mauris vel neque tempor rhoncus.
                                    Mauris quis eros volutpat, varius dolor ut, tempus dolor.
                                </p>
                            </div>
                        </li>
                    
                        <li data-aos='fade-up' data-aos-delay='400'>
                            <i id={styles.help} className="bx bx-help-circle icon-help"></i> 
                            <a className="collapsed" data-bs-toggle='collapse' data-bs-target='#faq-list-4'>
                                Aliquam quis lacus pulvinar, porttitor erat non, dictum leo.
                                <i id={styles.show} className="bx bx-chevron-down icon-show"></i>
                                <i id={styles.close} className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div id="faq-list-4" className="collapse">
                                <p className={styles.paragraph}>
                                    Maecenas consectetur nulla ac dictum eleifend.
                                    Donec varius tellus a nibh interdum eleifend.
                                </p>
                            </div>
                        </li>
                    
                        <li data-aos='fade-up' data-aos-delay='500'>
                            <i id={styles.help} className="bx bx-help-circle icon-help"></i> 
                            <a className="collapsed" data-bs-toggle='collapse' data-bs-target='#faq-list-5'>
                                Donec eu lorem at massa interdum venenatis.
                                <i id={styles.show} className="bx bx-chevron-down icon-show"></i>
                                <i id={styles.close} className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div id="faq-list-5" className="collapse">
                                <p className={styles.paragraph}>
                                    Nam finibus erat nec velit aliquet, ut rhoncus quam vestibulum.
                                    Pellentesque sit amet lorem feugiat, faucibus nisl vel, interdum ante.
                                </p>
                            </div>
                        </li>
                    
                    </ul>
            </div>
        </section>
    </>
  )
}