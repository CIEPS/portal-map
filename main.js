/* global L */

const baseColor = [
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['ff9879', 'ee776d', 'fc668f', 'ee6dd9', 'dd69fc']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['ff541f', 'e31c0b', 'fa0045', 'e30bbf', 'c705fa']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['b23b16', '9e1408', 'af0030', '9e0885', '8b03af']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['79ffbf', '6dee89', '79fc67', 'adee6d', 'ebfc69']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['1fff95', '0be33a', '1ffa01', '77e30b', 'defa05']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['16b268', '089e28', '16af01', '539e08', '9baf03']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['7982ff', '6d9bee', '66c7fb', '6de6ee', '69fcd8']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['1f2fff', '0b59e3', '00a2f9', '0bd6e3', '05fabe']
  },
  {
    name: 'Proposition mr Ruiz V01',
    hex: ['1621b2', '083e9e', '0071ae', '08959e', '03af85']
  },

  {
    name: 'Proposition Simona',
    hex: ['F5D516', '0DD421', '1A9BEB', '890DD4', 'FA3408']
  },
  {
    name: 'Proposition Simona',
    hex: ['16F559', '0DD4B7', '1A9BEB', '0D20D4', '740EFA']
  },
  {
    name: 'Proposition Simona',
    hex: ['9E3960', 'EB0E62', 'A53DEB', '192B9E', '314AEB']
  },
  {
    name: 'Proposition Simona',
    hex: ['73F3FA', '5590D4', '6B69EB', '9B5CD6', 'F582F1']
  },
  {
    name: 'Proposition Rémy',
    hex: ['C19B00', 'C0C100', '35C100', '00C13B', '00C1A5', '0073C1']
  },
  {
    name: 'Proposition Rémy',
    hex: ['942776', 'c83d6d', 'ed645f', 'ff9354', 'ffc655', 'f9f871']
  },
  {
    name: 'Proposition Rémy',
    hex: ['942776', '6f52a9', '0073c5', '008cc5', '009fb2', '1eae96']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['8acdd5', '87c8b4', '8bd49d', '94c886', 'c3d88b']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['3dabba', '37a484', '3cb75d', '4da537', '9cbf3f']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['2b7882', '27725b', '2b7f41', '357225', '6d852d']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['c48cd7', '9d87c8', '8b90d4', '87a5c9', '87a5c9']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['9d3ebc', '5d37a4', '3d47b8', '3769a4', '40aebf']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['6e2c83', '402572', '2b3081', '264971', '2c7885']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['d7ac8a', 'c99587', 'd38c8a', 'c787b9', 'c28cd8']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['bc753f', 'a54f38', 'b83e3d', 'a4378a', '9b40bf']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['83512c', '723727', '802a2b', '71265f', '6c2b85']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['c0d68b', 'c8c487', 'd4c38b', 'c8b188', 'd8ad8b']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['94bb3e', 'a59d38', 'b89e3f', 'a47c37', 'bf763f']
  },
  {
    name: 'Proposition mr Ruiz V02',
    hex: ['69832c', '716d26', '816e2c', '715526', '86522b']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['d3e5e5', 'a8cccc', '6eabac', '6c9c9c', '6b8f8f']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['b6d4d4', '6eaaaa', '0d7473', '0b5c5d', '084444']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['7e9394', '4d7776', '0a5050', '084041', '06302f']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['93a2a9', 'adc0c7', 'e5dcd3', 'e1beaa', 'd2ab9c']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['4c646e', '7795a0', 'd5c5b5', 'cd9272', 'b5735b']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['35464d', '536770', '948a7e', '8f674e', '7e5040']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['f4d4ae', 'e2b1b7', 'caabbb', 'a39fad', '959ead']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['efb97b', 'ce7d86', 'a4728b', '695f77', '4d5d76']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['a78256', '90575e', '725061', '4a4353', '354151']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['ed9daa', 'f0bdc6', 'f3d6db', 'f3d6db', '72b4b3']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['e25973', 'e790a0', 'ebbcc4', '64b5ae', '158382']
  },
  {
    name: 'Proposition mr Ruiz V03',
    hex: ['9d3f51', 'a2646f', 'a4838a', '477e79', '0f5b5b']
  }
];

const select = document.getElementById('colors');
baseColor.forEach((color, index) => {
  const option = document.createElement('option');
  option.text = `n°${index + 1} (${color.name})`;
  option.value = index;
  select.add(option);
});

select.addEventListener('change', (event) => {
  colors = baseColor[event.target.value].hex.map((color, index) => {
    return {
      threshold: index ? Math.pow(10, index) : 0,
      hex: '#' + color
    };
  });
  map.remove();
  map = createMap();
});

let colors = baseColor[select.value].hex.map((color, index) => {
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
    window.fetch('custom.geo.json').then(response => response.json()),
    window.fetch('countries.json').then(response => response.json())
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
