import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './index.css';


const CardList = ({ cards }) => {
   const navigate = useNavigate();
   const loading = useSelector(state => state.products.loading)
   return (
      <>
         {!cards.length && !loading && <NotFound buttonText='Назад' title="Простите, по вашему запросу ничего не найдено" buttonAction={() => navigate(-1)} />}
         <div className='cards'>
            {
               cards.map((item, index) => <Card key={item._id} allData={item} {...item} />)
            }
         </div>
      </>
   );
};

export default CardList;

