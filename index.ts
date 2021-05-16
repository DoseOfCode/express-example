import { Request, Response } from "express";
import * as express from "express";

const PORT = 3038;

const app = express();
const server = require("http").Server(app);

// Every request Express handles, we will change the response header 'X-Powered-By's value to 'MAGIC!!'

app.use((_req: Request, res: Response, next: Function) =>
{
    res.header("X-Powered-By", "MAGIC!!");

    next();
});

// When we recieve a GET Request, respond witth 'Hello World!'

app.get("/", (_req: Request, res: Response) =>
{
    res.send("Hello World!");
});

// Create a route that throws an error, so we can catch it later down the line!

app.get('/error', (_req, _res) =>
{
    throw new Error("ugh oh.");   
});

// Make everything in the 'Public' folder accessable via Express, 
// so we can now go to /cat.jpg to see a cute cat.

app.use(express.static("./public"));

// Middleware to catch any failed requests / errors that are thrown in Express, so we can provide a cleaner
// reason to the user other than the stack of the error.

app.use((error: Error, _req: Request, res: Response, _next: Function) =>
{
    if (error)
    {
        console.error(error.message);
    }

    res.send("The page does not exist or a internal server error occured.");
})

// Make the server listen to the port defined in PORT.

server.listen(PORT, () => console.log(`[Express] Listening on port 3038.`));