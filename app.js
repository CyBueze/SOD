import "dotenv/config";
import express from "express";
import expressLayout from "express-ejs-layouts";
import session from "express-session"
import morgan from "morgan"
import authRoutes from "./routes/authRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import {supabase} from "./config/supabase.js"


const app = express();

app.use(expressLayout);
// set default layout for app
app.set('layout', './layouts/main');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET, // use a strong secret in production
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan('dev'));

app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes)
app.get("/test", async(req, res)=>{
  try{
    const { data, error } = await supabase.from('sermons').select('*').limit(1)
    
    if (error) {
      console.log('Connection error:', error.message)
      res.json({ status: 'error', message: error.message })
    } else {
      console.log(data)
      res.json({ status: 'success', message: 'Connected to Supabase!' })
    }
  }catch(err){
    console.log(err)
  }
})

app.get("/debug", async(req, res)=>{
  try{
    // Remove the limit to see everything
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
    
    console.log('Error:', error)
    console.log('Data:', data)
    console.log('Data length:', data?.length)
    
    res.json({ 
      error: error,
      data: data,
      count: data?.length || 0
    })
  }catch(err){
    console.log('Catch error:', err)
    res.json({ status: 'error', message: err.message })
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
