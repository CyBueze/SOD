import express from "express";
import Tag from "../models/tag.model.js"


const router = express.Router();

router.get("", async (req, res)=>{
  try{
    const tags = await Tag.find().limit(5)
    
    res.render("index", {
      title: "School of Destiny International",
      tags
      
    })
  }catch(err){
    console.log(err)
  }
})

export default router;
