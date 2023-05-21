import s from './index.module.css';
import cn from 'classnames';
import { calcDiscountPrice } from '../../utils/product';


export const ProductPrice = ({ discount, price, type, align = 'left' }) => {
   const discount_price = calcDiscountPrice(price, discount);
   return (
      <div className={cn({ [s[`${type}Price`]]: type }, s.priceWrap)}>
         <span className={cn({ [s.oldPrice]: discount, [s.price]: !discount, [s[align]]: align })}>{price}&nbsp;P</span>
         {discount !== 0 && <span className={cn(s.price, s.priceDiscount)}>{discount_price}&nbsp;P</span>}
      </div>
   )
}