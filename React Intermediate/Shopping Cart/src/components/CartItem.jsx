import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"
import { add , remove } from "../Redux/Slices/cartSlice";

const CartItem = ({item , itemIndex}) => {

  const dispatch = useDispatch();

  function removeFromCart() {
    dispatch(remove(item.id))
    toast.success("Item removed successfully")
  }

  return (
    <div>
      <div>
        <div>
          <img src={item.image}/>
        </div>
        <div>
          <h1>{item.title}</h1>
          <h1>{item.description}</h1>
          <div>
            <p>{item.price }</p>
            <div onClick={removeFromCart}>
              <FcDeleteDatabase/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
