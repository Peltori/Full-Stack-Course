const http = require("http");
const fs = require("fs")
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    fs.readFile('../Data/requestCount.txt', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            let counter = parseInt(data);
            counter++;

            // Save the updated number to the txt file using "fs.writeFile"
            fs.writeFile('../Data/requestCount.txt', counter.toString(), (writeError) => {
                if (writeError) {
                    console.log(writeError);
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    //res.writable(`<h1>Request counter value is ${counter}</h1>`);
                    res.end(`<h1>Request counter value is ${counter}</h1>`);
                }
            });
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});