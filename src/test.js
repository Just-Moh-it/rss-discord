const fetch = require("node-fetch");

const main = async () => {
  for (let idx = 0; idx <= 10000; idx++) {
    await fetch("http://20.62.221.90/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "upgrade-insecure-requests": "1",
      },
      referrer: "http://20.62.221.90/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: "vote=Azure",
      method: "POST",
      mode: "cors",
      credentials: "omit",
    });
  }
  console.log(idx, "Done!");
};
main();
