import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import { getSession } from "next-auth/react";
import createCard from "@/lib/createCard";

import { v2 as cloudinary } from "cloudinary";
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
    const currentMember = await Member.findOne(
      { userId: session.userId },
      "card userId"
    );
    const personWithSameId = await Member.findOne(
      {
        personal: data.personal,
      },
      "userId"
    );

    if (personWithSameId && personWithSameId.userId !== session.userId) {
      return res.status(403).json({ error: "Personal number is in use!" });
    }

    const base64Avatar = getBase64Image(image.buffer);
    const uploadAvatar = await cloudinary.uploader.upload(base64Avatar);

    const card = currentMember ? currentMember.card : await getNextCard();

    const { cardFrontSide, cardBackSide } = await createCard(
      data,
      base64Avatar,
      card
    );

    const userBody = {
      ...data,
      userId: session.userId,
      avatar: uploadAvatar.secure_url,
      card: card,
      cardFront: cardFrontSide,
      cardBack: cardBackSide,
    };

    if (currentMember) {
      // Member data exists in db, let's update
      const updateMember = await Member.updateOne(
        { userId: session.userId },
        userBody
      );
      console.log("Member Updated!");
    } else {
      // Member data doesn't exist in db, let's create new one
      const createMember = await Member.create(userBody);
      console.log("Member Created!");
    }
    res.status(200).json({ success: "User proceed successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getNextCard() {
  let nextCard = "0001";

  const data = await Member.find({}, "card");
  const members = JSON.parse(JSON.stringify(data));

  if (members.length) {
    const lastCard = members[members.length - 1].card;
    nextCard = JSON.stringify(parseInt(lastCard) + 1).padStart(4, "0");
  }

  return nextCard;
}

function getBase64Image(buffer) {
  return "data:image/png;base64," + buffer.toString("base64");
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
