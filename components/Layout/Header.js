import Link from 'next/link'
import Image from 'next/image'

import LoginForm from './LoginForm'

export default function Header() {

    return (
        <>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                  <Link href="/">
                    <a className="logo">
                      <Image src='/images/logo.png' width={40} height={40} alt="company logo" />
                    </a>
                  </Link>
                  <nav id="navbar" className="navbar">
                  <ul>
                      <li>
                          <Link href="/#hero">
                              <a className="scrollto"> Home </a>
                          </Link>
                      </li>
                      <li>
                          <Link href="/#about">
                              <a className="scrollto"> About </a>
                          </Link>
                      </li>
                      <li>
                          <Link href="/#partners">
                              <a className="scrollto"> Partners </a>
                          </Link>
                      </li>
                      <li>
                          <Link href="/#members">
                              <a className="scrollto"> Members </a>
                          </Link>
                      </li>
                      <li>
                          <Link href="/#team">
                              <a className="scrollto"> Team </a>
                          </Link>
                      </li>
                      <li>
                          <Link href="/#faq">
                              <a className="scrollto"> FAQ </a>
                          </Link>
                      </li>
                      <li>
                        <a><LoginForm /></a>
                      </li>
                  </ul>
                  <i className="bi bi-list mobile-nav-toggle"></i>       
                </nav>
                </div>
            </header>
        </>
    )        
}