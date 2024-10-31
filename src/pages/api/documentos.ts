// pages/api/documentos.js
import fs from 'fs';
import path from 'path';

// import req and res from Next.js API
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'data', 'documentos.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.status(200).json(data);
      break;
    case 'POST':
      const newDocumento = req.body;
      const documentos = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      newDocumento.id = (documentos.length + 1).toString();
      documentos.push(newDocumento);
      fs.writeFileSync(filePath, JSON.stringify(documentos, null, 2));
      res.status(201).json(newDocumento);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} não permitido`);
  }
}