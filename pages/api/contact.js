import fs from 'node:fs';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req)
        const data=await fs.promises.readdir('./contactdata')
        fs.promises.writeFile(`./contactdata/${data.length+1}.json`,JSON.stringify(req.body))
        res.status(200).send({success:true})
    } 
    else {
        res.status(404).send({error:"Not a valid HTTP request"})
    }
  }