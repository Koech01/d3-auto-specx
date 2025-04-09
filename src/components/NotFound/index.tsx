import css from './index.module.css';
import crashedCarPng from '../assets/crashedCar.png';


const NotFound = () => {
  return (
    <div className={`${css.pageNotFoundParent} ${css.fadeIn}`}>
        <img className={css.crashedCarPng}src={crashedCarPng} alt={crashedCarPng}/>
        <h1 className={css.pageNotFoundText}>404</h1>
    </div>
    );
};

export default NotFound;