# geocode-gh

A simple api built with Node.js and Express.  
Send your digital address, get back your details.

## Example
This GET Request:  
```
https://geocode-gh.herokuapp.com/api?address=BA-06905-1921
```

Returns:  
```json
{
  "digitalAddress": "BA-06905-1921",
  "streetName": ".[Unknown Street]",
  "region": "Brong Ahafo",
  "district": "Atebubu-Amantin",
  "postCode": "BA06905",
  "area": ".",
  "latLng": {
    "lat": 7.946538,
    "lng": -1.023203
  }
}
```

> **Heavily inspired by the [ghpost-address](https://github.com/sesesmith30/ghanapost-address) node library**
