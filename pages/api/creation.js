import sharp from "sharp";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
// import createCard from "@/utils/createCard";
import { getSession } from "next-auth/react";

import connectMongo from "@/lib/connectMongo";
import Member from "@/models/memberModel";

export default async function handler(req, res) {
  await runMiddleware(req, res, upload.single("avatar"));

  const data = req.body;
  const image = req.file;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthenticated user" });
  }

  try {
    // Connect to db
    await connectMongo();

    // Validate that personal number entered by member is unique
    const currentMember = await Member.findOne({ userId: session.userId });
    const personWithSameId = await Member.findOne({
      personal: data.personal,
    });

    if (personWithSameId && personWithSameId.userId !== session.userId) {
      return res.status(403).json({ error: "Personal number is in use!" });
    }

    // Optimize and save avatar
    await sharp(image.buffer)
      .rotate()
      .resize({ width: 1000 })
      .toFile(`./public/images/members/${data.personal}.jpg`);

    const userBody = {
      ...data,
      userId: session.userId,
      avatar: `/images/members/${data.personal}.jpg`,
    };

    if (currentMember) {
      // Member data exists in db, let's update
      userBody.card = currentMember.card;
      const updateMember = await Member.updateOne(
        { userId: session.userId },
        userBody
      );
      console.log("Member Updated!", updateMember);
    } else {
      // Member data doesn't exist in db, let's create new one
      userBody.card = await getNextCard();
      const createMember = await Member.create(userBody);
      console.log("Member Created!", createMember);

      // createCard(data);
    }
    res.status(200).json({ success: "User proceed successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getNextCard() {
  let nextCard = "0001";

  const data = await Member.find();
  const members = JSON.parse(JSON.stringify(data));

  if (members) {
    const lastCard = members[members.length - 1].card;
    nextCard = JSON.stringify(parseInt(lastCard) + 1).padStart(4, "0");
  }

  return nextCard;
}

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
