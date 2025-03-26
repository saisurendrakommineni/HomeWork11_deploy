const express = require("express")
const{addMovie,getMovies,deleteMovie,updateMovie}=require("../controllers/movieController")
const router = express.Router();
router.post("/add",addMovie);
router.get("/all",getMovies);
router.delete("/delete/:id",deleteMovie);
router.put("/update/:id", updateMovie); 

module.exports = router;
