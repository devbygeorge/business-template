import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/components/LoginForm/LoginForm";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/">
          <a className="logo">
            <Image
              src="/images/logo.png"
              width={40}
              height={40}
              alt="company logo"
            />
          </a>
        </Link>
        <nav id="navbar" className={styles.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/creation">Create Card</Link>
            </li>
            <li>
              <Link href="/download">Download PDFs</Link>
            </li>
            <li>
              <a>
                <LoginForm />
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
