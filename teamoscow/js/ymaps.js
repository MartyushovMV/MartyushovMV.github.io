initMap();

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls} = ymaps3;

    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
      '@yandex/ymaps3-default-ui-theme@latest'
    ]);

    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const {YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    let popupWithImage = null;
    let popup2 = null;

    // Create a custom popup
    const PopupWithImage = () => {
      const popupElement = document.createElement('div');
      popupElement.classList.add('popup');

      const imageElement = document.createElement('img');
      imageElement.src = './images/waves.png';
      imageElement.alt = 'waves';
      imageElement.classList.add('balloon__image');

      const popupContentElement = document.createElement('div');
      popupContentElement.classList.add('popup__content');

      const popupElementText = document.createElement('div');
      popupElementText.classList.add('popup__text');

      const popupElementTextTitle = document.createElement('div');
      popupElementTextTitle.classList.add('popup__text_title');
      popupElementTextTitle.textContent = 'Title of that pop up';
      popupElementText.appendChild(popupElementTextTitle);

      const popupElementTextContent = document.createElement('div');
      popupElementTextContent.classList.add('popup__text_content');
      popupElementTextContent.textContent =
        'Some useful information about a place. You can add whatever you want: pictures, buttons, different headings.';
      popupElementText.appendChild(popupElementTextContent);

      const buttonElement = document.createElement('button');
      buttonElement.onclick = () => {
        popupWithImage.update({
          popup: {
            show: false
          }
        });
      };
      buttonElement.classList.add('button');
      buttonElement.textContent = 'Close';

      popupContentElement.appendChild(imageElement);
      popupContentElement.appendChild(popupElementText);

      popupElement.appendChild(popupContentElement);
      popupElement.appendChild(buttonElement);

      return popupElement;
    };

    // Create a custom popup
    const Popup2 = () => {
      const popupElement = document.createElement('div');
      popupElement.classList.add('balloon');

      const popupClose = document.createElement('div');
      popupClose.classList.add('balloon__close');
      popupClose.style.cssText = 'mask-image: url(./images/close.svg);';
      popupClose.onclick = () => {
        popup2.update({
          popup: {
            show: false
          }
        });
      };

      const imageElement = document.createElement('img');
      imageElement.src = './images/Tverskaya.png';
      imageElement.alt = 'Tverskaya';
      imageElement.classList.add('balloon__image');

      const popupContentElement = document.createElement('div');
      popupContentElement.classList.add('balloon__content');

      const popupElementTextTitle = document.createElement('div');
      popupElementTextTitle.classList.add('popup__text_title');
      popupElementTextTitle.textContent = 'Флагманская площадка Тверской площади';
      popupContentElement.appendChild(popupElementTextTitle);

      popupElement.appendChild(popupClose);
      popupElement.appendChild(imageElement);
      popupElement.appendChild(popupContentElement);

      return popupElement;
    };

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

    popupWithImage = new YMapDefaultMarker({
      iconName: 'cafe',
      coordinates: [38.090814, 55.608317],
      onClick() {
        popupWithImage.update({popup: {show: true}});
      },
      popup: {content: PopupWithImage, position: 'top'}
    });

    popup2 = new YMapDefaultMarker({
      iconName: 'cafe',
      coordinates: [37.610524, 55.762051],
      onClick() {
        popup2.update({popup: {show: true}});
      },
      popup: {content: Popup2, position: 'top'}
    });

    map
      .addChild(popupWithImage)
      .addChild(popup2);

    const controls = new YMapControls({position: 'right'});
    controls.addChild(new YMapZoomControl({}));
    controls.addChild(new YMapGeolocationControl());
    map.addChild(controls);

}
