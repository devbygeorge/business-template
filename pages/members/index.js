import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import styles from "@/styles/Members.module.css";

export default function Members({ members }) {
  const [value, setValue] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members);

  const handleChange = (e) => {
    setValue(e.target.value);

    const filterMembers = members.filter((member) =>
      member.name.toLowerCase().includes(e.target.value)
    );

    setFilteredMembers(filterMembers);
  };

  return (
    <main className="main">
      <div className="container mb-4">
        <h5>Members</h5>
        <input
          className={styles.search}
          type="text"
          value={value}
          placeholder="Search...."
          onChange={handleChange}
        />
        <p>Members Quantity - {filteredMembers.length}</p>
        <ul className={styles.list}>
          {filteredMembers &&
            filteredMembers.map((member) => {
              return (
                <li key={member.card}>
                  <Link href={`/members/${member.personal}`}>
                    <a>
                      <div className={styles.image}>
                        <Image
                          src={member.avatar}
                          layout="fill"
                          objectFit="cover"
                          alt="Profile Picture"
                        />
                      </div>
                      <span>{member.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const connectMongo = require("@/lib/connectMongo").default;
  const Member = require("@/models/memberModel").default;

  let members = [];

  try {
    await connectMongo();

    const data = await Member.find({}, "name personal card avatar");
    members = JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }

  return {
    props: { members },
  };
}
