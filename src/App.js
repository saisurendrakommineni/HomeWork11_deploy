import './App.css';
import { useState,useEffect } from 'react';
import Editmovies from './editmovie';
function App() {
  const[movies,setmovies]=useState([])
  const[newmovie,setnewmovie]=useState({name:"",actor:"",director:"",gross:"",yearreleased:""})
  const[updatemovie,setupdatemovie]=useState(null)

  useEffect(()=>{
    fetch("https://homework11-yx5r.onrender.com/api/movies/all").then((res)=>res.json())
    .then((data)=>setmovies(data))
    .catch((error)=>console.error("Error fetching movies:", error))
  },[])

  async function handleadd(){
    console.log("Add movie");

    try{
      const response =await fetch("https://homework11-yx5r.onrender.com/api/movies/add",{
        method:"POST",headers: { "Content-Type": "application/json" },body: JSON.stringify(newmovie),
      })
      const data = await response.json();
      console.log("Getting data",data)
      if (response.ok) 
      {
      setmovies([...movies, data.movie])
      setnewmovie({name:"",actor:"",director:"",gross:"",yearreleased:""})
      }
      else
      {
        alert( "Failed to add movie",data);
      }
  }
  catch (error) 
  {
    console.error("Error adding movie:", error);
  }
  }

  async function handleupdate(updatedmovie) {
    console.log("Updating movie:", updatedmovie);
    try {
      const response = await fetch(`https://homework11-yx5r.onrender.com/api/movies/update/${updatedmovie._id}`, {
          method: "PUT",headers: { "Content-Type": "application/json" },body: JSON.stringify(updatedmovie),
      });

      const data = await response.json();
      console.log("Getting data",data)

      if (response.ok) 
      {
      setmovies(movies.map(movie => 
      movie._id === updatedmovie._id ? data.movie : movie
    ));
    setupdatemovie(null);
    }
    else 
    {
      alert("Failed to update movie");
    }
}
  catch (error) 
  {
  console.error("Error updating movie:", error);
  }
  }

async function handledelete(id)
  {
    const confirmdelete = window.confirm("Are you sure you want to delete this movie?");
    if (confirmdelete) {
      try{
        const response = await fetch(`https://homework11-yx5r.onrender.com/api/movies/delete/${id}`,{ method: "DELETE" })
      if(response.ok)
      {
        setmovies(movies.filter(movie => movie._id !== id));
      }
      else 
      {
        alert("Failed to delete movie");
      }
    }
    catch (error) 
    {
      console.error("Error deleting movie:", error);
    }
  }
}

  return (
    <div className="App">
      
      <h1>Add New Movie</h1>
      <div className='forms'>
        <div className="formgroup">
            <label>Movie name</label>
            <input className="inptypes" type='text' value={newmovie.name} onChange={(e)=>setnewmovie({...newmovie, name:e.target.value})}></input>
          </div>
        <div className="formgroup">
            <label>Actor name</label>
            <input type='text' className="inptypes" value= {newmovie.actor} onChange={(e)=>setnewmovie({...newmovie,actor:e.target.value})}></input>
          </div>
          <div className="formgroup">
 
            <label>Director name</label>
            <input type='text' className="inptypes" value= {newmovie.director} onChange={(e)=>setnewmovie({...newmovie,director:e.target.value})}></input>
          </div>
          <div className="formgroup">
            <label>Gross</label>
            <input type='text' className="inptypes" value= {newmovie.gross} onChange={(e)=>setnewmovie({...newmovie,gross:e.target.value})}></input>
          </div>
          <div className="formgroup">
            <label>Year Released</label>
            <input type='number' className="inptypes" value= {newmovie.yearreleased} onChange={(e)=>setnewmovie({...newmovie,yearreleased:e.target.value})}></input>
          </div>
          <div>   
            <button onClick={handleadd}>Add Movie</button>
          </div>
          </div>
          <div>
          <table className="movietable">
              <tr>
                <th>Movie Name</th>
                <th>Actor</th>
                <th>Director</th>
                <th>Gross</th>
                <th>Year Released</th>
                <th>Action1</th>
                <th>Action2</th>

              </tr>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.name}</td>
                  <td>{movie.actor}</td>
                  <td>{movie.director}</td>
                  <td>{movie.gross}</td>
                  <td>{movie.yearreleased}</td>
                  <td>
                    <button onClick={() => setupdatemovie(movie)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() =>  handledelete(movie._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </table>
          {updatemovie && <Editmovies movie={updatemovie} onupdate={handleupdate} oncancel={() => setupdatemovie(null)}></Editmovies>}
          </div>
      </div>

  );
}

export default App;
