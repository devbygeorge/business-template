import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import { getSession } from "next-auth/react";
import createCard from "@/lib/createCard";

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
    // await connectMongo();

    // Validate that personal number entered by member is unique
    // const currentMember = await Member.findOne({ userId: session.userId });
    // const personWithSameId = await Member.findOne({
    //   personal: data.personal,
    // });

    // if (personWithSameId && personWithSameId.userId !== session.userId) {
    //   return res.status(403).json({ error: "Personal number is in use!" });
    // }

    const base64Avatar = getBase64Image(image.buffer);
    const { cardFrontSide, cardBackSide } = await createCard(
      data,
      base64Avatar
    );
    console.log("Testing cards...", cardFrontSide);
    // const base64CardFrontSide = getBase64Image(cardFrontSide);
    // const base64CardBackSide = getBase64Image(cardBackSide);

    // const uploadAvatar = await cloudinary.uploader.upload(base64Avatar);
    // const uploadCardFrontSide = await cloudinary.uploader.upload(
    //   base64CardFrontSide
    // );
    // const uploadCardBackSide = await cloudinary.uploader.upload(
    //   base64CardBackSide
    // );

    const userBody = {
      ...data,
      userId: session.userId,
      // avatar: uploadAvatar.secure_url,
      // cardFrontSide: uploadCardFrontSide.secure_url,
      // cardBackSide: uploadCardBackSide.secure_url,
    };

    // if (currentMember) {
    //   // Member data exists in db, let's update
    //   userBody.card = currentMember.card;
    //   const updateMember = await Member.updateOne(
    //     { userId: session.userId },
    //     userBody
    //   );
    //   console.log("Member Updated!", updateMember);
    // } else {
    //   // Member data doesn't exist in db, let's create new one
    //   userBody.card = await getNextCard();
    //   const createMember = await Member.create(userBody);
    //   console.log("Member Created!", createMember);
    // }
    res.status(200).json({ success: "User proceed successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getNextCard() {
  let nextCard = "0001";

  // const data = await Member.find();
  // const members = JSON.parse(JSON.stringify(data));

  // if (members) {
  //   const lastCard = members[members.length - 1].card;
  //   nextCard = JSON.stringify(parseInt(lastCard) + 1).padStart(4, "0");
  // }

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
