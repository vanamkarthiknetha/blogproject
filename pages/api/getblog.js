import fs from 'node:fs';
export default function handler(req, res) {
    const slug=req.query.slug
    fs.readFile(`./blogsdata/${slug}.json`,'utf-8',(err,data)=>{
        if(err) res.status(500).json({err:'No such blog found'});
        else res.status(200).json(JSON.parse(data));
    })
}
