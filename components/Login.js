import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "@/styles/Login.module.css";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <Link href={`/creation`} passHref>
          <div className={styles.user}>
            <img
              className={styles.avatar}
              src={session.user.image}
              alt="Profile"
            />
            <h4 className={styles.name}>{session.user.name}</h4>
          </div>
        </Link>

        <button className={styles.logout} onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="preloader"></div>;
  }

  return (
    <button className={styles.gitbutton} onClick={() => signIn("github")}>
      Sign in with github
      <img src="/images/github.png" alt="github" />
    </button>
  );
}
