import Image from "next/image";
import styles from "@/styles/Profile.module.css";

export default function Profile({ member }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          src={member.avatar}
          layout="fill"
          objectFit="cover"
          alt="Profile Picture"
        />
      </div>
      <div className={styles.info}>
        <h2>{member.name}</h2>
        <h3>{member.badge} place</h3>
      </div>
    </div>
  );
}
