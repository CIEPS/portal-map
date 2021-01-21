/* global L */

const generateColors = () => {
  const baseColor = [
    ['02394A', '043565', '5158BB', 'F26DF9', 'EB4B98', 'EAF0CE'],
    ['2176ae', '57b8ff', 'b66d0d', 'fbb13c', 'fe6847', 'cde7b0'],
    ['985f99', '9684a1', 'aaacb0', 'b6c9bb', 'bfedc1', 'f8f272'],
    ['0b2027', '40798c', '70a9a1', 'cfd7c7', 'f6f1d1', 'aad922'],
    ['ffffff', '412234', '6d466b', 'b49fcc', 'ead7d7', 'a72608'],
    ['114b5f', '1a936f', '88d498', 'c6dabf', 'f3e9d2', 'ff7f11'],
    ['a8d5e2', 'f9a620', 'ffd449', '548c2f', '104911', 'd1b1cb'],
    ['cad178', 'd3d57c', 'c7aa74', '957964', '603140', '6e4451'],
    ['1f271b', '19647e', '28afb0', 'f4d35e', 'ee964b', 'dfd9e2'],
    ['f92a82', 'ed7b84', 'f5dbcb', 'd6d5b3', '7eb77f', '463f3a'],
    ['20bf55', '0b4f6c', '01baef', 'fbfbff', '757575', 'aa4465'],
    ['e6c229', 'f17105', 'd11149', '6610f2', '1a8fe3', '7ca5b8']
  ];
  const randomIndex = Math.floor(Math.random() * (baseColor.length - 1));
  const colors = baseColor[randomIndex].map((color, index) => {
    return {
      threshold: index ? Math.pow(10, index) : 0,
      hex: '#' + color
    };
  });
  return colors;
};

const colors = generateColors();

function getColor (total) {
  let output;
  colors.forEach(color => {
    if (total >= color.threshold) output = color.hex;
  });
  return output;
}

const map = L.map('map', {
  center: [10.0, 5.0],
  minZoom: 3,
  maxZoom: 12,
  zoomSnap: 0.25,
  zoom: 2.50
});

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png', {
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
    feature.properties.notices = (feature.properties.iso_a3 in betterNoticesCountry) ? betterNoticesCountry[feature.properties.iso_a3].notices : 0;
    return feature;
  });

  L.vectorGrid.slicer(countryBoundaries, {
    rendererFactory: L.svg.tile,
    vectorTileLayerStyles: {
      sliced: function (properties) {
        const fillColor = getColor(properties.notices);
        return {
          fillColor,
          fillOpacity: 0.8,
          weight: 1,
          opacity: 1,
          color: '#666',
          stroke: true,
          fill: true
        };
      }
    },
    interactive: true
  }).on('click', function (e) {
    const properties = e.layer.properties;
    L.popup()
      .setContent(`
      <div>${properties.name}</div>
      <div>
        <a href="https://portal.issn.org/?q=api/search&search[]=MUST=country=${properties.iso_a3}&search[]=MUST=record=Register">
          ${properties.notices.toString()} records
        </a>
      </div>
    `)
      .setLatLng(e.latlng)
      .openOn(map);
  }).addTo(map);

  const legend = L.control({ position: 'topright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const grades = colors.reduce((accumulator, current) => {
      accumulator.push(current.threshold);
      return accumulator;
    }, []);
    div.innerHTML += '<span>Total records</span>';
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += `
        <div>  
          <span class="color" style="background:${getColor(grades[i] + 1)}"></span>
          <span>${grades[i]} ${grades[i + 1] ? ' &ndash; ' + grades[i + 1] : '+'}</span>
        </div>
      `;
    }

    return div;
  };

  legend.addTo(map);
});
