import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState, TAuthData, TUserData } from '../types/state';
import { AxiosInstance } from 'axios';
import { TReview, TReviewData, TReviews } from '../types/review';
import { TOffer, TOffers } from '../types/offer';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../components/services/token';
import { store } from '.';

import {
  getOffers,
  gethReviews,
  setOffersDataLoadingStatus,
  setError,
  getNearPlaces,
  addReview,
  getOffer
}
  from './action';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<TOffers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(getOffers(data));
  },
);

export const fetchAroundOffersAction = createAsyncThunk<void, string, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  }
>(
  'data/fetchAroundOffers',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(getNearPlaces(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  }
>(
  'data/fetchReviews',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<TReviews>(`${APIRoute.Comments}/${id}`);
    dispatch(gethReviews(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}
>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<TOffer>(`${APIRoute.Offers}/${id}`);
    dispatch(getOffer(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email: email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<TUserData>(APIRoute.Login, { email, password });
    saveToken(token);
  },
);

export const fetchAddReviewAction = createAsyncThunk<void, TReviewData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}
>(
  'offer/addReview',
  async ({ comment, rating }, { dispatch, getState, extra: api }) => {
    const state = getState();
    if (state.offer) {
      const { data } = await api.post<TReview>(`${APIRoute.Comments}/${state.offer.id}`, { comment, rating });
      dispatch(addReview(data));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
