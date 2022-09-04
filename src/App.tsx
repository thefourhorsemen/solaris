import React, {ChangeEvent} from 'react';
import './App.css';
import {IoFolderOpenOutline} from "react-icons/all";

function changeHandler(event: ChangeEvent<HTMLInputElement>) {
  console.log("changehandler: " + event.target.value)
}

// }
function App() {
  return (
      <div className="App">
        <div className="file-input">
          <label htmlFor="file-input"><IoFolderOpenOutline/> Select the csv file ...
          </label>
          <input id="file-input" type="file" onChange={changeHandler}/>
        </div>
      </div>
  );
}

export default App;
