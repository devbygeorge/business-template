import Image from "next/image";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h1 className={styles.heading}>Company Projects Template</h1>
            <Image
              src="/images/logo.png"
              alt="company logo"
              width={290}
              height={290}
            />
            <h2 className={styles.subheading}>Slogan goes here</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
