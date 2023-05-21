import { CartItem } from '../CartItem/cart-item'
import { NotFound } from '../NotFound/NotFound';
import s from './index.module.css';



export const CartList = ({ productsCart }) => {
   return (
      <>
         {!productsCart.length && <NotFound buttonText='На главнуюг' title="В корзине нет товаров" />}
         <div className={s.cartList}>
            {
               productsCart.map((item, index) => <CartItem key={item._id} allData={item} {...item} />)
            }
         </div>
      </>
   );
};

