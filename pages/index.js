import fs from "fs";
import path from "path";

import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";

export default function Home({ members, isConnected }) {
  console.log("Is mongodb conneted", isConnected);
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

  const connectMongo = require("@/lib/connectMongo").default;
  const Member = require("@/models/memberModel").default;

  try {
    await connectMongo();
    console.log("connected to mongoose");

    // const createMember = await Member.create({
    //   name: "Nikoloz",
    //   email: "gamogabo@gmail.com",
    // });

    const members = await Member.find();
    console.log(members);

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
