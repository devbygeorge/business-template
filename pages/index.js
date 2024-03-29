import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";

export default function Home({ members }) {
  return (
    <main className="main">
      <Hero />
      <Carousel members={members} />
    </main>
  );
}

export async function getServerSideProps() {
  const connectMongo = require("@/lib/connectMongo").default;
  const Member = require("@/models/memberModel").default;

  let members = [];

  try {
    await connectMongo();

    const data = await Member.find({}, "name personal badge card avatar");
    members = JSON.parse(JSON.stringify(data)).reverse().slice(0, 6);
  } catch (e) {
    console.error(e);
  }

  return {
    props: { members },
  };
}
