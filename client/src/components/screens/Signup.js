import React ,{useState,useEffect}from 'react'
import {Link,useHistory}from 'react-router-dom'

import M from 'materialize-css'

const Signup = () => {
    const history=useHistory()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append('file', image);
    data.append('upload_preset', 'insta-clone')
    data.append('cloud_name', 'dw9j1appv')
        fetch("https://api.cloudinary.com/v1_1/dw9j1appv/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
   const uploadFields=()=>{
fetch('/signup',{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name,
        email,
        password,
        pic:url
    })
})
.then(res=>res.json())
.then(data=>{if (data.error){  M.toast({html: data.error,classes:'#d32f2f red darken-2'})}
else  {  M.toast({html:data.message , classes:'#66bb6a green lighten-1'})
history.push('/Login')}
})
.catch(err=>{console.log(err)})
   }
   const Postdata = ()=>{
    if(image){
        uploadPic()
    }else{
        uploadFields()
    }
   
}
    return (
        
            <div className="mycard">
            <div className="card authcards input-field">
                <h2> Instagram </h2>
                <input type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} />
                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>Postdata()} >Signup </button>
                <h5>
                    <Link to ='/Login'> already have an account ? </Link>
                </h5>
            </div>
        </div>
       
    )
}

export default Signup
