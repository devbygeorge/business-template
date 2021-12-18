import fs from 'fs'
import path from 'path'

import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Partners from '../components/Partners/Partners'
import Members from '../components/MemberSlider/MemberSlider'
import Principles from '../components/Principles/Principles'
import Team from '../components/Team/Team'
import Questions from '../components/Questions/Questions'

export default function Home({ members }) {

  return (
    <>
      <main>
        <Hero />
        <About />
        <Partners />
        <Members members={members} />
        <Principles />
        <Team />
        <Questions />
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const databasePath = path.resolve(process.cwd(), "database");

	const data = fs
		.readdirSync(databasePath)
		.map((member) => (member = JSON.parse(fs.readFileSync(`${databasePath}/${member}`, 'utf8'))))
		.sort((a, b) => b.card - a.card)
		.slice(0, 6);

  return {
    props: {
      members: data,
    }
  }
}