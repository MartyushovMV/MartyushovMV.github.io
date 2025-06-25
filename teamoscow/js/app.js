document.addEventListener('DOMContentLoaded', () => {

  const navbarBurger = document.querySelector('.nav-burger');

  navbarBurger.addEventListener('click', () => {
    const target_id = navbarBurger.dataset.target;
    const target = document.getElementById(target_id);
    navbarBurger.classList.toggle('is-active');
    target.classList.toggle('is-active');
  });

});


document.addEventListener('DOMContentLoaded', () => {

  const footerToggles = document.querySelectorAll('.footer-column-name');

  footerToggles.forEach( el => {
    el.addEventListener('click', () => {
      el.parentNode.classList.toggle('is-active');
    });
  });

});
  



function videoEnded(video) {
  let poster_1 = '<picture><img src="./images/seasonal_pattern.svg"></picture>';
  document.getElementById('background-video').outerHTML = poster_1;
};

function videoFinished(video) {
  let poster_2 = '<picture><img src="./images/pearl.svg"></picture>';
  document.getElementById('animated-video').outerHTML = poster_2;
};




if (document.querySelector('#partners-slider')) {
  function navigation(slider) {
    let arrowLeft, arrowRight, arrowsWrapper

    function markup(remove) {
      arrowMarkup(remove)
    }

    function removeElement(elment) {
      elment.parentNode.removeChild(elment)
    }

    function createDiv(className) {
      var div = document.createElement("div")
      var classNames = className.split(" ")
      classNames.forEach((name) => div.classList.add(name))
      return div
    }

    function arrowMarkup(remove) {
      if (remove) {
        removeElement(arrowLeft)
        removeElement(arrowRight)
        removeElement(arrowsWrapper)
        return
      }
      arrowLeft = createDiv("arrow arrow--left")
      arrowLeft.addEventListener("click", () => slider.prev())
      arrowRight = createDiv("arrow arrow--right")
      arrowRight.addEventListener("click", () => slider.next())

      arrowsWrapper = createDiv("arrows-wrapper")

      arrowsWrapper.appendChild(arrowLeft)
      arrowsWrapper.appendChild(arrowRight)

      let partnersHeader = document.querySelector('.partners-section-header')

      partnersHeader.appendChild(arrowsWrapper)
    }

    function updateClasses() {
      var slide = slider.track.details.rel
    }

    slider.on("created", () => {
      markup()
      updateClasses()
    })
    slider.on("optionsChanged", () => {
      markup(true)
      markup()
      updateClasses()
    })
    slider.on("slideChanged", () => {
      updateClasses()
    })
    slider.on("destroyed", () => {
      markup(true)
    })
  }

  var slider_new = new KeenSlider("#partners-slider", {
    breakpoints: {
      "(min-width: 769px)": {
        drag: false,
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1440px)": {
        drag: false,
        slides: { perView: 3, spacing: 40 },
      },
    },
    loop: true,
    mode: "free-snap",
    drag: true,
    slides: { perView: 2, spacing: 19 },
  }, [navigation])

}


if (document.querySelector('#favorites-slider')) {
  function navigation(slider) {
    let arrowLeft, arrowRight, arrowsWrapper

    function markup(remove) {
      arrowMarkup(remove)
    }

    function removeElement(elment) {
      elment.parentNode.removeChild(elment)
    }

    function createDiv(className) {
      var div = document.createElement("div")
      var classNames = className.split(" ")
      classNames.forEach((name) => div.classList.add(name))
      return div
    }

    function arrowMarkup(remove) {
      if (remove) {
        removeElement(arrowLeft)
        removeElement(arrowRight)
        return
      }
      arrowLeft = createDiv("arrow arrow--left")
      arrowLeft.addEventListener("click", () => slider.prev())
      arrowRight = createDiv("arrow arrow--right")
      arrowRight.addEventListener("click", () => slider.next())

      arrowsWrapper = createDiv("arrows-wrapper")

      arrowsWrapper.appendChild(arrowLeft)
      arrowsWrapper.appendChild(arrowRight)

      let favsHeader = document.querySelector('.favorite-products-header')

      favsHeader.appendChild(arrowsWrapper)
    }

    function updateClasses() {
      var slide = slider.track.details.rel
      slide === 0
        ? arrowLeft.classList.add("arrow--disabled")
        : arrowLeft.classList.remove("arrow--disabled")
      slide === slider.track.details.slides.length - 1
        ? arrowRight.classList.add("arrow--disabled")
        : arrowRight.classList.remove("arrow--disabled")
    }

    slider.on("created", () => {
      markup()
      updateClasses()
    })
    slider.on("optionsChanged", () => {
      markup(true)
      markup()
      updateClasses()
    })
    slider.on("slideChanged", () => {
      updateClasses()
    })
    slider.on("destroyed", () => {
      markup(true)
    })
  }

  var slider_new = new KeenSlider("#favorites-slider", {
    breakpoints: {
      "(min-width: 769px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
      "(min-width: 1440px)": {
        slides: { perView: 4, spacing: 40 },
      },
    },
    loop: true,
    mode: "free-snap",
    drag: false,
    slides: { perView: 2, spacing: 20 },
  }, [navigation])

}

