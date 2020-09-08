import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar'
import './App.css';
import{BrowserRouter,Route, Switch,useHistory}from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import Createpost from './components/screens/Createpost'
import {reducer,initialState} from './reducers/userReducer'
import Userprofile from './components/screens/Userprofile'
import Subuserpost from './components/screens/Subuserpro'
export const Usercontext=createContext()
const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(Usercontext)
  useEffect(() => {
   const user=JSON.parse( localStorage.getItem('user'))
   if(user){
     dispatch({type:'USER',payload:user})
    }
     else{
       history.push('/login')
     }
   }
  , [])
  
  return(
  <Switch>
  <Route exact path='/'><Home/></Route>
      <Route path='/Login'><Login/></Route>
      <Route exact path='/Profile'><Profile/></Route>
      <Route path='/Signup'><Signup/></Route>
      <Route path='/Createpost'><Createpost/></Route>
      <Route  path='/My following'><Subuserpost/></Route>
   
      <Route path='/profile/:userid'><Userprofile/></Route>
      </Switch>
      )}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
 
  return (
    <Usercontext.Provider value={{state,dispatch}}>
    
      <BrowserRouter>
      <Navbar/>
      <Routing/>

      </BrowserRouter>
      </Usercontext.Provider>
    
  );
}

export default App;
