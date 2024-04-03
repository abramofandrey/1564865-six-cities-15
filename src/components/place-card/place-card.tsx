import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TOfferPreview } from '../../types/offer-preview';
import { TOffer } from '../../types/offer';

type TCardProps = {
  offers: TOfferPreview;
  block: string;
  handleListItemHover?: (itemId: TOffer['id'] | null) => void;
}

function PlaceCard({offers, block, handleListItemHover}: TCardProps): JSX.Element {

  const {
    id,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    price,
    previewImage
  } = offers;

  const offerLink = `${AppRoute.Offer}/${id}`;

  const handleMouseEnter = () => {
    handleListItemHover?.(id);
  };

  const handleMouseLeave = () => {
    handleListItemHover?.(null);
  };

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{width: `${rating * 100 / 5}%`}}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
