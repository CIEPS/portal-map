/* global L */

const colors = [
  {
    threshold: 0,
    hex: '#ffff00'
  },
  {
    threshold: 100,
    hex: '#ffdc00'
  },
  {
    threshold: 500,
    hex: '#ffb400'
  },
  {
    threshold: 2000,
    hex: '#ff9600'
  },
  {
    threshold: 10000,
    hex: '#ff7800'
  },
  {
    threshold: 50000,
    hex: '#ff5000'
  }
];

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
