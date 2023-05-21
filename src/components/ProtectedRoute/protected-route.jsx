import { Navigate, useLocation } from "react-router-dom"
import Spinner from "../Spinner";
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
   const user = useSelector(state => state.user.data);
   const isAuthChecked = useSelector(state => state.user.isAuthChecked);
   const location = useLocation();

   if (!isAuthChecked) {
      return <Spinner />
   }

   if (onlyUnAuth && user) {
      const { from } = location.state || { from: { pathname: '/' } };

      return (
         <Navigate replace to={from} />
      )
   }

   if (!onlyUnAuth && !user) {
      return (
         <Navigate replace to={{ pathname: "/login" }} state={{ from: location }} />
      )
   }

   return <>{children}</>
}