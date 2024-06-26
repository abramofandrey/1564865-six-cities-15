import { Link } from 'react-router-dom';
import { CitiesMap } from '../../const';
import { setActiveCity } from '../../store/app-process/app-process';
import { getActiveCity } from '../../store/app-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TCity } from '../../types/city';
import classNames from 'classnames';

function Location() {

  const activeCity = useAppSelector(getActiveCity);

  const dispatch = useAppDispatch();

  function handleCitiesItemClick(city: TCity) {
    dispatch(setActiveCity(city));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CitiesMap.map((city) => (
            <li key={city.name} className="locations__item">
              <Link
                className={classNames(
                  'locations__item-link tabs__item',
                  { 'tabs__item--active': city.name === activeCity.name }
                )}
                to="/"
                onClick={() => handleCitiesItemClick(city)}
              >
                <span>{city.name}</span>
              </Link>
            </li>)
          )}
        </ul>
      </section>
    </div>
  );
}

export default Location;
