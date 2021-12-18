import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginForm() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {

    return(
      <div className="login-container">

        <Link href={`/creation`} passHref >
          <div className="login-info">
            <img className="login-image" src={session.user.image} alt="Profile Picture" />
            <h4 className="login-name">{session.user.name}</h4>
          </div>
        </Link>

        <button className="logout-button" onClick={() => signOut()} >
          Log out
        </button>

      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="loading"></div>
    )
  }

  return (
    <button className="login-button" onClick={() => signIn("facebook")} >
      <i className='bx bxl-facebook-square'></i>
      Log in
    </button>
  );
};