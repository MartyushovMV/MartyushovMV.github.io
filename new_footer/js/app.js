document.addEventListener('DOMContentLoaded', () => {

  const footerToggle = document.querySelector('.footer-useful-links');
  const hiddenMenu = document.querySelector('.footer-hidden-menu');

    footerToggle.addEventListener('click', (event) => {

      let target_menu = hiddenMenu;

      if (target_menu === event.target) {
        return;
      } else {
        footerToggle.classList.toggle('is-expanded');
        target_menu.classList.toggle('show');
      }

    })

    hiddenMenu.addEventListener('click', (el) => {
      el.stopPropagation();
    })

});

if (document.querySelector('#mainpage-slider')) {
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
      wrapper = document.querySelector(".navigation-wrapper")
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
      dotsPlace = document.querySelector('.mainpage-banner-section')
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
  var slider = new KeenSlider("#mainpage-slider", {
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
