import nodeHtmlToImage from "node-html-to-image";
import * as fs from "fs";

import { frontTemplate, backTemplate } from './Templates'
import BarcodeGenerator from './BarcodeGenerator';

export default async function CreateCard (data){

  console.log('creating stage')

  const barcode = await BarcodeGenerator(`https://yourcompany.com/members/${data.personal}`);
  const avatar = imageEncoder('./public' + data.avatar)
  const badgeImage = imageEncoder('./public/images/badges/' + data.badge + '.png')

  await nodeHtmlToImage({
    output: `./public/generation/images/${data.card}-front.jpg`,
    html: frontTemplate(),
    content: {
      name: data.name,
      badge: data.badge,
      badgeImage, 
      avatar,
    },
  }).catch((err) => console.log(err));

  await nodeHtmlToImage({
    output: `./public/generation/images/${data.card}-back.jpg`,
    html: backTemplate(),
    content: {
      card: data.card,
      personal: data.personal,
      birth: new Date(data.birth).toLocaleDateString('en-GB'),
      register: new Date(data.register).toLocaleDateString('en-GB'),

      name: data.name,
      badge: data.badge,
      barcode,
    },
  }).catch((err) => console.log(err));

  console.log(`Member ${data.card} Card Created...`); 
  
}

const GenerateCards = async () => {
  console.log('happening')
  const members = fs.readdirSync("./pages/api/database")
    .map(member => JSON.parse(fs.readFileSync(`./pages/api/database/${member}`, 'utf8')))
    .sort((a, b) => a.card - b.card)

  for(let member of members){
    const frontPath = `./generate/card-imgs/${member.card}-front.jpg`;
    const backPath = `./generate/card-imgs/${member.card}-back.jpg`;

    if (!fs.existsSync(frontPath) || !fs.existsSync(backPath)) {
      console.log(`Started Creating Card ${member.card}`)
      await CreateCard(member)
    }
  }
}

function imageEncoder(path) {
  let image = fs.readFileSync(path);
  const base64Image = new Buffer.from(image).toString('base64');
  const dataURI = 'data:image/jpeg;base64,' + base64Image
  return dataURI
}

// GenerateCards()