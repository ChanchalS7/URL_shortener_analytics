const express = require("express")
const {
    shortenedUrlController,getUrlController,
    getAnalyticsController
}=require("../controllers/url")
const router=express.Router();
router.post("/url",shortenedUrlController)
router.get("/:shortId",getUrlController)
router.get("/analytics/:shortId",getAnalyticsController);
module.exports=router;