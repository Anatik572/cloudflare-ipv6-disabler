var phin = require('phin').unpromisified;
var args = process.argv.slice(2);
console.clear();
console.log(`

 /$$$$$$ /$$$$$$$  /$$    /$$ /$$$$$$$ 
|_  $$_/| $$__  $$| $$   | $$| $$__  $$
  | $$  | $$  \ $$| $$   | $$| $$  \ $$
  | $$  | $$$$$$$/|  $$ / $$/| $$  | $$
  | $$  | $$____/  \  $$ $$/ | $$  | $$
  | $$  | $$        \  $$$/  | $$  | $$
 /$$$$$$| $$         \  $/   | $$$$$$$/
|______/|__/          \_/    |_______/ 
`)

if (args.length != 3) {
    console.error(`Usage: node index.js '<api_account>' '<your_email>' '<zone_id>'`);
} else {
    phin({
        method: 'PATCH',
        url: `https://api.cloudflare.com/client/v4/zones/${args[2]}/settings/ipv6`,
        parse: 'json',
        headers: {
            "X-Auth-Email": args[1],
            "Content-Type": "application/json",
            "X-Auth-Key": args[1]
        },
        data: {
            value: "off"
        }
    }, (err, res) => {
        if(res.body.success) {
            console.log("IPv6 disabled on your domain");
        }
    });
}