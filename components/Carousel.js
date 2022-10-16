import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Carousel.module.css";

export default function Carousel({ members }) {
  return (
    <section className="text-center">
      <div className="container">
        <h2 className="heading">Members</h2>

        <Swiper
          className="my-5"
          modules={[Autoplay]}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView="auto"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {members &&
            members.map((member) => {
              return (
                <SwiperSlide key={member.card}>
                  <Link href={`/members/${member.personal}`}>
                    <a>
                      <div className={styles.avatar}>
                        <Image
                          src={member.avatar}
                          layout="fill"
                          loading="eager"
                          objectFit="cover"
                          alt={member.name}
                        />
                      </div>
                      <h3 className={styles.name}>{member.name}</h3>
                      <h4 className={styles.badge}>{member.badge} place</h4>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>

        <Link href="/members">
          <a className={styles.button}>All Members</a>
        </Link>
      </div>
    </section>
  );
}
