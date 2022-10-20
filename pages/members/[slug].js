import Profile from "@/components/Profile";
import Card from "@/components/Card";

export default function Member({ member }) {
  return (
    <main className="main">
      <div className="container">
        {member ? (
          <div>
            <Profile member={member} />
            <hr />
            <Card
              name={member.name}
              personal={member.personal}
              birth={member.birth}
              badge={member.badge}
              avatarUrl={member.avatar}
              card={member.card}
              register={member.register}
            />
          </div>
        ) : (
          <div className="my-5">
            <h1>Member is not found...</h1>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const connectMongo = require("@/lib/connectMongo").default;
  const Member = require("@/models/memberModel").default;
  const { slug } = context.params;

  let member = {};

  try {
    await connectMongo();
    const data = await Member.findOne(
      { personal: slug },
      "name personal birth badge avatar card register"
    );
    member = JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }

  return {
    props: { member },
  };
}
