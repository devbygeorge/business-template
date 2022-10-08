import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "@/styles/Login.module.css";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className={styles.login_container}>
        <Link href={`/creation`} passHref>
          <div className="login-info">
            <img
              className="login-image"
              src={session.user.image}
              alt="Profile Picture"
            />
            <h4 className="login-name">{session.user.name}</h4>
          </div>
        </Link>

        <button className="logout-button" onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="preloader"></div>;
  }

  return (
    <button className={styles.login_button} onClick={() => signIn("facebook")}>
      <i className="bx bxl-facebook-square"></i>
      Log in
    </button>
  );
}
