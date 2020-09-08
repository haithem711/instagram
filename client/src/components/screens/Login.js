import React ,{useState,useContext,}from 'react'
import {Link,useHistory}from 'react-router-dom'
import {Usercontext} from '../../App'
import M from 'materialize-css'
const Login = () => {
    const {state,dispatch}=useContext(Usercontext)
        const history=useHistory()
        
        const [email,setEmail]=useState('')
        const[password,setPassword]=useState('')
       const Postdata=()=>{
    fetch('/signin',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            
            email,
            password,
        })
    })
    .then(res=>res.json())
    .then(data=>{ console.log(data)
        if (data.error){  M.toast({html: data.error,classes:'#d32f2f red darken-2'})}
    else  { localStorage.setItem('jwt',data.token)
    localStorage.setItem('user',JSON.stringify( data.user))
    dispatch({type:'USER',payload:data.user})
         M.toast({html:'signin succes' , classes:'#66bb6a green lighten-1'})
    history.push('/')}
    })
    .catch(err=>{console.log(err)})
       }
    return (
        <div className="mycard">
            <div className="card authcards input-field">
                <h2> Instagram </h2>
                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>Postdata()} >Login </button>
                <h5>
                    <Link to ='/Signup'> Dont have an account ? </Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
