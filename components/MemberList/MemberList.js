import Link from 'next/link'
import Image from 'next/image'
import styles from './MemberList.module.css'


export default function MemberList({ members }) {
    return (
      <>
      <div className="container mb-4">
        <h5>Members</h5>
        <input className={styles.search} type="text" placeholder="Search...." />
        <p>Members Quantity - {members.length}</p>
        <ul className={styles.list}>
          {
            members.map(member => {
              return (
                <li key={member.card}>
                  <Link href={`/members/${member.personal}`}>
                    <a>
                      <div className={styles.image}>
                        <Image src={member.avatar} layout="fill" objectFit="cover" alt="Profile Picture" />
                      </div>
                      <span>{member.name}</span>
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      </>
    )
  }