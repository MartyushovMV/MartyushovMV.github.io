initMap();

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapControls} = ymaps3;

    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
      '@yandex/ymaps3-default-ui-theme@0.0.19'
    ]);

    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    const map = new YMap(
      document.getElementById('map'),
      {
        location: {
          center: [37.623082, 55.75254],
          zoom: 10
        }
      },
      [new YMapDefaultSchemeLayer({})]
    );

    map.addChild(
      new YMapControls({position: 'right'}).addChild(new YMapZoomControl({}))
    );

}
