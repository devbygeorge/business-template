import fs from "fs";
import path from "path";
import MemberInfo from "@/components/MemberInfo/MemberInfo";
import Card from "@/components/Card/Card";

export default function Member({ member }) {
  if (!member) {
    return (
      <main className="main">
        <div className="container mt-5 mb-5">
          <h1>Member is not found...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <MemberInfo member={member} />

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
    </main>
  );
}

export async function getServerSideProps(context) {
  const databasePath = path.resolve(process.cwd(), "database");

  const { memberId } = context.params;
  const memberPath = `${databasePath}/${memberId}.json`;

  if (!fs.existsSync(memberPath)) {
    return {
      props: {
        member: null,
      },
    };
  }

  const data = JSON.parse(fs.readFileSync(memberPath, "utf8"));

  return {
    props: {
      member: data,
    },
  };
}
