import conn from './mysql/conexao';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function agarra(req: NextApiRequest, res: NextApiResponse){
    
    const { method } = req;

    try{
        if (method === 'GET'){
            res.setHeader('Allow', ['GET']);
            //console.log("foi aq");
            
            /*const meusDocs = await conn.promise().query('SELECT * from `docs`');
            res.status(200).json(meusDocs);
            */
            const [rows] = await conn.promise().query('SELECT * from `docs`');
            res.status(200).json(rows);
            //console.log(meusDocs);
        }
       
    }catch{
        res.status(405).json("xiiiii  XD");
        console.log("ooops");
    }
};

//export const getdocs = conn.query('SELECT * from `docs`;', (_err, rows) => { return(rows); });