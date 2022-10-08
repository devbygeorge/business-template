import Image from "next/image";
import styles from "./Card.module.css";

import { useEffect, useState } from "react";
import barcodeGenerator from "../../utils/BarcodeGenerator";

export default function Card({
  name,
  personal,
  birth,
  badge,
  avatarUrl,
  card,
  register,
}) {
  const [barcode, setBarcode] = useState("/");

  useEffect(() => {
    (async function () {
      setBarcode(
        await barcodeGenerator(`https://yourcompany.com/members/${personal}`)
      );
    })();
  }, [personal]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <header>
          <h3>{name}</h3>
          <span>{badge} place</span>
        </header>

        <main>
          <div className={styles.badge}>
            <div style={{ height: "100%", position: "relative" }}>
              <Image
                src={`/images/badges/${badge}.png`}
                layout="fill"
                objectFit="cover"
                alt={badge + " badge"}
              />
            </div>
          </div>

          <div className={styles.avatar}>
            <div style={{ height: "100%", position: "relative" }}>
              <Image
                src={avatarUrl}
                layout="fill"
                objectFit="cover"
                alt={name}
              />
            </div>
          </div>
        </main>

        <footer>card template</footer>
      </div>

      <div className={styles.card}>
        <header>
          <h3>{name}</h3>
          <span>{badge} place</span>
        </header>

        <main>
          <span>DATE OF BIRTH</span>
          <h4>{new Date(birth).toLocaleDateString("en-GB")}</h4>

          <span>PERSONAL NUMBER</span>
          <h4>{personal}</h4>

          <span>CARD NUMBER</span>
          <h4>{card}</h4>

          <span>DATE OF REGISTRATION</span>
          <h4>{new Date(register).toLocaleDateString("en-GB")}</h4>

          <div className={styles.barcode}>
            <div style={{ height: "100%", position: "relative" }}>
              <Image src={barcode} layout="fill" alt="Barcode" />
            </div>
          </div>
        </main>

        <footer>card template</footer>
      </div>
    </div>
  );
}
