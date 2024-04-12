const MAPS_KEY = "AIzaSyBurgR6wjfr6bAgvPI-8D3smRmf3tbHhAg";
import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});

export const getPlaceDetails = async place_id => {
  const response = await client.placeDetails({params: { place_id }});
  return;
}