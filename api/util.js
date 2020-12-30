exports.parseLatLng = (latLng) => {
    if (latLng === undefined || latLng === null) {
        return {}
    }

    const splitted = latLng.split(',')

    if (splitted.length < 2) {
        return {}
    }

    return {
        'lat': parseFloat(splitted[0].trim()),
        'lng': parseFloat(splitted[1].trim()),
    }
}