// Nessesary CSS
import '@/public/vendor/aos/aos.css'
import '@/public/vendor/bootstrap/css/bootstrap.min.css'
import '@/public/vendor/bootstrap-icons/bootstrap-icons.css'
import '@/public/vendor/boxicons/css/boxicons.min.css'
import '@/public/vendor/glightbox/css/glightbox.min.css'

import Head from 'next/head'
import Script from 'next/script'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import '@/styles/globals.css'
import '@/styles/layout.css'

import React, { useRef, useEffect } from 'react';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  const preloader = useRef(null);
  useEffect(() => {
    preloader.current.id = ''
  }, [])

  return (
    <>
    <Head>
      <title>Company Projects Template</title>
      <link rel="icon" href="/images/logo.png" />
    </Head>
    
    <SessionProvider session={session} >
      <Header />
      <Component {...pageProps} />
    </SessionProvider>

    <div ref={preloader} id="preloader"></div>
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
      <i className="bi bi-arrow-up-short"></i>
    </a>

    <Footer />
    {/* Vendor JS Files */}
    <Script src="/vendor/aos/aos.js" strategy="beforeInteractive"></Script>
    <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
    <Script src="/vendor/glightbox/js/glightbox.min.js" strategy="beforeInteractive"></Script>
    <Script src="/vendor/isotope-layout/isotope.pkgd.min.js" strategy="beforeInteractive"></Script>
    <Script src="/vendor/purecounter/purecounter.js" strategy="beforeInteractive"></Script>
    <Script src="/main.js" strategy="beforeInteractive"></Script>
    </>
  )
  
}

export default MyApp
