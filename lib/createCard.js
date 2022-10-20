import nodeHtmlToImage from "node-html-to-image";
import * as fs from "fs";
import path from "path";
const publicPath = path.resolve(process.cwd(), "public");

import { getFrontTemplate, getBackTemplate } from "./getTemplates";
import generateQR from "./generateQR";

export default async function createCard(data, avatar) {
  console.log("Cards creation started!");

  const barcode = await generateQR(
    `https://yourcompany.com/members/${data.personal}`
  );

  const badgeImage = imageEncoder(
    `${publicPath}/images/badges/` + data.badge + ".png"
  );

  const cardFrontSide = await nodeHtmlToImage({
    html: getFrontTemplate(),
    content: {
      name: data.name,
      badge: data.badge,
      badgeImage,
      avatar,
    },
    puppeteerArgs: { args: ["--no-sandbox"] },
  }).catch((err) => console.log(err));

  const cardBackSide = await nodeHtmlToImage({
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
    puppeteerArgs: { args: ["--no-sandbox"] },
  }).catch((err) => console.log(err));

  console.log(`Member ${data.card} Card Created...`);

  return { cardFrontSide, cardBackSide };
}

function imageEncoder(imagePath) {
  let image = fs.readFileSync(imagePath);
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;
  return dataURI;
}
