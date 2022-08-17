import {useEffect, useState,useContext} from "react";
import { appContext } from "./App";
import Cart from "./Cart"

const Order=()=>{
    const [name, setName] = useState();
    const [tasks, setTasks] = useState([]);
    const appCtx=useContext(appContext);
    
    
 function readTask(){
    fetch("http://localhost:4000/todotask")
    .then((response)=>response.json())
    .then((data)=> setTasks(data.filter((tasks)=>tasks.task.includes(name))));
 }
    useEffect(()=>{readTask(tasks)},[name]);

    const addQuantity=(id,qty)=>{
        const newTask=[...tasks];
        newTask.map((newTask)=>{
            if(newTask.id === id){
                newTask.quantity=qty+1;
                newTask.amount =newTask.price * newTask.quantity;
            }
            return newTask;
        });
        setTasks(newTask);
    };

    const lessQuantity=(id,qty)=>{
        const newTask=[...tasks];
        newTask.map((newTask)=>{
            if(newTask.id===id){
                newTask.quantity=qty-1;
                newTask.amount=newTask.price * newTask.Quantity;
            }
            return newTask
        });
        setTasks(newTask);
    };
    const cartAdd=(tasks)=>{
        let newCart=[];
        if(appCtx.addToCart.length===0){
            appCtx.setAddToCart([
                {
                    id:tasks.id,
                    task:tasks.task,
                    price:tasks.price,
                    quantity:tasks.quantity,
                    amount:tasks.amount,
                },
            ]);
        }else{
            if(
                appCtx.addToCart.some((cartTasks)=>cartTasks.id===tasks.id)
                ) {
                    newCart=appCtx.Cart.map((cart)=>{
                        if(cart.id===tasks.id){
                            return{
                                ...cart,
                                quantity:tasks.quantity,
                                amount:tasks.amount,
                            };
                        }
                        return cart;
                    });
                } else{
                    newCart=[
                        ...appCtx.addToCart,
                        {
                            id:tasks.id,
                            task:tasks.task,
                            price:tasks.price,
                            amount:tasks.amount,
                        },
                    ];
                }
                appCtx.setAddToCart(newCart);
            }
        };
    return(
        <div className="app">
            <h2 className="sty2">Order Page</h2>
            
            <h3 className="three"><label>Search:</label></h3><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <h3>{name}</h3>
            <ul className="app">{tasks.map(
                (tasks)=>(<li key={tasks.id}><input type="text" value={tasks.task} onClick={(e)=>setName(tasks.task)}></input><br></br><br></br></li>))}
                 <ul>
                    {tasks.map((tasks)=>(
                    <li key={tasks.id}>
                    <br></br>
                   <h4> <label>price:</label></h4>
              
                    <label>{tasks.price.toLocaleString("en-In",{
                    style: "currency",
                    currency: "INR"})}</label><br></br>
                <h2>Product List</h2>
                <div className="one">
                    <label>Quantity:</label>
                    <button className="addQty" onClick={()=>addQuantity(tasks.id,tasks.quantity)}>+</button>
                    <label>{tasks.quantity}</label>
                    <button className="lessQty" onClick={()=>lessQuantity(tasks.id, tasks.quantity)}disabled={tasks.quantity ? false : true}>-</button>
                </div>
                <div className="addamt">
                    <label>Amount</label>
                    <label>{tasks.amount.toLocaleString("en-IN",{
                        style: "currency",
                        currency: "INR",
                    })}
                    </label>
                </div>
                <button onclick={()=>cartAdd(tasks)}
                disabled={tasks.quantity ? false : true}>Add To Cart</button>
                
            
            </li>))}
            </ul>
            </ul>
            {appCtx.addToCart.length> 0 && <Cart/>}
            </div>
    );
        };
    
            


export default Order;