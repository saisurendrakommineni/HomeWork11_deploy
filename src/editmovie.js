import { useState } from "react";

function Editmovies({movie,onupdate,oncancel})
{
      console.log("Movie received", movie);

    const[details,setdetails]=useState({...movie})
    
//     console.log("Movie received", details);

    function handleUpdates() {
        onupdate(details);
      }

    return(
      <div className='forms'>
        <h1>Edit Movie Details</h1>
          <div className="formgroup">
                <label>Movie name</label>
                <input type='text' className="inptypes" value={details.name} onChange={(e)=>setdetails({...details, name:e.target.value})}></input>
          </div>
          <div className="formgroup">
                <label>Actor name</label>
                <input type='text' className="inptypes" value= {details.actor} onChange={(e)=>setdetails({...details,actor:e.target.value})}></input>
          </div>
          <div className="formgroup">
                <label>Director name</label>
                <input className="inptypes" type='text' value= {details.director} onChange={(e)=>setdetails({...details,director:e.target.value})}></input>
          </div>
          <div className="formgroup">
                <label>Gross</label>
                <input className="inptypes" type='text' value= {details.gross} onChange={(e)=>setdetails({...details,gross:e.target.value})}></input>
          </div>
          <div className="formgroup">
                <label>Year Released</label>
                <input className="inptypes" type='number' value= {details.yearreleased} onChange={(e)=>setdetails({...details,yearreleased:e.target.value})}></input>
          </div>
          <div>
                <button onClick={handleUpdates}>update Movie</button>
                <button onClick={oncancel}>Cancel</button>
          </div>
        </div>
        
    )
}

export default Editmovies;