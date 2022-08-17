import { useDispatch, useSelector } from "react-redux";
import{ setNewTask, setUpdatedTask,setDeleteId} from "./productSlice";
//import Quantity from "./Quantity";
import "./App.css"


const Product=()=>{
    const { tasks,errorMessage,newTask}=useSelector((store)=>store.product);
    const dispatch = useDispatch();
    
    return(
        <div className="app">
     
        <div className="product">
        <li className="qty"><input type="text" value={newTask} onChange={(e) => {dispatch(setNewTask(e.target.value));
        }} ></input>
        <button onClick={() =>{
            const newId = Math.max(...tasks.map((task) => task.id));
            dispatch(
                {type:"CREATE_PRODUCT_TASK_SAGA",
            postData:
        {
            id : Number(newId) + 1,
            task : newTask,
            
         }
        }  );
     }}>Create</button>
             </li>
             <button onClick={()=> dispatch({type:"READ_PRODUCT_TASK_SAGA"})}>Read</button>
             <h2>{errorMessage && errorMessage}</h2>
            <ul>
             {tasks.map((curTask)=>(
                <li key={curTask.id}><input type="text" value={curTask.task} onChange={(e)=>{dispatch(setUpdatedTask({id:curTask.id, task:e.target.value}));
                // <input type="text" value={curPrice.price} onChange={(e)=>{dispatch(setUpdatedTask({price:e.target.value}))}}></input>
                }}></input>
            <button onClick={()=>{ dispatch({type: "UPDATE_PRODUCT_TASK_SAGA",
        putData:{
            id:curTask.id,
            task:curTask.task,
            }
        });
    }}>Update</button>
    <button onClick={()=>{
        dispatch(setDeleteId({delId:curTask.id}));
        dispatch({ type:"DELETE_PRODUCT_TASK_SAGA",
    delData:{
        id:curTask.id
    }});
    }}>Delete</button>
   
        
            </li>
            ))}
            </ul>
            </div>
            </div>)
}
           


          
export default Product;