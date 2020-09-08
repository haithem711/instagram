import React ,{useState,useEffect}from 'react'
import {useHistory}from 'react-router-dom'
import M from 'materialize-css'

const Createpost = () => {
  const history=useHistory()
  const  [title, setTitle] = useState('')
  const  [body, setBody] = useState('')
  const  [image, setImage] = useState('')
  const  [url, setUrl] = useState('')
  useEffect(()=> {
    if(url) {
    fetch('/creatpost', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "authorization":localStorage.getItem("jwt")
      },
      
      body: JSON.stringify({

        title,
        body,
        pic: url
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) { M.toast({ html: data.error, classes: '#d32f2f red darken-2' }) }
        else {
          M.toast({ html: 'created post succesfully', classes: '#66bb6a green lighten-1' })
          history.push('/')
        }
      })
      .catch(err => { console.log(err) })
  
  }
},[url])
  const postdata=()=>{
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone')
    data.append('cloud_name', 'dw9j1appv')
    fetch('https://api.cloudinary.com/v1_1/dw9j1appv/image/upload', {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => { setUrl(data.url) })

      .catch(err => { console.log(err) })
    
     }
    return (
        <div className="card input-field" style={{maxWidth:'500px',padding:'20px',margin:'35px auto',textAlign:'center'}}>
            <input type='text' placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type='text' placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)} />
            <div className="file-field input-field">
      <div className="btn  #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input  type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
        
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postdata()} >Post </button> 
        </div>
    )
    }

export default Createpost
