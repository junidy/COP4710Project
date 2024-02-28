import { Client } from "@googlemaps/google-maps-services-js";
const client = new Client({});
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const normalizeFeedJson = event => {
  // Geocoding event address
  if (!event.virtual_url) {
    client.textSearch({
      params: {
        address: event.location,
        key: MAPS_KEY
      }
    })
    // console.log(address);
  }

  return {
    title: event.title,
    description: event.description,
    category: event.category,
    tags: event.tags,
    location: {
      name: event.location,
      url: event.location_url ?? event.virtual_url,
      // TODO – Google Place API name to address
    },
    time: {
      start: event.start,
      end: event.end
    },
    contact: {
      name: event.contact_name,
      phone: event.contact_phone,
      email: event.contact_email,
    },
    privacy_level: "public",
    event_id: event.event_id
  };
}

export default normalizeFeedJson;