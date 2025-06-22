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

    let currentPopup = null;

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
        currentPopup = null;
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
      popupClose.style.cssText = 'mask-image: url(./images/close.svg)';
      popupClose.onclick = () => {
        currentPopup = null;
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

      const popupElementTextTitle = document.createElement('p');
      popupElementTextTitle.classList.add('balloon__title');
      popupElementTextTitle.textContent = 'Флагманская площадка Тверской площади';
      popupContentElement.appendChild(popupElementTextTitle);

      const popupElementTextDescr = document.createElement('div');
      popupElementTextDescr.classList.add('balloon__description');
      popupElementTextDescr.textContent = 'Наша флагманская площадка всегда рада приветствовать жителей и гостей столицы. Ждём Вас ежедневно на Тверской площади. Заходите к нам на чай!';
      popupContentElement.appendChild(popupElementTextDescr);

      const popupElementBorderBlock = document.createElement('div');
      popupElementBorderBlock.classList.add('balloon__border-block');

      const popupElementBorderBlockItem = document.createElement('div');
      popupElementBorderBlockItem.classList.add('balloon__border-block-item');

      const popupElementBorderBlockItemIcon = document.createElement('div');
      popupElementBorderBlockItemIcon.classList.add('balloon__border-block-item-icon');
      popupElementBorderBlockItemIcon.style.cssText = 'mask-image: url(./images/location.svg)';
      popupElementBorderBlockItem.appendChild(popupElementBorderBlockItemIcon);

      const popupElementBorderBlockItemTitle = document.createElement('div');
      popupElementBorderBlockItemTitle.classList.add('balloon__border-block-item-title');
      popupElementBorderBlockItemTitle.textContent = 'Тверская ул., 8, корп. 1, стр. 4';
      popupElementBorderBlockItem.appendChild(popupElementBorderBlockItemTitle);

      popupElementBorderBlock.appendChild(popupElementBorderBlockItem);
      popupContentElement.appendChild(popupElementBorderBlock);

      const popupElementWorkingHours = document.createElement('div');
      popupElementWorkingHours.classList.add('balloon__working-hours');

      const popupElementWorkingHoursTitle = document.createElement('div');
      popupElementWorkingHoursTitle.classList.add('balloon__working-hours-title');
      popupElementWorkingHoursTitle.textContent = 'Режим работы:';
      popupElementWorkingHours.appendChild(popupElementWorkingHoursTitle);

      const popupElementWorkingHoursDescr = document.createElement('div');
      popupElementWorkingHoursDescr.classList.add('balloon__working-hours-description');
      popupElementWorkingHoursDescr.textContent = 'Пн-Пт - 12:00-22:00, Сб,Вс - 10:00-22:00';
      popupElementWorkingHours.appendChild(popupElementWorkingHoursDescr);

      popupContentElement.appendChild(popupElementWorkingHours);

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
      size: 'normal',
      onClick() {
        if (currentPopup !== popupWithImage) {
          if (currentPopup !== null) {
            currentPopup.update({popup: {show: false}});
          }
          currentPopup = popupWithImage;
          popupWithImage.update({popup: {show: true}});
          let bounds;
          map.update({
            location: {
              center: [38.090814, 55.609800],
              zoom: 10,
              bounds,
              duration: 400
            }
          });
        } else {
          currentPopup.update({popup: {show: false}});
          currentPopup = null;
        }
      },
      popup: {content: PopupWithImage, position: 'top'}
    });

    popup2 = new YMapDefaultMarker({
      iconName: 'cafe',
      coordinates: [37.610524, 55.762051],
      size: 'normal',
      onClick() {
        if (currentPopup !== popup2) {
          if (currentPopup !== null) {
            currentPopup.update({popup: {show: false}});
          }
          currentPopup = popup2;
          popup2.update({popup: {show: true}});
          let bounds;
          map.update({
            location: {
              center: [37.610524, 55.762051],
              zoom: 10,
              bounds,
              duration: 400
            }
          });
        } else {
          currentPopup.update({popup: {show: false}});
          currentPopup = null;
        }
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
