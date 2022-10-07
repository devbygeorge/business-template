import fs from 'fs'
import path from 'path'
import CreateDocuments from '@/utils/CreateDocument'

export default async function handler(req, res) {

    const documentsPath = path.resolve(process.cwd(), "public/generation/documents");

    if(req.method === 'POST'){
        await CreateDocuments()
        const data = fs.readdirSync(documentsPath);
        res.status(200).json(data)
    } else {
        res.status(405).json({response: "Only POST method is allowed in this request"})
    }
}