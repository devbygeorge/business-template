import fs from 'fs'
import path from 'path'
import MemberList from '@/components/MemberList/MemberList'

export default function Members({ members }) {
  return <MemberList members={members} />
}

export async function getServerSideProps() {

  const databasePath = path.resolve(process.cwd(), "database");

  const data = fs
    .readdirSync(databasePath)
    .map((member) => (member = JSON.parse(fs.readFileSync(`${databasePath}/${member}`, 'utf8'))))

  return {
    props: {
      members: data,
    }
  }
}