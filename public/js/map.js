mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container : "map" ,          //Container ID
    style : "mapbox://styles/mapbox/streets-v12",           //Style url
    center : listing.geometry.coordinates,            //Starting position[lng , lat]
    zoom : 9                 //Starting zoom
});

const marker = new mapboxgl.Marker({color : "red"})
    .setLngLat(listing.geometry.coordinates)          //Listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({offset : 25}).setHTML(
            `<h4>${listing.title}</h4><p>Exact location  will be provided after booking</p>`
        )
    )
    .addTo(map);

