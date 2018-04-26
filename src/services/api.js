import 'isomorphic-fetch';
import Sockette from 'sockette';
import Constants from './constants';

const env = window.location.hostname === '127.0.0.1' ? 'local' : 'prod';
const mockNotifications = [
  {
    "id": 2,
    "title": "Traffic Alert",
    "content": "CRASH occurred on SH1 (thanks, Gwyneth)",
    "type": "TRAFFIC",
    "timestamp": "2018-04-26T20:40:21+00:00",
    "severity": 3,
    "properties": {
      "lat": -36.8322175,
      "long": 174.745171
    }
  },
  {
    "id": 1,
    "title": "Geofence entry",
    "subtitle": "Jane Doe",
    "content": "Jane is going through a geofence! yes jane woohoo lets goough a geofence! yes jane woohoo lets goough a geofence! yes jane woohoo lets goough a geofence! yes jane woohoo lets go lots of text",
    "type": "GEOFENCE",
    "timestamp": "2018-04-26T03:43:21+00:00",
    "severity": 1,
    "properties": {
      "driverGid": "3fac4c38-367d-484b-9cdc-6496a2bc0742"
    }
  }
];
export function getNotifications() {
  return fetch(`${Constants.API_URI}${Constants.NOTIFICATION_ENDPOINT}`).then(resp => resp.json());
}

export function subscribeToNotifications(onMessageRecieved) {
  if (env === 'local') {
    onMessageRecieved({
      data: JSON.stringify(mockNotifications)
    });
    return;
  }
  const ws = new Sockette(Constants.WEB_SOCKET_URI, {
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => console.log('Connected!', e),
    onmessage: onMessageRecieved,
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => console.log('Closed!', e),
    onerror: e => console.log('Error:', e)
  });
  return ws;
}
