import { PDFDocument, degrees } from "pdf-lib";

import * as fs from "fs";
import path from "path";
const publicPath = path.resolve(process.cwd(), "public");

import { v2 as cloudinary } from "cloudinary";
import Documents from "@/models/documentsModel";
import Member from "@/models/memberModel";

// Declare reusable parameters
const params = {
  sizes: {
    bgWidth: 595.44,
    bgHeight: 841.92,
    cardWidth: 163.6,
    cardHeight: 257.76,
  },
  positions: {
    offsetY: 177.5,
    frontPosX: 286.5,
    backPosX: 309,
    decValueY: 162.5,
    offsetYBack: 163,
  },
  orientations: {
    frontDegree: 90,
    backDegree: -90,
  },
};

/***Generate Documents***/
export default async function createDocument() {
  const data = await Member.find({}, "card cardFront cardBack");
  const members = JSON.parse(JSON.stringify(data));
  const totalDocsShouldCreate = Math.ceil(members.length / 5);

  // Clear documents from database
  const deleteDocuments = await Documents.deleteMany();
  let documents = [];

  /* For loop - level 1 (while members.length / 5) */
  for (let docNum = 0; docNum < totalDocsShouldCreate; docNum++) {
    // Initialize clean document
    const document = await PDFDocument.create();
    const page = document.addPage();

    // Set background image into document
    const templateBuffer = fs.readFileSync(`${publicPath}/images/template.jpg`);
    const templateEmbed = await document.embedJpg(templateBuffer);
    page.drawImage(templateEmbed, {
      x: 0,
      y: page.getHeight() - params.sizes.bgHeight,
      width: params.sizes.bgWidth,
      height: params.sizes.bgHeight,
    });

    let docName = "";
    let cardPosY = page.getHeight() - params.positions.offsetY;

    const cardStartPoint = docNum * 5;
    const cardEndPoint = docNum * 5 + 5;

    /* For loop - level 2 (i < 5) */
    for (
      let cardNum = cardStartPoint;
      cardNum < cardEndPoint && cardNum < members.length;
      cardNum++
    ) {
      // Insert members card images
      const cardFrontBuffer = Buffer.from(members[cardNum].cardFront.data);
      const cardBackBuffer = Buffer.from(members[cardNum].cardBack.data);
      const cardFrontEmbed = await document.embedJpg(cardFrontBuffer);
      const cardBackEmbed = await document.embedJpg(cardBackBuffer);

      page.drawImage(cardFrontEmbed, {
        x: params.positions.frontPosX,
        y: cardPosY,
        width: params.sizes.cardWidth,
        height: params.sizes.cardHeight + 1.5,
        rotate: degrees(params.orientations.frontDegree),
      });

      page.drawImage(cardBackEmbed, {
        x: params.positions.backPosX,
        y: cardPosY + params.positions.offsetYBack,
        width: params.sizes.cardWidth,
        height: params.sizes.cardHeight,
        rotate: degrees(params.orientations.backDegree),
      });

      // Y position of cards changes for every member
      cardPosY -= params.positions.decValueY;
      // Filling document name with card numbers
      docName = docName + "-" + members[cardNum].card;
    }

    const cleanDocName = docName.replace("-", "");

    // Save document as base64
    const base64Document = await document.saveAsBase64({ dataUri: true });
    console.log(`Document ${cleanDocName} Created`);

    // Upload document at cloudinary storage
    const uploadDocument = await cloudinary.uploader.upload(base64Document);
    console.log(`Document ${cleanDocName} Uploaded to cloudinary`);

    // Push in documents array to use it on frontend
    documents.push({
      name: cleanDocName,
      url: uploadDocument.secure_url,
    });
  }

  // Save document at database
  const createDocument = await Documents.create({
    data: documents,
  });
  console.log(`Documents Uploaded to database`);

  return documents;
}
