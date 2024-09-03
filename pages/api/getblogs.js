const fs = require('node:fs');
export default async function handler(req, res) {
    let blogs=[]
    let blogdata=await fs.promises.readdir('./blogsdata')
    for (let index = 0; index < blogdata.length; index++) {
        const blogname = blogdata[index];
        let blog=await fs.promises.readFile('./blogsdata/'+blogname,'utf-8')
        blogs.push(JSON.parse(blog))
    }
    blogs=blogs.slice(0,req.query.count)
    res.status(200).send(blogs);
}
