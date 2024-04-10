import axios from 'axios';
import 'dotenv/config';
const MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;
import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});

const fetchEvents = async () => {
  const feedJson = await axios.get('https://events.ucf.edu/feed.json');
  const promisedEvents = feedJson.data.map(async event => await normalizeFeedJson(event));
  return await Promise.all(promisedEvents);
};

const normalizeFeedJson = async event => {
  // Geocoding event address
  let address = undefined;
  if (event.location.localeCompare('Virtual') !== 0) {
    let response = await client.findPlaceFromText({
      params: {
        input: 'UCF ' + event.location.split(':')[0] + ' Orlando',
        inputtype: "textquery",
        key: MAPS_KEY
      }
    })
      .then(async response => await client.geocode({
        params: {
          place_id: response.data.candidates[0]?.place_id,
          key: MAPS_KEY
        }
        })
      )
    // console.log(event.location, response.data.results[0]?.formatted_address);
    // console.log(event.location, response.data.results[0]);
    address = response.data.results[0]?.formatted_address;
  }

  let eventObj = {
    title: event.title, // string
    description: event.description, // string
    category: event.category, // string
    tags: event.tags, //
    location: {
      name: event.location, // string
      url: event.location_url ?? event.virtual_url, // string
      address // string
    },
    time: {
      start: event.starts, //
      end: event.ends
    },
    contact: {
      name: event.contact_name,  // string
      phone: event.contact_phone, // string
      email: event.contact_email, // string
    },
    privacy_level: "public", // string
    event_id: event.event_id // 
  };
  console.log(eventObj)
  return eventObj;
}

export default fetchEvents;