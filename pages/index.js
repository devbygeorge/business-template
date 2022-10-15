import fs from "fs";
import path from "path";

import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";

import clientPromise from "../lib/mongodb";

export default function Home({ members, isConnected }) {
  console.log('Is mongodb conneted', isConnected)
  return (
    <main className="main">
      <Hero />
      <Carousel members={members} />
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

  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const commentsData = await db
      .collection("comments")
      .find({})
      .limit(20)
      .toArray();
    const comments = JSON.parse(JSON.stringify(commentsData));

    return {
      props: { isConnected: true, members: data },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, members: data },
    };
  }
}
