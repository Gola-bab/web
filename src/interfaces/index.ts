import { RefObject } from 'react';
import type TinderCard from 'react-tinder-card';

type ExtractGenericFromRefObject<TRefObject> = TRefObject extends RefObject<infer U> ? U : never;

export type TinderCardProps = Parameters<typeof TinderCard>[0];
export type API = ExtractGenericFromRefObject<TinderCardProps['ref']>;

export type Satisfaction = 'GOOD' | 'BAD' | 'VERYGOOD' | 'VERYBAD';
export type Direction = 'up' | 'down' | 'left' | 'right';
export type Restaurant = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  teamcenterLat: number;
  teamcenterLoong: number;
};

export type SatisfactionByRestaurant = {
  restaurantId: number;
  satisfaction: Satisfaction;
};

export type RestaurantSatisfaction = {
  restaurantName: string;
} & {
  [key in Lowercase<Satisfaction>]?: string[];
};

export type CategorySatisfaction = {
  tag: string;
  percent: number;
};

// Result
export type ResultParams = {
  teamId: string;
};
export type ResultRequest = {
  userId: number;
  restaurantSatisfactions: SatisfactionByRestaurant[];
};
export type ResultResponse = RestaurantSatisfaction[];
// export type ResultResponse ={
//   // categorySatisfactions: CategorySatisfaction[];
//   restaurantSatisfactions: RestaurantSatisfaction[];
// };

// User
export type UserParams = {
  teamId: string;
};
export type UserRequest = {
  nickName: string;
};
export type UserResponse = {
  userId: string;
};

// Team
export type TeamRequest = {
  name: string;
  radius: number;
  lat: number;
  lng: number;
  limitUser?: number;
  limitRestaurant?: number;
};
export type TeamResponse = {
  teamId: string;
};

// Restaurant
export type RestaurantParams = {
  userId: string;
};
export type RestaurantResponse = Restaurant[];
