import { PDFDocument, degrees } from "pdf-lib";

import * as fs from "fs";
import path from "path";
const publicPath = path.resolve(process.cwd(), "public");

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
  const members = []
  const totalDocsShouldCreate = Math.ceil(members.length / 5);

  // Clear documents from database
  // const deleteDocuments = await Document.deleteMany();
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
      const memberCardFrontFetch = await fetch(
        members[cardNum].cardFrontSide
      ).then((res) => res.arrayBuffer());
      const memberCardBackFetch = await fetch(
        members[cardNum].cardBackSide
      ).then((res) => res.arrayBuffer());
      const memberCardFrontEmbed = await document.embedPng(
        memberCardFrontFetch
      );
      const memberCardBackEmbed = await document.embedPng(memberCardBackFetch);

      page.drawImage(memberCardFrontEmbed, {
        x: params.positions.frontPosX,
        y: cardPosY,
        width: params.sizes.cardWidth,
        height: params.sizes.cardHeight + 1.5,
        rotate: degrees(params.orientations.frontDegree),
      });

      page.drawImage(memberCardBackEmbed, {
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
    // const uploadDocument = await cloudinary.uploader.upload(base64Document);

    // Save document at database
    // const createDocument = await Document.create({
    //   name: cleanDocName,
    //   url: uploadDocument.secure_url,
    // });

    // Push in documents array to use it on frontend
    // documents.push({
    //   name: cleanDocName,
    //   url: uploadDocument.secure_url,
    // });
  }

  return documents;
}
