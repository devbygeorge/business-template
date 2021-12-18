import styles from './Principles.module.css'

export default function Principles() {
    
  return (
    <>
        <section id="principles" className="principles back-color">
            <div className="container" data-aos='fade-up'>
                <h2 className="heading">Principles</h2>
                <div className="row">
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 " data-aos='' data-aos-delay='100'>
                        <div className={styles.box}>
                            <h4>Principle 1</h4>
                            <p>
                                Vivamus sed diam enim. Morbi scelerisque dolor mi, a dapibus risus consequat non. 
                                Morbi ultricies pretium aliquam. Nullam scelerisque justo eros, ornare lacinia lectus posuere.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 " data-aos='' data-aos-delay='200'>
                        <div className={styles.box}>
                            <h4>Principle 2</h4>
                            <p>
                                Donec varius turpis id diam tempus bibendum. Fusce quis accumsan nunc, vel tempor metus. 
                                Vestibulum malesuada lorem ac neque gravida, in molestie tellus vulputate. 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 " data-aos='' data-aos-delay='300'>
                        <div className={styles.box}>
                            <h4>Principle 3</h4>
                            <p>                      
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam iaculis venenatis sodales. 
                                Nunc quis mi risus. Etiam diam risus, posuere at velit et, varius sodales lectus. 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos='' data-aos-delay='400'>
                        <div className={styles.box}>
                            <h4>Principle 4</h4>
                            <p>
                                Donec quis quam justo. Duis finibus euismod ultrices. Sed tempus 
                                tincidunt rhoncus. Phasellus eget suscipit erat. Fusce eleifend 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos='' data-aos-delay='500'>
                        <div className={styles.box}>
                            <h4>Principle 5</h4>
                            <p>
                                Curabitur ac scelerisque tortor, in vehicula quam. Vivamus 
                                pellentesque erat at risus molestie, non finibus massa cursus. 
                                Pellentesque finibus magna sit amet mi vehicula facilisis
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos='' data-aos-delay='600'>
                        <div className={styles.box}>
                            <h4>Principle 6</h4>
                            <p>
                                velit ligula, malesuada luctus luctus sed, iaculis cursus mauris. 
                                Nam venenatis rhoncus nisi. Quisque aliquet sit amet nisi non. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}