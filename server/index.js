const http = require("http")

const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === "GET") {
        res.end("Home")
    }else if (req.url === "/media" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(([{"id":1,"title":"Inception"}])))
    }else {
        res.statusCode = 404
        res.end("Not found")
        
    }
})

server.listen(3000)
