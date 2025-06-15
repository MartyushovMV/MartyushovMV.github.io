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
    let popupWithButtons = null;

    // Create a custom popup
    const PopupWithImage = () => {
      const popupElement = document.createElement('div');
      popupElement.classList.add('popup');

      const imageElement = document.createElement('img');
      imageElement.src = '../waves.png';
      imageElement.alt = 'waves';
      imageElement.classList.add('image');

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
    const PopupWithButtons = () => {
      const popupElement = document.createElement('div');
      popupElement.classList.add('popup', 'second_variant');

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

      const popupButtonsElement = document.createElement('div');
      popupButtonsElement.classList.add('popup__buttons');

      const popupButtonsBlockElement = document.createElement('div');
      popupButtonsBlockElement.classList.add('popup__buttons__block');

      const buttonElementFirst = document.createElement('button');
      buttonElementFirst.classList.add('button');
      buttonElementFirst.textContent = 'Button 1';
      buttonElementFirst.onclick = () => {
        alert('Clicked!');
      };

      const buttonElementSecond = document.createElement('button');
      buttonElementSecond.classList.add('button');
      buttonElementSecond.textContent = 'Button 2';
      buttonElementSecond.onclick = () => {
        alert('Clicked!');
      };

      popupButtonsBlockElement.appendChild(buttonElementFirst);
      popupButtonsBlockElement.appendChild(buttonElementSecond);

      const buttonElement = document.createElement('button');
      buttonElement.classList.add('button_close');
      buttonElement.textContent = 'Primary Button';
      buttonElement.onclick = () => {
        alert('Clicked!');
      };

      const closeIconElement = document.createElement('button');
      closeIconElement.classList.add('close_icon');
      closeIconElement.onclick = () => {
        popupWithButtons.update({
          popup: {
            show: false
          }
        });
      };

      popupButtonsElement.appendChild(popupButtonsBlockElement);
      popupButtonsElement.appendChild(buttonElement);

      popupElement.appendChild(popupElementText);
      popupElement.appendChild(popupButtonsElement);
      popupElement.appendChild(closeIconElement);

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
      iconName: 'waterpark',
      coordinates: [38.090814, 55.608317],
      onClick() {
        popupWithImage.update({popup: {show: true}});
      },
      popup: {content: PopupWithImage, position: 'right'}
    });

    popupWithButtons = new YMapDefaultMarker({
      iconName: 'restaurant',
      coordinates: [37.610524, 55.762051],
      onClick() {
        popupWithButtons.update({popup: {show: true}});
      },
      popup: {content: PopupWithButtons, position: 'right'}
    });

    map
      .addChild(popupWithImage)
      .addChild(popupWithButtons);

    const controls = new YMapControls({position: 'right'});
    controls.addChild(new YMapZoomControl({}));
    controls.addChild(new YMapGeolocationControl());
    map.addChild(controls);

}
