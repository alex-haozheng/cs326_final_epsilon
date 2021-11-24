import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync, fstat} from 'fs';
import { MongoClient } from 'mongodb';

const url = "mongodb+srv://alex:2HKRCoy6TImzUamS@menu.yeoac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

createServer(async (req, res) => {
  const parsed = parse(req.url, true);
  await client.connect();

  const UDINE = await client.db('UDine'); // if this creates delete

  const foods = await gsdb.collection('food');
  const logins = await wsdb.collection('logins');

  if (parsed.pathname === '/search') {
    const str = document.getElementById('mySearch').value;
    const halal = document.getElementById('halal').checked;
    const veg = document.getElementById('vegetarian').checked; 
    const wGrain = document.getElementById('wholeGrain').checked;
     // dont set if not true thus comparing boolean during search
    if(halal) {
      halal = 'Yes';
    }
    if (veg) {
      veg = 'Yes';
    }
    if (wGrain) {
      wGrain = 'Yes';
    }
    res.end(JSON.stringify(await foods.find({
        $and: [
          {$contains: {'name': str}},
          {'halal': halal},
          {'vegetarian': veg},
          {'whole-grain': wGrain}
        ]    
      })
    ));
      // let body = '';
      // req.on('data', data => body += data);
      // req.on('end', async () => {
      //   let data = JSON.parse(body);
      //   await ws.insertOne(data);
      // }); res.end();
  } else if (parsed.pathname === '/gameScore') {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', async () => {
      let data = JSON.parse(body);
      await gs.insertOne(data);
    }); res.end();
  } else if (parsed.pathname === '/highestWordScores') {
      res.end(JSON.stringify(await ws.find().limit(10).sort({score: -1}).toArray()));
  } else if (parsed.pathname === '/highestGameScores') {
      res.end(JSON.stringify(await gs.find().limit(10).sort({score: -1}).toArray()));
  } else {
      // If the client did not request an API endpoint, we assume we need to fetch a file.
      // This is terrible security-wise, since we don't check the file requested is in the same directory.
      // This will do for our purposes.
      const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
      const path = join("client/", filename);
      console.log("trying to serve " + path + "...");
      if (existsSync(path)) {
          if (filename.endsWith("html")) {
              res.writeHead(200, {"Content-Type" : "text/html"});
          } else if (filename.endsWith("css")) {
              res.writeHead(200, {"Content-Type" : "text/css"});
          } else if (filename.endsWith("js")) {
              res.writeHead(200, {"Content-Type" : "text/javascript"});
          } else {
              res.writeHead(200);
          }

          res.write(readFileSync(path));
          res.end();
      } else {
          res.writeHead(404);
          res.end();
      }
  }
}).listen(process.env.PORT || 8080);