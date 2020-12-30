exports.parseLatLng = (latLng) => {
    if (latLng === undefined || latLng === null) {
        return {}
    }

    const splitted = latLng.split(',')

    if (splitted.length < 2) {
        return {}
    }

    return {
        'lat': splitted[0].trim(),
        'lng': splitted[1].trim(),
    }
}