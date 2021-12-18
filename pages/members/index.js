import fs from 'fs'
import MemberList from '../../components/MemberList/MemberList'

export default function Members({ members }) {
  return <MemberList members={members} />
}

export async function getServerSideProps() {
  const data = fs
    .readdirSync('./pages/api/database')
    .map((member) => (member = JSON.parse(fs.readFileSync(`./pages/api/database/${member}`, 'utf8'))))

  return {
    props: {
      members: data,
    }
  }
}