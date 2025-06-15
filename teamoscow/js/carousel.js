'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'next'];
    this.carouselData = [
      {
        'id': '1',
        'src': '',
      },
      {
        'id': '2',
        'src': '',
      },
      {
        'id': '3',
        'src': '',
      },
      {
        'id': '4',
        'src': '',
      },
      {
        'id': '5',
        'src': '',
      },
      {
        'id': '6',
        'src': '',
      }
    ];
    this.carouselInView = [1, 2, 3, 4, 5, 6];
    this.carouselContainer;
  }

  mounted() {
    this.setupCarousel();
  }

  // Build carousel html
  setupCarousel() {

    const control_left = document.createElement('button');

    const carousel_area = document.createElement('div');

    const control_right = document.createElement('button');

    this.el.append(control_left, carousel_area, control_right);

    carousel_area.className = 'categories-slider';

    const container = document.createElement('div');

    // Add container for carousel items and controls
    carousel_area.append(container);
    container.className = 'carousel-container';
    //controls.className = 'carousel-controls';

    // Take dataset array and append items to container
    this.carouselData.forEach((item, index) => {
      const carouselItem = item.src ? document.createElement('img') : document.createElement('div');
      switch (index) {
        case 0:
          let itemLnk0 = document.createElement('a');
          let itemImg0 = document.createElement('img');
          itemLnk0.append(itemImg0);
          itemImg0.src = 'image_39.jpg';
          itemImg0.setAttribute('loading', 'eager');
          let imgName0 = document.createElement('div');
          itemLnk0.append(imgName0);
          imgName0.className = 'category-title';
          imgName0.textContent = 'Посуда';
          carouselItem.append(itemLnk0);
          itemLnk0.href = "#dishes";
          container.append(carouselItem);
          break;
        case 1:
          let itemLnk1 = document.createElement('a');
          let itemImg1 = document.createElement('img');
          itemLnk1.append(itemImg1);
          itemImg1.src = 'image_36.jpg';
          itemImg1.setAttribute('loading', 'eager');
          let imgName1 = document.createElement('div');
          itemLnk1.append(imgName1);
          imgName1.className = 'category-title';
          imgName1.textContent = 'Варенье';
          carouselItem.append(itemLnk1);
          itemLnk1.href = "#jam";
          container.append(carouselItem);
          break;
        case 2:
          let itemLnk2 = document.createElement('a');
          let itemImg2 = document.createElement('img');
          itemLnk2.append(itemImg2);
          itemImg2.src = 'image_38.jpg';
          itemImg2.setAttribute('loading', 'eager');
          let imgName2 = document.createElement('div');
          itemLnk2.append(imgName2);
          imgName2.className = 'category-title';
          imgName2.textContent = 'Чай';
          carouselItem.append(itemLnk2);
          itemLnk2.href = "#tea";
          container.append(carouselItem);
          break;
        case 3:
          let itemLnk3 = document.createElement('a');
          let itemImg3 = document.createElement('img');
          itemLnk3.append(itemImg3);
          itemImg3.src = 'image_37.jpg';
          itemImg3.setAttribute('loading', 'eager');
          let imgName3 = document.createElement('div');
          itemLnk3.append(imgName3);
          imgName3.className = 'category-title';
          imgName3.textContent = 'Мёд';
          carouselItem.append(itemLnk3);
          itemLnk3.href = "#honey";
          container.append(carouselItem);
          break;
        case 4:
          let itemLnk4 = document.createElement('a');
          let itemImg4 = document.createElement('img');
          itemLnk4.append(itemImg4);
          itemImg4.src = 'image_40.jpg';
          itemImg4.setAttribute('loading', 'eager');
          let imgName4 = document.createElement('div');
          itemLnk4.append(imgName4);
          imgName4.className = 'category-title';
          imgName4.textContent = 'Сладости';
          carouselItem.append(itemLnk4);
          itemLnk4.href = "#sweets";
          container.append(carouselItem);
          break;
        case 5:
          let itemLnk4 = document.createElement('a');
          let itemImg4 = document.createElement('img');
          itemLnk4.append(itemImg4);
          itemImg4.src = 'image_41.jpg';
          itemImg4.setAttribute('loading', 'eager');
          let imgName4 = document.createElement('div');
          itemLnk4.append(imgName4);
          imgName4.className = 'category-title';
          imgName4.textContent = 'Травяные сборы';
          carouselItem.append(itemLnk4);
          itemLnk4.href = "#herbals";
          container.append(carouselItem);
          break;
      }
      
      // Add item attributes
      carouselItem.className = `carousels-item carousel-item-${index + 1}`;

      //carouselItem.src = item.src;
      //carouselItem.setAttribute('loading', 'eager');

      // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    control_left.className = 'coverflow-control coverflow-control-previous';
    control_right.className = 'coverflow-control coverflow-control-next';

    control_left.setAttribute('data-name', 'previous');
    control_right.setAttribute('data-name', 'next');

    this.setControls([control_left,control_right]);

    /*this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');

      // Add accessibilty spans to button
      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      // Add button attributes
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);

      // Add carousel control options
      controls.append(btn);
    });

    // After rendering carousel to our DOM, setup carousel controls' event listeners
    this.setControls([...controls.children]);*/

    // Set container property
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        // Manage control actions, update our carousel data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.unshift(this.carouselData.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.carouselInView.push(this.carouselInView.shift());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousels-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.push(this.carouselData.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.carouselInView.unshift(this.carouselInView.pop());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousels-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }


}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.categories-slider-wrapper');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
