const { subscriptionWhere } = require("../queries/subscriptions");
const fetch = require("node-fetch-cache");
const { XMLParser } = require("fast-xml-parser");

module.exports = async ({ userId, guildId, client }) => {
  const variables = {
    where: {
      _and: [
        {
          guildId: {
            _eq: guildId,
          },
          userId: {
            _eq: userId,
          },
        },
      ],
    },
  };

  try {
    const res = await client.request({
      document: subscriptionWhere,
      variables,
    });

    const sources = await Promise.all(
      res.subscriptions_aggregate.nodes.map(
        async ({ feed }) =>
          await fetch(feed, {
            method: "GET",
            headers: {
              "Content-Type": "text/xml",
              "User-Agent": "*",
            },
          })
      )
    );

    const fetchedFeeds = [];

    for await (url of sources) {
      fetchedFeeds.push(parseXML(await url.text()));
    }

    console.log(returner);
  } catch (e) {
    // Send error message
    // TODO: Remove Error message
    return new Error(e.message);
  }
};

const parseXML = (xml) => {
  const parser = new XMLParser();
  return parser.parse(xml);
};
