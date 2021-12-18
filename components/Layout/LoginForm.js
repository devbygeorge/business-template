import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginForm() {
  const { data: session, status } = useSession()
  
  if (status === 'authenticated') {

    return(
      <div className="login-container">

        <Link href={`/creation`} passHref >
          <div className="login-info">
            <div className="login-image">
              <Image src={session.user.image} layout="fill" objectFit="cover" alt="Profile Picture" />
            </div>
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