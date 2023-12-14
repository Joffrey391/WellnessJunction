import { NextApiHandler } from "next";
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ChildProcess } from "child_process";


const handler: NextApiHandler = (req, res) => {

    const {method} = req
    switch(method){
        case "GET": {
            const data = readPostInfo();
            return res.json({ postInfo: data });
        }
        default: return res.status(404).send("NotFounf");
    }
    
};

const readPostInfo = () => {
    const dirPathToRead = path.join(process.cwd(), 'posts');
    const dirs = fs.readdirSync(dirPathToRead);
    const data = dirs.map((filename) => {
        const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
        const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});
        return matter(fileContent).data;
    });
    return data;
}

export default handler;