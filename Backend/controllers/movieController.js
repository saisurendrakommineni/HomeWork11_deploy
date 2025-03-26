const mongoose = require('mongoose');

const Movie= require('../models/Movies')

exports.getMovies=async(req,res)=>{
    try{
        const movies= await Movie.find();
        res.status(200).json(movies)
    }
    catch(error)
    {
        console.error("Error fetching movies:", error);

    }
}

exports.addMovie = async(req,res)=>{
    console.log("received movie",req.body)
    try{
        const{name,actor,director,gross,yearreleased}=req.body;
        const existingMovie = await Movie.findOne({name,actor,director,gross,yearreleased})
            if(existingMovie)
            {
                return res.status(400).json({messgae:"Movie already exists"})
            }
        const newMovie = new Movie({name,actor,director,gross,yearreleased})
        await newMovie.save();
        return res.status(201).json({messgae:"Movie Added Successfully",movie:newMovie})
        
    }
    catch (error) {
        console.error("Error adding movie:", error);
    }
}

exports.deleteMovie=async(req,res)=>{
    try{
        const {id } = req.params;
        const movie = await Movie.findByIdAndDelete(id)
        if (!movie) 
        {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
        
        } 
        catch (error) 
        {
            console.error("Error deleting movie:", error);
        }
}

exports.updateMovie = async (req, res) => {
    console.log("received movie",req.body)

    try {
        
        const { id } = req.params;
        // console.log(req.params)
        if (!id || id.length !== 24) {
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        const { name, actor, director, gross, yearreleased } = req.body;

        const movie = await Movie.findByIdAndUpdate(
            id, 
            { name, actor, director, gross, yearreleased }, 
            { new: true } 
        );

        if (!movie) 
        {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie updated successfully", movie: movie });

        } 
        catch (error) 
        {
        console.error("Error updating movie:", error);
        }
};
