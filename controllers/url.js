const shortid = require("shortid");
const URL = require("../models/url");
async function shortenedUrlController(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}
async function getUrlController(req, res) {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Failed to retrieve URL" });
  }
}

async function getAnalyticsController(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  shortenedUrlController,
  getAnalyticsController,
  getUrlController,
};
