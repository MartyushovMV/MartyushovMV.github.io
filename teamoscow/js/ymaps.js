initMap();

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapControl, YMapComplexEntity} = ymaps3;

    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
      '@yandex/ymaps3-default-ui-theme@0.0.19'
    ]);

    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const {YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    const map = new YMap(
      document.getElementById('map'),
      {
        location: {
          center: [37.623082, 55.75254],
          zoom: 10
        }
      },
      [
        new YMapDefaultSchemeLayer({}),
        new YMapDefaultFeaturesLayer({})
      ]
    );

    const controls = new YMapControls({position: 'right'});
    controls.addChild(new YMapZoomControl({}));
    controls.addChild(new YMapGeolocationControl());
    map.addChild(controls);

      function fullScreenBtnHandler() {
          if (document.fullscreenElement) {
              document.exitFullscreen();
          } else {
              map.container.requestFullscreen();
          }
      }

          class FullscreenButton extends YMapComplexEntity<{}> {
              private _element: HTMLButtonElement;

              private _detachDom: () => void;

              _createElement() {
                  const fullScreenButtonElement = document.createElement('button');
                  fullScreenButtonElement.type = 'button';
                  fullScreenButtonElement.onclick = fullScreenBtnHandler;
                  fullScreenButtonElement.classList.add('button', 'fullscreen');

                  document.addEventListener('fullscreenchange', function () {
                      fullScreenButtonElement.classList.toggle('exit-fullscreen');
                  });

                  return fullScreenButtonElement;
              }

              _onAttach() {
                  this._element = this._createElement();
                  this._detachDom = ymaps3.useDomContext(this, this._element, this._element);
              }

              _onDetach() {
                  this._detachDom();
                  this._detachDom = null;
                  this._element = null;
              }
          }

          const fullScreenBtn = new YMapControl();
          fullScreenBtn.addChild(new FullscreenButton({}));

          controls.addChild(fullScreenBtn);

}
