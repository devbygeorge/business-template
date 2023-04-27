import Image from "next/image";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container position-relative text-center">
        <h1 className={styles.heading}>Company Business Template</h1>
        <Image
          src="/images/logo.png"
          alt="company logo"
          width={290}
          height={290}
        />
        <h2 className={styles.subheading}>
          Get a card and enjoy the privileges
        </h2>
      </div>
    </section>
  );
}
