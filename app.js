import "dotenv/config";
import express from "express";
import expressLayout from "express-ejs-layouts";
import mongoose from "mongoose"
import session from "express-session"
import csrf from '@dr.pogodin/csurf';
import cookieParser from "cookie-parser"
import morgan from "morgan"
import indexRoutes from "./routes/index.routes.js"
import adminRoutes from "./routes/admin.routes.js"

// setup route middlewares
const csrfProtection = csrf({ cookie: true })


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

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())
app.use(csrfProtection);

// mske crsf globally accesible
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  res.locals.title = "School of Destiny International"; // default title
  next();
});



app.use(morgan('dev'));

app.use("/admin", adminRoutes)
app.use("/", indexRoutes);


const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log("Connected to database")
  app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
}).catch((err)=>{
  console.log("Error connecting to mongodb", err)
})