import React,{useState,useEffect, useContext} from 'react'
import{Link}from 'react-router-dom'
import{Usercontext}from'../../App'

const Zome = () => {
    const[data,setData]=useState([])
    const{state,dispatch}=useContext(Usercontext)
    useEffect(()=>{
        fetch('/getsubpost',{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.post)
        })
     },[])
    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('jwt')   
             },
               body:JSON.stringify({
                   postId:id
               })
            })
            .then(res=>res.json())
            .then(result=>{
                const newData=data.map(item=>{
                    if (item._id===result._id){
                        return result
                
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{console.log(err)})
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('jwt')    },
               body:JSON.stringify({
                   postId:id
               })
            })
            .then(res=>res.json())
            .then(result=>{
                const newData=data.map(item=>{
                    if (item._id===result._id){
                        return result
                
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{console.log(err)})
    }
    const makecomment=(text,postId)=>{
        fetch("/comment",{
            method:'put',
            headers:{
'Content-Type':'application/json',
"Authorization":localStorage.getItem('jwt')
            },
           body: JSON.stringify({
postId,
text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData=data.map(item=>{
            if (item._id===result._id){
                return result
        
            }else{
                return item
            }
        })
        setData(newData)

        }).catch(err=>console.log(err))
    }
    const deletepost=(postid)=>{
        fetch(`/delepost/${postid}`,{
            method:"delete",
            headers:{
                'Authorization':localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
const newData=data.filter(item=>{
    return item._id!==result._id
})
setData(newData)
        })

    }
   
    return (
        <div className="home">
            {
                data.map(item=>{
                    return( <div className="card home-card" key={item._id}>
                    <h5><Link to= {item.postedby._id!==state._id ?'/profile/'+item.postedby._id:'/profile'}>{item.postedby.name}</Link>  {item.postedby._id===state._id
                    &&<i class="material-icons"style={{float:"right",cursor: 'pointer'}} onClick={()=>deletepost(item._id)}>delete_forever
                    </i>
                    }  
</h5>
                    <div className="card-image">
                        <img src ={item.picture}/>
                    </div>
                    <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    {item.likes.includes(state._id)?
                    <i className="material-icons"style={{cursor: 'pointer'}}onClick={()=> {unlikePost(item._id)}}>thumb_down</i>:
                    <i className="material-icons"style={{cursor: 'pointer'}} onClick={()=>{likePost(item._id)}}>thumb_up</i>
                    }
                    <h6> {item.title}</h6>
                        <h6> {item.likes.length}</h6>
                        <p>{item.body} </p>
                        {
                            item.comments.map(record=>{
                                return (<h6 key={record._id}> <span style={{fontWeight:'500'}}>{record.postedby.name} </span>: {record.text} </h6>)
                            })
                        }
                        <form onSubmit={(e)=>{e.preventDefault() 
                            makecomment(e.target[0].value,item._id)}}><input type="text" placeholder="post comment"/></form>
                        
                    </div>
                </div>
                )
                })
            }
           
        </div>
    )
}

export default Zome
