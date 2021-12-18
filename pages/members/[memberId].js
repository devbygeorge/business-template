import fs from 'fs'
import MemberInfo from '../../components/MemberInfo/MemberInfo'
import Card from '../../components/Card/Card'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Member({ member }) {
  const router = useRouter()

  useEffect(() => {
    if(!member){
      router.push('/creation')
    }
  }, [])

  if(!member){
    return (
      <>
        <div className="container mt-5 mb-5" data-aos="fade-right">
          <h1>Member is not found...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container" data-aos="fade-right">

        <MemberInfo member={member} />

        <hr />

        <Card 
          name={member.name}
          personal={member.personal} 
          birth={member.birth}
          badge={member.badge}
          avatarUrl={member.avatar}
          card={member.card}
          register={member.register} 
        />

      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const { memberId } = context.params;
  const path = `./pages/api/database/${memberId}.json`;

  if(!fs.existsSync(path)){
    return {
      props: {
        member: null
      }
    }
  }

  const data = JSON.parse(fs.readFileSync(`./pages/api/database/${memberId}.json`, 'utf8'))

  return {
    props: {
      member: data,
    }
  }
}