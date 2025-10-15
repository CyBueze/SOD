import Tag from '../models/tag.model.js'

export async function adminDashboard(req, res){
  const tags = await Tag.find()
  return res.render("admin/adminDashboard", 
  {
    title: "Admin Dashboard",
    layout: "layouts/adminLayout",
    tags
  })
}

export const addSermon = async (req,res) =>{
  return res.render("admin/addSermon", {
    layout: "layouts/adminLayout",
  })
}

export const addTagPage = async (req, res) =>{
  return res.render("admin/addTag", {
    layout: "layouts/adminLayout",
  })
}

export const addTag = async (req, res) =>{
  const {tagName} = req.body
  try{
    const tag = new Tag(
      {
        name: tagName
      })
    await tag.save()
    return res.redirect("/admin")
  }catch(err){
    console.log("Error creating tag", err)
    return res.status(500).send("Error creating tag")
  }
}