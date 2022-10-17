import { PDFDocument, degrees } from "pdf-lib";
import fs from "fs";
import path from "path";
const publicPath = path.resolve(process.cwd(), "public");

// --Generate Documents--
export default async function createDocument() {
  try {
    // First empty documents folder
    fs.readdirSync(`${publicPath}/generation/documents`).forEach((document) => {
      fs.unlink(`${publicPath}/generation/documents/${document}`, (error) => {
        if (error) throw error;
      });
    });

    let leftCards = leftCardNums();

    while (leftCards.length / 5 > 0) {
      // Create document
      const document = await PDFDocument.create();
      const page = document.addPage();

      // Set parameters
      let parameters = {
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
        },
        jpgImageBytes,
        jpgImage;

      // // Set template into document
      jpgImageBytes = fs.readFileSync(`${publicPath}/generation/template.jpg`);
      jpgImage = await document.embedJpg(jpgImageBytes);
      page.drawImage(jpgImage, {
        x: 0,
        y: page.getHeight() - parameters.sizes.bgHeight,
        width: parameters.sizes.bgWidth,
        height: parameters.sizes.bgHeight,
      });

      // Fill with members card images
      let documentName = "";
      let positionY = page.getHeight() - parameters.positions.offsetY;

      for (let i = 0; i < 5; i++) {
        const frontPath = `${publicPath}/generation/images/${leftCards[i]}-front.jpg`;
        const backPath = `${publicPath}/generation/images/${leftCards[i]}-back.jpg`;
        const bothImageExists =
          fs.existsSync(frontPath) && fs.existsSync(backPath);

        if (bothImageExists) {
          // Set card front side into document
          jpgImageBytes = fs.readFileSync(frontPath);
          jpgImage = await document.embedJpg(jpgImageBytes);
          page.drawImage(jpgImage, {
            x: parameters.positions.frontPosX,
            y: positionY,
            width: parameters.sizes.cardWidth,
            height: parameters.sizes.cardHeight + 1.5,
            rotate: degrees(parameters.orientations.frontDegree),
          });

          // Set card back side into document
          jpgImageBytes = fs.readFileSync(backPath);
          jpgImage = await document.embedJpg(jpgImageBytes);
          page.drawImage(jpgImage, {
            x: parameters.positions.backPosX,
            y: positionY + parameters.positions.offsetYBack,
            width: parameters.sizes.cardWidth,
            height: parameters.sizes.cardHeight,
            rotate: degrees(parameters.orientations.backDegree),
          });

          // Y position changes per member images set
          positionY -= parameters.positions.decValueY;

          // Document name fills with card number
          documentName = documentName + "-" + leftCards[i];
        }
      }
      let correctDocumentName = documentName.replace("-", "");

      // Save document into directory
      const documentBytes = await document.save();
      fs.writeFileSync(
        `${publicPath}/generation/documents/${correctDocumentName}.pdf`,
        documentBytes,
        (err) => console.log(err)
      );
      console.log(`Document ${correctDocumentName} Created`);
      leftCards = leftCardNums();
    }
  } catch (error) {
    console.log(error);
  }
}

function leftCardNums() {
  const cardNames = fs
    .readdirSync(`${publicPath}/generation/images`)
    .map((card) => card.replace("-front.jpg", "").replace("-back.jpg", ""));

  let mergedCardNames = [];
  for (let cardName of cardNames) {
    const frontPath = `${publicPath}/generation/images/${cardName}-front.jpg`;
    const backPath = `${publicPath}/generation/images/${cardName}-back.jpg`;
    const existImages = fs.existsSync(frontPath) && fs.existsSync(backPath);

    if (existImages && !mergedCardNames.includes(cardName)) {
      mergedCardNames.push(cardName);
    }
  }

  const documents = fs.readdirSync(`${publicPath}/generation/documents`);
  let usedCards = [];

  for (let document of documents) {
    document = document.replace(".pdf", "").split("-");
    for (let cardName of document) {
      usedCards.push(cardName);
    }
  }

  return mergedCardNames.filter(
    (cardName) => !usedCards.find((usedCardName) => usedCardName == cardName)
  );
}
