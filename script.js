var map = L.map('map').setView([-0.5, 117.0], 10);

// Basemap
var googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Default
googleSat.addTo(map);

// Control
var baseMaps = {
    "OSM": osm,
    "Google Satellite": googleSat
};

L.control.layers(baseMaps).addTo(map);



// =======================
// LAYER JALAN (POLYLINE)
// =======================
fetch('jl_w12_wgs.json')
    .then(res => res.json())
    .then(data => {

        var jalanLayer = L.geoJSON(data, {

            style: function(feature) {
                return {
                    color: "red",
                    weight: 2,
                    opacity: 1
                };
            },

            onEachFeature: function(feature, layer) {
                let props = feature.properties;

                let popup = "<b>Jalan</b>";

                if (props.nama) {
                    popup = "<b>" + props.nama + "</b>";
                }

                layer.bindPopup(popup);
            }

        }).addTo(map);

        // Zoom ke jalan
        map.fitBounds(jalanLayer.getBounds());

    });



// =======================
// LAYER TITIK (POINT)
// =======================
fetch('front1.json')
    .then(res => res.json())
    .then(data => {

        var titikLayer = L.geoJSON(data, {

            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    color: "black",
                    fillColor: "yellow",
                    fillOpacity: 1
                });
            },

            onEachFeature: function(feature, layer) {
    let props = feature.properties;

    let popup = `
        <div style="width:200px">
            <b>${props.nama || "Titik"}</b><br>
            <p>${props.deskripsi || ""}</p>
            <img src="${props.foto}" 
                 style="width:100%; border-radius:5px;">
        </div>
    `;

    layer.bindPopup(popup);
}

        }).addTo(map);

    });