var phin = require('phin').unpromisified;
var args = process.argv.slice(2);
console.clear();
console.log(`


  /$$$$$$  /$$                           /$$ /$$   /$$   /$$     /$$ /$$ /$$   /$$              
 /$$__  $$| $$                          | $$| $$  | $$  | $$    |__/| $$|__/  | $$              
| $$  \__/| $$  /$$$$$$  /$$   /$$  /$$$$$$$| $$  | $$ /$$$$$$   /$$| $$ /$$ /$$$$$$   /$$   /$$
| $$      | $$ /$$__  $$| $$  | $$ /$$__  $$| $$  | $$|_  $$_/  | $$| $$| $$|_  $$_/  | $$  | $$
| $$      | $$| $$  \ $$| $$  | $$| $$  | $$| $$  | $$  | $$    | $$| $$| $$  | $$    | $$  | $$
| $$    $$| $$| $$  | $$| $$  | $$| $$  | $$| $$  | $$  | $$ /$$| $$| $$| $$  | $$ /$$| $$  | $$
|  $$$$$$/| $$|  $$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$/  |  $$$$/| $$| $$| $$  |  $$$$/|  $$$$$$$
 \______/ |__/ \______/  \______/  \_______/ \______/    \___/  |__/|__/|__/   \___/   \____  $$
                                                                                       /$$  | $$
                                                                                      |  $$$$$$/
                                                                                       \______/ 

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
            "X-Auth-Key": args[0]
        },
        data: {
            value: "off"
        }
    }, (err, res) => {
        if(res.body.success) {
            console.log("IPv6 disabled on your domain");
        }else{
            console.log(res.body);
        }
    });
}
