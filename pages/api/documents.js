import fs from 'fs'
import path from 'path'
import createDocuments from '@/utils/createDocument'

export default async function handler(req, res) {

    const documentsPath = path.resolve(process.cwd(), "public/generation/documents");

    if(req.method === 'POST'){
        await createDocuments()
        const data = fs.readdirSync(documentsPath);
        res.status(200).json(data)
    } else {
        res.status(405).json({response: "Only POST method is allowed in this request"})
    }
}