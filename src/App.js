
import './App.css';
import app from './firebase.init';
import { getAuth } from "firebase/auth";


const auth = getAuth (app)
function App() {

  const handleEmailBlur=(event)=>{
  console.log(event.target.value);
  }

  return (
    <div className="App">
      <form action="">
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br></br>
        <input type="password" name="" id="" />
      </form>
      
    </div>
  );
}

export default App;
