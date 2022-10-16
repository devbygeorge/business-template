import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";

export default function Home({ members, isConnected }) {
  console.log("mongodb connected", isConnected);

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
  let isConnected = false;

  try {
    await connectMongo();
    isConnected = true;

    // const createMember = await Member.create({
    //   name: "Harriet R. Darlington",
    //   personal: "44444444444",
    //   birth: "1995-06-01T18:34:03.000Z",
    //   badge: "first",
    //   card: "0005",
    //   register: "2021-12-17T19:34:03.000Z",
    //   avatar: "/images/members/member-5.jpg",
    // });

    const data = await Member.find();
    members = JSON.parse(JSON.stringify(data)).reverse().slice(0, 6);
  } catch (e) {
    console.error(e);
  }

  return {
    props: { isConnected, members },
  };
}
