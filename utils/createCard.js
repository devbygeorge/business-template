import nodeHtmlToImage from "node-html-to-image";
import * as fs from "fs";
import path from "path";
const databasePath = path.resolve(process.cwd(), "database");
const publicPath = path.resolve(process.cwd(), "public");

import { getFrontTemplate, getBackTemplate } from "./getTemplates";
import generateQR from "./generateQR";

export default async function createCard(data) {
  console.log("creating stage");

  const barcode = await generateQR(
    `https://yourcompany.com/members/${data.personal}`
  );
  const avatar = imageEncoder(publicPath + data.avatar);
  const badgeImage = imageEncoder(
    `${publicPath}/images/badges/` + data.badge + ".png"
  );

  await nodeHtmlToImage({
    output: `${publicPath}/generation/images/${data.card}-front.jpg`,
    html: getFrontTemplate(),
    content: {
      name: data.name,
      badge: data.badge,
      badgeImage,
      avatar,
    },
  }).catch((err) => console.log(err));

  await nodeHtmlToImage({
    output: `${publicPath}/generation/images/${data.card}-back.jpg`,
    html: getBackTemplate(),
    content: {
      card: data.card,
      personal: data.personal,
      birth: new Date(data.birth).toLocaleDateString("en-GB"),
      register: new Date(data.register).toLocaleDateString("en-GB"),

      name: data.name,
      badge: data.badge,
      barcode,
    },
  }).catch((err) => console.log(err));

  console.log(`Member ${data.card} Card Created...`);
}

const GenerateCards = async () => {
  console.log("happening");
  const members = fs
    .readdirSync(databasePath)
    .map((member) =>
      JSON.parse(fs.readFileSync(`${databasePath}/${member}`, "utf8"))
    )
    .sort((a, b) => a.card - b.card);

  for (let member of members) {
    const frontPath = `${publicPath}/generation/images/${member.card}-front.jpg`;
    const backPath = `${publicPath}/generation/images/${member.card}-back.jpg`;

    if (!fs.existsSync(frontPath) || !fs.existsSync(backPath)) {
      console.log(`Started Creating Card ${member.card}`);
      await CreateCard(member);
    }
  }
};

function imageEncoder(imagePath) {
  let image = fs.readFileSync(imagePath);
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;
  return dataURI;
}

// GenerateCards()
