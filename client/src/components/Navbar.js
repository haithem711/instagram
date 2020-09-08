import React,{useContext} from 'react'
import {Link,useHistory}from 'react-router-dom'
import {Usercontext}from '../App'
const Navbar = () => {
  const history=useHistory()
  const {state,dispatch}=useContext(Usercontext)
  const renderlist=()=>{
    if (state) {
      return [
        <li><Link to="/Profile">Profile</Link></li>,
        <li><Link to="/Createpost">Createpost</Link></li>,
        <li><Link to="/My following">My Following</Link></li>,
        
       <li> <button className="btn  #f44336 red"
          onClick={() => {
            localStorage.clear()
            dispatch({ type: 'CLEAR' })
            history.push("/Login")
    } }
    > Disconnect </button ></li>
    ]
    }
    else {
      return[ 
      <li><Link to="/Login">SignIn</Link></li>,

      <li><Link to="/Signup">SignUp</Link></li>
    ]
    }
  }
    return (
        <div>
            <nav>
    <div className="nav-wrapper white">
      <Link to={state?'/':'/Login'}  className="brand-logo">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {renderlist()} 
      </ul>
    </div>
  </nav>
        </div>
    )
}

export default Navbar
