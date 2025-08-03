import pb from "../models/pocketbase.js"

const showLogin = async (req, res)=>{
  return res.render("login", {error: null})
}

const processLogin = async (req, res) =>{
  
  const {email, password} = req.body
  try{
    const user = await pb.collection("users").authWithPassword(email, password)
    
    const role = user.record.role
    
    //create session on login
    req.session.user = {
      id: user.record.id,
      email: user.record.email,
      role: user.record.role,
    }
    
    if(role=== "cashier"){
      return res.redirect("/dashboard/cashier")
    }else if (role === "md"){
      return res.redirect("/dashboard/md")
    }else{
      return res.status(403).send("Unauthorized role");
    }
  }catch(err){
    console.log("Login error", err)
    res.render("login", {error: "Invalid credentials"})
  }
}

export {showLogin, processLogin}