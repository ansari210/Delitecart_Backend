const express = require("express");
const {register_query,get_all_query,get_query_by_id}=require("../services/queryService");
const router = express.Router();
router.post("/",register_query);
router.get("/",get_all_query);
router.get("/:id",get_query_by_id);

module.exports = router;