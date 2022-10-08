import fs from "fs";
import path from "path";

import Members from "@/components/MemberSlider/MemberSlider";

export default function Home({ members }) {
  return (
    <main className="main">
      <Members members={members} />
    </main>
  );
}

export async function getServerSideProps() {
  const databasePath = path.resolve(process.cwd(), "database");

  const data = fs
    .readdirSync(databasePath)
    .map(
      (member) =>
        (member = JSON.parse(
          fs.readFileSync(`${databasePath}/${member}`, "utf8")
        ))
    )
    .sort((a, b) => b.card - a.card)
    .slice(0, 6);

  return {
    props: {
      members: data,
    },
  };
}
