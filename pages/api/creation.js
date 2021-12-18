import fs from 'fs'
import multer from 'multer'
import sharp from 'sharp'
const storage = multer.memoryStorage()
const upload = multer({ storage })
import CreateCard from '../../utils/CreateCard'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  await runMiddleware(req, res, upload.single('avatar'))
  
  const data = req.body;
  const image = req.file;

  const session = await getSession({ req })
  
  if(!session){
    res.status(401).json({ error: 'Unauthenticated user' })
  } else {
    data.userId = session.userId;
    data.card = getNewCard()

    const database = fs.readdirSync('./database');
    database.map((member) => { 
      member = JSON.parse(fs.readFileSync(`./database/${member}`, 'utf8'))
      if(member.userId === data.userId) {
        fs.unlink(`./database/${member.personal}.json`, (err) => console.log(err))
        data.card = member.card
      }
    })

    const personalUsed = fs.existsSync(`./database/${data.personal}.json`);
    if(personalUsed) {
      res.status(401).json({ error: 'Unauthenticated user' })
    } else {
      saveOnServer(data, image)
      res.status(200).json({ message: 'Success', session })
    }
  }
}

async function saveOnServer(data, image){
  // Optimize image before save
  await sharp(image.buffer).rotate()
  .resize({width: 1000})
  .toFile(`./public/images/members/${data.personal}.jpg`);

  data.avatar = `/images/members/${data.personal}.jpg`;

  fs.writeFileSync(`./database/${data.personal}.json`, JSON.stringify(data), err => { if(err) console.log(err) })

  // Create card image
  CreateCard(data)
}

function getNewCard() {
  const data = fs
  .readdirSync('./database')
  .map((member) => (member = JSON.parse(fs.readFileSync(`./database/${member}`, 'utf8')).card))
  .sort((a, b) => b - a);

  const newCard = parseInt(data[0]) + 1;

  if(!newCard) {
    return '0001';
  }

  return JSON.stringify(newCard).padStart(4, '0');
}

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}