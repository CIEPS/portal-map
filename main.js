/* global L */

const baseColor = [
  ['ff9879', 'ee776d', 'fc668f', 'ee6dd9', 'dd69fc'],
  ['ff541f', 'e31c0b', 'fa0045', 'e30bbf', 'c705fa'],
  ['b23b16', '9e1408', 'af0030', '9e0885', '8b03af'],
  ['79ffbf', '6dee89', '79fc67', 'adee6d', 'ebfc69'],
  ['1fff95', '0be33a', '1ffa01', '77e30b', 'defa05'],
  ['16b268', '089e28', '16af01', '539e08', '9baf03'],
  ['7982ff', '6d9bee', '66c7fb', '6de6ee', '69fcd8'],
  ['1f2fff', '0b59e3', '00a2f9', '0bd6e3', '05fabe'],
  ['1621b2', '083e9e', '0071ae', '08959e', '03af85'],
  ['F5D516', '0DD421', '1A9BEB', '890DD4', 'FA3408'],
  ['199E55', 'B8FFD8', '61EB9F', '61EB9F', 'EB847A']
];

const select = document.getElementById('colors');
baseColor.forEach((color, index) => {
  const option = document.createElement('option');
  option.text = 'color palette n°' + index;
  option.value = index;
  select.add(option);
});

select.addEventListener('change', (event) => {
  console.log(event.target.value);
  colors = baseColor[event.target.value].map((color, index) => {
    return {
      threshold: index ? Math.pow(10, index) : 0,
      hex: '#' + color
    };
  });
  map.remove();
  map = createMap();
});

let colors = baseColor[select.value].map((color, index) => {
  return {
    threshold: index ? Math.pow(10, index) : 0,
    hex: '#' + color
  };
});

function getColor (total) {
  let output;
  colors.forEach(color => {
    if (total >= color.threshold) output = color.hex;
  });
  return output;
}

let map = createMap();

function createMap () {
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

  return map;
}
