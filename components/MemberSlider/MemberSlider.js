import { useEffect } from 'react'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Image from 'next/image'
import Link from 'next/link'

import styles from './MemberSlider.module.css'

export default function MemberSlider({ members }) {
    
    useEffect(() => {
      new Swiper("#members-slider", {
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    },[])
    
  return (
    <>
    <section id="members" className={styles.members}>
        <div className="container" data-aos='fade-up'>
            <h2 className="heading">Members</h2>
            <div id="members-slider" className="swiper-container overflow-hidden mb-5 mt-5" >
                <div className="swiper-wrapper">
                  
                    {
                    members.map(member => {
                      return (
                        <div key={member.card} className="swiper-slide">
                          <Link href={`/members/${member.personal}`}>
                            <a className={styles.member}>
                                <div className={styles.avatar}>
                                    <Image src={member.avatar} layout="fill" loading="eager" objectFit="cover" alt="Member Picture" />
                                </div>
                                <h3 className={styles.name}>{member.name}</h3>
                                <h4 className={styles.badge}>{member.badge} place</h4>
                            </a>
                          </Link>
                        </div>
                      )
                    })
                  }

                </div>
            </div>
            <Link href="/members">
                <a className={styles.button}>All Members</a>
            </Link>
        </div>
    </section>
    </>
  )
}