var map = mapbox.map('map');
var layers = document.getElementById('map-ui');

// Layer loading from an ID is asynchronous so we provide map.interaction.auto
// as the callback for once loading is complete to enabled interaction.
map.addLayer(mapbox.layer().composite(false).id('moasth.map-6zbgfb0l', map.interaction.auto));
map.addLayer(mapbox.layer().composite(false).id('moasth.chateaux4', map.interaction.auto));
// map.centerzoom(center, zoom [, animate])
map.centerzoom({lat: 48.583, lon: 7.750, }, 8);
map.setZoomRange(8, 16);

  // Create a layer switcher that toggles layers exclusively.
  for (var i = 0; i < map.getLayers().length; i++) {
      var n = map.getLayerAt(i).name;
      var item = document.createElement('li');
      var layer = document.createElement('a');
          layer.href = '#';
          layer.id = n;
          layer.innerHTML = 'Layer ' + (i + 1);

      if (i === 0) {
          layer.className = 'active';
          map.getLayerAt(i).enable();
      } else {
          map.getLayerAt(i).disable();
      }

      layer.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          // Disable layers and clear active class out from any layer links.
          for (var j = 0; j < map.getLayers().length; j++) {
              map.getLayerAt(j).disable();
              layers.childNodes[j].childNodes[0].className = '';
          }
          // Set this layer to active.
          this.className = 'active';
          map.getLayer(this.id).enable();
          map.interaction.refresh();
      };
      item.appendChild(layer);
      layers.appendChild(item);
  }