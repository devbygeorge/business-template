import fs from "fs";
import path from "path";
import { useState } from "react";
import Form from "@/components/Form/Form";
import Card from "@/components/Card/Card";

export default function Creation({ newCard }) {
  const [name, setName] = useState("name surname");
  const [personal, setPersonal] = useState("00000000000");
  const [birth, setBirth] = useState(new Date());
  const [badge, setBadge] = useState("first");
  const [avatar, setAvatar] = useState("/images/avatar.png");
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.png");
  const [card, setCard] = useState(newCard);
  const [register, setRegister] = useState(new Date());

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

export async function getServerSideProps() {
  const databasePath = path.resolve(process.cwd(), "database");

  const data = fs
    .readdirSync(databasePath)
    .map(
      (member) =>
        (member = JSON.parse(
          fs.readFileSync(`${databasePath}/${member}`, "utf8")
        ).card)
    )
    .sort((a, b) => b - a);
  const newCard = parseInt(data[0]) + 1;

  if (!newCard) {
    return {
      props: {
        newCard: "0001",
      },
    };
  }

  return {
    props: {
      newCard: JSON.stringify(newCard).padStart(4, "0"),
    },
  };
}
