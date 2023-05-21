import cn from 'classnames';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { calcDiscountPrice, isLiked } from '../../utils/product';
import ContentLoader from "react-content-loader";
import "./index.css";
import { ReactComponent as Save } from "./save.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLikeProduct } from '../../storage/products/productsSlice';
import { addCart } from '../../storage/cart/cartSlice';

const Card = ({ allData, name, price, _id, likes, discount, wight, description, pictures, tags }) => {
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.user.data);
   const isLoading = useSelector(state => state.user.getUserRequest);

   const handleLikeClick = useCallback(() => {
      return dispatch(fetchChangeLikeProduct({ _id, likes }))
   }, [dispatch, _id, likes])

   const handleAddCartClick = useCallback((e) => {
      e.preventDefault()
      return dispatch(addCart(allData))
   }, [dispatch, allData])

   const discount_price = calcDiscountPrice(price, discount);
   const liked = isLiked(likes, currentUser?._id)

   return (
      <>
         {isLoading
            ? <ContentLoader
               speed={2}
               width={186}
               height={385}
               viewBox="0 0 186 385"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
            >
               <path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
               <rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
            </ContentLoader>
            : <div className="card">
               <div className="card__sticky card__sticky_type_top-left">
                  {discount !== 0 && <span className="card__discount">{`-${discount}%`}</span>}
                  {tags && tags.map(tag => <span key={tag} className={cn('tag', { [`tag_type_${tag}`]: true },)}>{tag}</span>)}
               </div>
               <div className="card__sticky card__sticky_type_top-right">
                  <button className={cn('card__favorite', { 'card__favorite_is-active': liked })} onClick={handleLikeClick}>
                     <Save className="card__favorite-icon" />
                  </button>
               </div>

               <Link to={`/product/${_id}`} className="card__link">
                  <img src={pictures} alt={description} className="card__image" />
                  <div className="card__desc">
                     <span className={discount !== 0 ? "card__old-price" : "card__price"}>
                        {price}&nbsp;₽
                     </span>
                     {discount !== 0 && <span className="card__price card__price_type_discount">
                        {discount_price}&nbsp;₽
                     </span>}
                     <span className="card__wight">{wight}</span>
                     <p className="card__name">{name}</p>
                  </div>
               </Link>
               <a href="#" className="card__cart btn btn_type_primary" onClick={handleAddCartClick}>
                  В корзину
               </a>
            </div>
         }
      </>
   );
};

export default Card;
