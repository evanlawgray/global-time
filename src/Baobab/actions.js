const GOOGLE_TIME_ZONE_URL = 'https://maps.googleapis.com/maps/api/timezone/json?';
const TIME_ZONE_API_KEY = 'AIzaSyAfbJWinFTCqp353FFt0tjygBFh57-FmXY';

// https://maps.googleapis.com/maps/api/timezone/json?location=40.979898069620134,112.6593017578125&timestamp=1514778304059&key=AIzaSyAfbJWinFTCqp353FFt0tjygBFh57-FmXY

// https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY

const constructTimeZoneUrl = ({lat, lng}, timestamp) => {
  return GOOGLE_TIME_ZONE_URL +
    `location=${lat},${lng}&timestamp=${timestamp}&key=${TIME_ZONE_API_KEY}`;
}

export const addLocation = (tree, location) => {
  const targetDate = new Date();
  const timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;

  fetch(constructTimeZoneUrl(location, timestamp))
    .then(res => {
      if(!res.ok) return Promise.reject();
      return res.json();
    })
    .then(({dstOffset, rawOffset, status, timeZoneId, timeZoneName}) => {
      const offsets = dstOffset * 1000 + rawOffset * 1000;
      const localTime = new Date(timestamp * 1000 + offsets);

      const result = Object.assign({}, location,
        {
          localTime,
          timeZoneId,
          timeZoneName,
        }
      );

      tree.push('locations', result);
    })
}
