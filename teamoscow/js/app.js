document.addEventListener('DOMContentLoaded', () => {

  const navbarBurger = document.querySelector('.nav-burger');

  navbarBurger.addEventListener('click', () => {
    const target_id = navbarBurger.dataset.target;
    const target = document.getElementById(target_id);
    navbarBurger.classList.toggle('is-active');
    target.classList.toggle('is-active');
  });

  const ctaButton = document.querySelector('.navbar-cta-button');

  ctaButton.addEventListener('click', () => {
    const target_id = navbarBurger.dataset.target;
    const target = document.getElementById(target_id);
    navbarBurger.classList.remove('is-active');
    target.classList.remove('is-active');
  });

});



function videoEnded(video) {
  let poster_1 = '<picture><img src="./images/flower_pattern.svg"></picture>';
  document.getElementById('middle-video').outerHTML = poster_1;
};

function videoFinished(video) {
  let poster_2 = '<picture><img src="./images/pearl.svg"></picture>';
  document.getElementById('animated-video').outerHTML = poster_2;
};




if (document.querySelector('#partners-slider')) {
  function navigation(slider) {
    let arrowLeft, arrowRight, arrowsWrapper, dots

    function markup(remove) {
      arrowMarkup(remove)
      dotMarkup(remove)
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

    function dotMarkup(remove) {
      if (remove) {
        removeElement(dots)
        return
      }
      dots = createDiv("dots partners-slider-dots")
      slider.track.details.slides.forEach((_e, idx) => {
        var dot = createDiv("dot")
        dot.addEventListener("click", () => slider.moveToIdx(idx))
        dots.appendChild(dot)
      })
      dotsPlace = document.querySelector('.partners-section-content')
      dotsPlace.appendChild(dots)
      //wrapper.appendChild(dots)
    }

    function updateClasses() {
      var slide = slider.track.details.rel
      Array.from(dots.children).forEach(function (dot, idx) {
        idx === slide
          ? dot.classList.add("dot--active")
          : dot.classList.remove("dot--active")
      })
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
        slides: { perView: 1 },
      },
      "(min-width: 1024px)": {
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
    slides: { perView: 1 },
  }, [navigation])

}







if (document.querySelector('#articles-slider')) {
  function navigation(slider) {
    let wrapper, dots

    function markup(remove) {
      wrapperMarkup(remove)
      dotMarkup(remove)
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

    function wrapperMarkup(remove) {
      if (remove) {
        var parent = wrapper.parentNode
        while (wrapper.firstChild)
          parent.insertBefore(wrapper.firstChild, wrapper)
        removeElement(wrapper)
        return
      }
      wrapper = createDiv("navigation-wrapper")
      slider.container.parentNode.appendChild(wrapper)
      wrapper.appendChild(slider.container)
    }

    function dotMarkup(remove) {
      if (remove) {
        removeElement(dots)
        return
      }
      dots = createDiv("dots articles-slider-dots")
      slider.track.details.slides.forEach((_e, idx) => {
        var dot = createDiv("dot")
        dot.addEventListener("click", () => slider.moveToIdx(idx))
        dots.appendChild(dot)
      })
      dotsPlace = document.querySelector('.articles-slider-content')
      dotsPlace.appendChild(dots)
      //wrapper.appendChild(dots)
    }

    function updateClasses() {
      var slide = slider.track.details.rel
      Array.from(dots.children).forEach(function (dot, idx) {
        idx === slide
          ? dot.classList.add("dot--active")
          : dot.classList.remove("dot--active")
      })
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
  var slider = new KeenSlider("#articles-slider", {
    loop: true,
  }, [ (slider) => {
    let timeout
    let mouseOver = false
    function clearNextTimeout() {
      clearTimeout(timeout)
    }
    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, 6000)
    }
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }, navigation])
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
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    loop: true,
    mode: "free-snap",
    drag: false,
    slides: { perView: 4, spacing: 40 },
  }, [navigation])

}

