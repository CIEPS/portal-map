/* global L */

// function getOpacity(total) {
//     let opacity = 0.2;
//     if (total > 50) opacity = 0.3;
//     if (total > 100) opacity = 0.4;
//     if (total > 500) opacity = 0.5;
//     if (total > 2000) opacity = 0.6;
//     if (total > 10000) opacity = 0.7;
//     if (total > 40000) opacity = 0.8;
//     return opacity;
// }

// function getColor(continent) {
//     let color = '#999999';
//     if (continent === 'Europe') color = '#0069b3';
//     if (continent === 'Asia') color = '#ffcc01';
//     if (continent === 'Africa') color = '#f07d00';
//     if (continent === 'North America') color = '#00963f';
//     if (continent === 'South America') color = '#b80d7f';
//     if (continent === 'Oceania') color = '#e40613';
//     return color;
// }

function getColor (total) {
  let color = '#ffff00';
  if (total > 100) color = '#ffdc00';
  if (total > 500) color = '#ffb400';
  if (total > 2000) color = '#ff9600';
  if (total > 10000) color = '#ff7800';
  if (total > 40000) color = '#ff5000';
  return color;
}

function style (feature) {
  const fillColor = getColor(feature.properties.notices);
  return {
    fillColor,
    fillOpacity: 0.6,
    weight: 1,
    opacity: 0.7,
    color: '#333'
  };
}
const map = L.map('map', {
  center: [10.0, 5.0],
  minZoom: 3,
  maxZoom: 12,
  zoomSnap: 0.25,
  zoom: 2.50,
  worldCopyJump: true
});

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

L.tileLayer(' https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '©OpenStreetMap, ©CartoDB'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_only_labels/{z}/{x}/{y}.png', {
  attribution: '©OpenStreetMap, ©CartoDB',
  pane: 'labels'
}).addTo(map);

Promise.all([
  window.fetch('/portal-map/custom.geo.json').then(response => response.json()),
  window.fetch('/portal-map/countries.json').then(response => response.json())
]).then(([countryBoundaries, noticesCountry]) => {
  const betterNoticesCountry = noticesCountry.reduce((accumulator, current) => {
    accumulator[current.country] = current;
    return accumulator;
  }, {});

  countryBoundaries.features = countryBoundaries.features.map(feature => {
    if (feature.properties.iso_a3 in betterNoticesCountry) {
      feature.properties.notices = betterNoticesCountry[feature.properties.iso_a3].notices;
    }
    return feature;
  });
  const geojson = L.geoJson(countryBoundaries, { style: style }).addTo(map);

  geojson.eachLayer(function (layer) {
    if ('notices' in layer.feature.properties) {
      layer.bindPopup(`
        <div>${layer.feature.properties.name}</div>
        <div>
          <a href="https://portal.issn.org/?q=api/search&search[]=MUST=country=${layer.feature.properties.iso_a3}&search[]=MUST=record=Register">
            ${layer.feature.properties.notices.toString()} records
          </a>
        </div>
      `);
    }
  });
});
