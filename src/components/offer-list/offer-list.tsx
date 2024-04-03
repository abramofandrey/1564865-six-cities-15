import PlaceCard from '../../components/place-card/place-card';
// import { TOffer } from '../../types/offer';
import { TOfferPreview } from '../../types/offer-preview';

type TOfferListProps = {
  offers: TOfferPreview[];
  onCardHover?: (offerId: TOfferPreview['id'] | null) => void;
  // handleListItemHover: (itemId: TOffer['id'] | null) => void;
}

function OfferList({ offers, onCardHover, /*handleListItemHover*/ }: TOfferListProps) {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offers={offer}
          block='cities'
          onCardHover={onCardHover}
          // handleListItemHover={handleListItemHover}
        />
      ))}
    </>
  );
}

export default OfferList;
