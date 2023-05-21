import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NotFound } from "../../components/NotFound/NotFound"
import { Product } from "../../components/Product/product"
import Spinner from "../../components/Spinner"
import { fetchChangeLikeProduct } from "../../storage/products/productsSlice"
import { fetchSingleProduct, setProductState } from "../../storage/singleProduct/singleProductSlice"

export const ProductPage = () => {
   const { productId } = useParams();
   const dispatch = useDispatch();
   const { data: product, loading: isLoading, error: errorState } = useSelector(state => state.singleProduct)

   useEffect(() => {
      dispatch(fetchSingleProduct(productId))
   }, [dispatch, productId]);

   const handleProductLike = useCallback(() => {
      dispatch(fetchChangeLikeProduct(product))
         .then(updateProduct => {
            dispatch(setProductState(updateProduct.payload.product))
         })
   }, [product, dispatch])

   return (
      <div className="container container_inner">
         <div className='content__cards'>
            {isLoading
               ? <Spinner />
               : !errorState && <Product {...product} allData={product} onProductLike={handleProductLike} />
            }
            {!isLoading && errorState && <NotFound />}
         </div>
      </div>
   )
}