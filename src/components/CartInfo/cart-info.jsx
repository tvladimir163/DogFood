import { useSelector } from "react-redux";
import { cartInfoSelector } from '../../storage/cart/cartSlice'
import s from "./index.module.css";

export const CartInfo = () => {
   const state = useSelector(state => state)
   const { totalCount } = cartInfoSelector(state);


   return (
      <div className={s.cartTitle}>
         <span>{totalCount} товаров</span> в корзине
      </div>
   );
};

