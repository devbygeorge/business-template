import { useState } from "react";
import { useSession } from "next-auth/react";

import Form from "@/components/Form";
import Card from "@/components/Card";

export default function Creation({ nextCard }) {
  const { status } = useSession();

  const [name, setName] = useState("name surname");
  const [personal, setPersonal] = useState("00000000000");
  const [birth, setBirth] = useState(new Date());
  const [badge, setBadge] = useState("first");
  const [avatar, setAvatar] = useState("/images/avatar.png");
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.png");
  const [card, setCard] = useState(nextCard);
  const [register, setRegister] = useState(new Date());

  if (status === "authenticated") {
    return (
      <main className="main">
        <div className="container">
          <Form
            name={name}
            setName={setName}
            personal={personal}
            setPersonal={setPersonal}
            birth={birth}
            setBirth={setBirth}
            badge={badge}
            setBadge={setBadge}
            avatar={avatar}
            setAvatar={setAvatar}
            card={card}
            setCard={setCard}
            setAvatarUrl={setAvatarUrl}
            register={register}
            setRegister={setRegister}
          />

          <Card
            name={name}
            personal={personal}
            birth={birth}
            badge={badge}
            avatarUrl={avatarUrl}
            card={card}
            register={register}
          />
        </div>
      </main>
    );
  }

  if (status === "loading") {
    return <div className="preloader"></div>;
  }

  return (
    <main className="main">
      <div className="container mt-5 mb-5">
        <h1>Please authorize to use this feature...</h1>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const connectMongo = require("@/lib/connectMongo").default;
  const Member = require("@/models/memberModel").default;
  let nextCard = "0001";

  try {
    await connectMongo();

    const data = await Member.find();
    const members = JSON.parse(JSON.stringify(data));

    if (members) {
      const lastCard = members[members.length - 1].card;
      nextCard = JSON.stringify(parseInt(lastCard) + 1).padStart(4, "0");
    }
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      nextCard: nextCard,
    },
  };
}
