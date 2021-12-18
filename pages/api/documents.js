import fs from 'fs'
import CreateDocuments from '../../utils/CreateDocument'

export default async function handler(req, res) {
    if(req.method === 'POST'){
        await CreateDocuments()
        const data = fs.readdirSync('./public/generation/documents');
        res.status(200).json(data)
    } else {
        res.status(405).json({response: "Only POST method is allowed in this request"})
    }
}