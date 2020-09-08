import React,{useEffect,useState,useContext} from 'react'
import {Usercontext} from '../../App'
import M from 'materialize-css'
const Profile  = (props)=>{
    const [mypic,setPics] = useState([])
    
    const{state,dispatch}=useContext(Usercontext)
    const [image,setImage] = useState("")
    const [email,setEmail]=useState('')
  
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result.mypost)
           setPics(result.mypost)
       })
    },[])
    
    useEffect(()=>{
       if(image){
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
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    
    
        
    
    const editemail=()=>{
        fetch('/updatemail',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
            })
        }).then(res=>res.json())
        .then(result=>{if (result.error){  
            M.toast({html:result.error , classes:'#d32f2f red darken-2'})
    }
        else  {console.log(result)
            localStorage.setItem("user",JSON.stringify({...state,email:result.email}))
            dispatch({type:"UPDATEMAIL",payload:result.email})  }
           
       
            //window.location.reload()
            
        })
       
    }
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   
                   <button  onClick={()=>editemail()}>Update email</button>
                   
                   <input 
                            type="text" 
                            name="email" 
                            placeholder={state&&state.email}
                            onChange={(e)=>setEmail(e.target.value)} 
                            
                        />
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypic.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <button >Update pic</button>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypic.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.picture} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile