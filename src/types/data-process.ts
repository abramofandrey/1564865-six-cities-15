import { TOffer } from './offer';
import { TOfferPreview } from './offer-preview';
import { TReviews } from './review';

export type DataProcess = {
  offers: TOfferPreview[];
  isOffersDataLoading: boolean;
  aroundOffers: TOfferPreview[];
  reviews: TReviews;
  offer: TOffer | null;
  favorites: TOfferPreview[];
  hasErrorOffers: boolean;
  hasErrorOffer: boolean;
  addReviewStatus: {
    pending: boolean;
    rejected: boolean;
    success: boolean;
  };
};
