import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { ReactComponent as CartIcon } from './img/cart.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as UserIcon } from './img/user.svg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../storage/user/userSlice';
import { cartInfoSelector } from '../../storage/cart/cartSlice'

function Header({ children }) {
   const favorites = useSelector(state => state.products.favoriteProducts);
   const user = useSelector(state => state.user.data);
   const state = useSelector(state => state);
   const dispatch = useDispatch();
   const location = useLocation();
   const { totalCount } = cartInfoSelector(state);

   return (
      <header className={cn(s.header, 'cover')}>
         <div className="container">
            <div className={s.header__wrapper}>
               {children}
               <div className={s.iconsMenu}>
                  <Link className={s.favoritesLink} to={{ pathname: "/favorites" }}>
                     <FavoriteIcon />
                     {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
                  </Link>
                  <Link className={s.favoritesLink} to={{ pathname: "/cart" }}>
                     <CartIcon />
                     {totalCount !== 0 && <span className={s.iconBubble}>{totalCount}</span>}
                  </Link>
                  {!user && <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} className={s.iconsMenuItem} >
                     <UserIcon />
                     Войти
                  </Link>
                  }
                  {user &&
                     <>
                        <Link to='/profile' className={s.iconsMenuItem}>
                           <ProfileIcon />
                           {user.name}
                        </Link>
                        <Link to='/' className={s.iconsMenuItem} onClick={() => dispatch(logout())} >
                           <LogoutIcon />
                           Выйти
                        </Link>
                     </>
                  }
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header;