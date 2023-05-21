import cn from 'classnames';
import { useSelector } from 'react-redux';
import { cartInfoSelector } from '../../storage/cart/cartSlice';
import s from './index.module.css';



export const CartAmount = () => {
   const state = useSelector(state => state);
   const { amountWithDiscount, totalDiscount, amount, totalCount } = cartInfoSelector(state);
   return (
      <div className={s.cartAmount}>
         <h1 className={s.title}>Ваша корзина</h1>
         <div className={s.table}>
            <div className={s.tableRow}>
               <span className={s.tableTitle}>Товары ({totalCount})</span>
               <span className={s.tableValue}>{amount} Р</span>
            </div>
            {totalDiscount !== 0 && (<div className={s.tableRow}>
               <span className={s.tableTitle}>Скидка</span>
               <span className={cn(s.tableValue, s.tableValueDiscount)}>- {totalDiscount} Р</span>
            </div>)}
         </div>
         <div className={s.totalCost}>
            <h2 className={s.totalCostTitle}>Общая стоимость</h2>
            <span className={s.totalCostValue}>{amountWithDiscount} Р</span>
         </div>
         <div className="btn btn_type_primary btn_type_wide">Оформить заказ</div>
      </div>
   )
}