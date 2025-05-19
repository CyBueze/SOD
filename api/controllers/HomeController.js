module.exports = {
  
  // Render homepage
  homepage: async function (req, res){
    
    const locals = {
      title: "HOME | SOD"
    }
    return res.view("pages/homepage", locals)
  }
  
  
  
}