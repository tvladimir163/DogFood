
import s from './index.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonCount } from '../ButtonCount/button-count';
import { addCartAfterChange, decrementQuantity, incrementQuantity, removeProduct } from '../../storage/cart/cartSlice';
import { ProductPrice } from '../ProductPrice/product-price';
import { ReactComponent as TrashIcon } from './img/trash.svg';
import { GiftLabel } from '../GiftLabel/gift-label';



export const CartItem = ({ allData, name, price, _id, discount, wight, pictures, tags, quantity, isGift }) => {
   const dispatch = useDispatch();

   return (
      <>
         <div className={s.cartItem}>
            <div className={s.cartDesc}>
               <img src={pictures} alt={name} className={s.cartImage} />
               <Link to={`/product/${_id}`} className={s.cartLink}><h2 className={s.cartTitle}>{name}</h2></Link>
               <p className={s.cartWeight}>{wight}</p>
            </div>
            {!isGift && <ButtonCount
               amount={quantity}
               handleIncrement={() => dispatch(incrementQuantity(allData))}
               handleDecrement={() => dispatch(decrementQuantity(allData))}
               handleCountChange={(newQuantity) => dispatch(addCartAfterChange({ ...allData, quantity: newQuantity }))}
            />}
            {!isGift && <div className={s.cartPrice}> <ProductPrice price={price} discount={discount} type="big" align="right" /></div>}
            {!isGift && <button className={s.bntTrash} onClick={() => dispatch(removeProduct(allData))}><TrashIcon /></button>}
            {isGift && <GiftLabel title="Подарок" text="за первый заказ!" />}
         </div>
      </>
   );
};


