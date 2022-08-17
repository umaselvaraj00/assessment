import { useContext } from "react";
import { appContext } from "./App";


const Cart=()=>{
    const appCtx=useContext(appContext);
  


return(
    <div>
    <h1>Cart Page</h1>
    <div className="two"></div>
    <div className="cart">
    <h3 classsName="two">Product Name:</h3>
    <h3 className="two">Quantity:</h3>
    <h3 className="two">Amount:</h3>
    </div>
        <ul>{appCtx.addToCart.map(
            (tasks)=>(<div key={tasks.id}>
                <h3 className="two"> {tasks.task}</h3>
                <h3 className="two">{tasks.quantity}</h3>
                <h3 className="two"> {tasks.price}<br></br></h3>
            </div>))}
        </ul>
     </div>
);
            };
export default Cart;