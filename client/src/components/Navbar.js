import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {Usercontext} from '../App'
import M from 'materialize-css'
const Navbar = () => {
  const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
  
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])

  const {state,dispatch}=useContext(Usercontext)
  const renderlist=()=>{
    if (state) {
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key="2"><Link to="/Profile">Profile</Link></li>,
        <li key="3"><Link to="/Createpost">Createpost</Link></li>,
        <li key="4"><Link to="/My following">My Following</Link></li>,
        
       <li key="5"> <button className="btn  #f44336 red"
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
      <li key="6"><Link to="/Login">SignIn</Link></li>,

      <li key="7"><Link to="/Signup">SignUp</Link></li>
    ]
    }
  }
  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
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
    <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Navbar
