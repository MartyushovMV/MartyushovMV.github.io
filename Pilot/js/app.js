if (document.querySelector('#gallery-single')) {
  lightGallery(document.getElementById('gallery-single'), {
    selector: '.sg-item',
  });
};

function videoEnded(video) {
  /*video.removeAttribute("autoplay");

  if(window.matchMedia('(max-width: 499px)').matches) {
    video.setAttribute("poster", "https://pilot.spmi.ru/sites/default/files/newimages/banner_499.png");
  } else if (window.matchMedia('(min-width: 500px) and (max-width: 768px)').matches) {
    video.setAttribute("poster", "https://pilot.spmi.ru/sites/default/files/newimages/banner_768.png");
  } else if (window.matchMedia('(min-width: 769px) and (max-width: 1023px)').matches) {
    video.setAttribute("poster", "https://pilot.spmi.ru/sites/default/files/newimages/banner_1024.png");
  }

  video.load();*/

  let poster = '<picture><source media="(max-width: 499px)" srcset="https://pilot.spmi.ru/sites/default/files/newimages/banner_499.png"><source media="(max-width: 768px)" srcset="https://pilot.spmi.ru/sites/default/files/newimages/banner_768.png"><source media="(max-width: 1024px)" srcset="https://pilot.spmi.ru/sites/default/files/newimages/banner_1024.png"><img src="https://pilot.spmi.ru/sites/default/files/newimages/banner.png"></picture>';
  document.getElementById('background-video').outerHTML = poster;

};

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.table-case').forEach( (el) => {

    el.addEventListener('click', () => {

      //document.querySelector('.left_page').classList.toggle('is-hidden');
      //document.querySelector('.right_page').classList.toggle('is-12');
      document.querySelector('.table-section-wrapper').classList.toggle('is-gapless');
      document.querySelector('.table-section').classList.toggle('is-12');

    });

  })
});

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      //el.classList.toggle('is-active');
      $target.classList.toggle('sidebar-menu_opened');

    });
  });

});

document.addEventListener( 'click', function( evt ) {

  let openedMenu = document.querySelector( '.sidebar-menu_offcanvas' );
  let menuIcon = document.querySelector( '.navbar-burger' );
  if (!openedMenu.contains(evt.target) && !menuIcon.contains(evt.target) ) {
    if (openedMenu.classList.contains('sidebar-menu_opened')) {
      openedMenu.classList.remove('sidebar-menu_opened');
    }
  }

});


document.querySelectorAll('.accordion').forEach((item) =>

  item.addEventListener('click', () => {

    let acco = item.nextElementSibling;

    acco.classList.toggle('accordion-active');

    item.classList.toggle('is-active');

  })
);


if (document.querySelector('.back-to-top-button')) {
  let scrollBtn = document.querySelector(".back-to-top-button");

  scrollBtn.addEventListener("click", () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });
};

/* NOT(!) header slyder*/



if (document.querySelector('#header-slider')){
  function navigation(slider) {
    let wrapper, dots, arrowLeft, arrowRight, pager, totalPage,
      curentPage, linePage

    function markup(remove) {
      wrapperMarkup(remove)
      dotMarkup(remove)
      arrowMarkup(remove)
      pagerMarkup(remove)
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
      arrowLeft = createDiv("arrow arrow--left is-hidden-mobile")
      arrowLeft.addEventListener("click", () => slider.prev())
      arrowRight = createDiv("arrow arrow--right is-hidden-mobile")
      arrowRight.addEventListener("click", () => slider.next())

      wrapper.appendChild(arrowLeft)
      wrapper.appendChild(arrowRight)
    }

    function pagerMarkup(remove) {
      if (remove) {
        removeElement(pager)
        return
      }

      pager = createDiv("slider-pagination is-flex is-hidden-mobile")
      totalPage = createDiv("total--page")
      totalPage.innerHTML = slider.slides.length;
      linePage = createDiv("line--page")
      curentPage = createDiv("current--page")
      linePage.innerHTML = "/";
      curentPage.innerHTML = 1;


      pager.appendChild(curentPage)
      pager.appendChild(linePage)
      pager.appendChild(totalPage)
      wrapper.appendChild(pager)
    }


    function wrapperMarkup(remove) {
      if (remove) {
        var parent = wrapper.parentNode
        while (wrapper.firstChild)
          parent.insertBefore(wrapper.firstChild, wrapper)
        removeElement(wrapper)
        return
      }
      wrapper = createDiv("navigation-wrapper is-multiline")
      slider.container.parentNode.appendChild(wrapper)
      wrapper.appendChild(slider.container)
    }

    function dotMarkup(remove) {
      if (remove) {
        removeElement(dots)
        return
      }
      dots = createDiv("dots is-hidden-tablet")
      slider.track.details.slides.forEach((_e, idx) => {
        var dot = createDiv("dot")
        dot.addEventListener("click", () => slider.moveToIdx(idx))
        dots.appendChild(dot)
      })
      wrapper.appendChild(dots)
    }

    function updateClasses() {
      var slide = slider.track.details.rel
      slide === 0
        ? arrowLeft.classList.add("arrow--disabled")
        : arrowLeft.classList.remove("arrow--disabled")
      slide === slider.track.details.slides.length - 1
        ? arrowRight.classList.add("arrow--disabled")
        : arrowRight.classList.remove("arrow--disabled")
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
      console.log(2)
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



  document.querySelector('#header-slider').style.width = document.querySelector('.slide').offsetWidth + 'px';

  var slider = new KeenSlider("#header-slider", {
    loop: true,
    created: () => {
      // console.log('created')
      document.querySelector('.preload-image').classList.add('is-hidden');

      document.querySelector('#header-slider').removeAttribute('style');

    },
    slideChanged: slider => {
      // do something
      //console.log(slider.slides.length);
      //console.log(slider.track.details.rel);
      //document.querySelector('.slider-pagination .current--page').remove();
      document.querySelector('.slider-pagination .current--page').innerHTML = slider.track.details.rel + 1;
    },
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


/********slyders metod**********/

function navigation(sliderMetod) {
  let wrapper, dots, arrowLeft, arrowRight

  function markup(remove) {
    wrapperMarkup(remove)
    dotMarkup(remove)
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
    arrowLeft.addEventListener("click", () => sliderMetod.prev())
    arrowRight = createDiv("arrow arrow--right")
    arrowRight.addEventListener("click", () => sliderMetod.next())

    wrapper.appendChild(arrowLeft)
    wrapper.appendChild(arrowRight)
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
    sliderMetod.container.parentNode.appendChild(wrapper)
    wrapper.appendChild(sliderMetod.container)
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots)
      return
    }
    dots = createDiv("dots")
    sliderMetod.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot")
      dot.addEventListener("click", () => sliderMetod.moveToIdx(idx))
      dots.appendChild(dot)
    })
    wrapper.appendChild(dots)
  }

  function updateClasses() {
    var slide = sliderMetod.track.details.rel
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled")
    slide === sliderMetod.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled")
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }

  sliderMetod.on("created", () => {
    markup()
    updateClasses()
  })
  sliderMetod.on("optionsChanged", () => {
    console.log(2)
    markup(true)
    markup()
    updateClasses()
  })
  sliderMetod.on("slideChanged", () => {
    updateClasses()
  })
  sliderMetod.on("destroyed", () => {
    markup(true)
  })
}

if (typeof (document.querySelector("#slydermetod1")) != 'undefined' && document.querySelector("#slydermetod1") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod1 = new KeenSlider("#slydermetod1", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod1")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod1")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 3, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 3, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}

if (typeof (document.querySelector("#slydermetod2")) != 'undefined' && document.querySelector("#slydermetod2") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod2 = new KeenSlider("#slydermetod2", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod2")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod2")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 2, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}

if (typeof (document.querySelector("#slydermetod3")) != 'undefined' && document.querySelector("#slydermetod3") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod3 = new KeenSlider("#slydermetod3", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod3")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod3")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 3, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 3, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}

if (typeof (document.querySelector("#slydermetod4")) != 'undefined' && document.querySelector("#slydermetod4") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod4 = new KeenSlider("#slydermetod4", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod4")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod4")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 2, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}

if (typeof (document.querySelector("#slydermetod5")) != 'undefined' && document.querySelector("#slydermetod5") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod5 = new KeenSlider("#slydermetod5", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod5")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod5")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 3, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 3, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}

if (typeof (document.querySelector("#slydermetod6")) != 'undefined' && document.querySelector("#slydermetod6") != null) {

  document.addEventListener('DOMContentLoaded', function () {

  var sliderMetod6 = new KeenSlider("#slydermetod6", {
  loop: true,
    created: function (instance) {
          document
            .getElementById("arrow-left-slyder-metod6")
           .addEventListener("click", function () {
             instance.prev();
            });

          document
           .getElementById("arrow-right-slyder-metod6")
           .addEventListener("click", function () {
             instance.next();
             });
        },

    breakpoints: {
           "(max-width: 768px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 769px) and (max-width: 1023px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1024px) and (max-width: 1215px)": {
                slides: { perView: 1, spacing: 10 },
              },
            "(min-width: 1216px) and (max-width: 1407px)": {
                slides: { perView: 2, spacing: 10 },
              },
            "(min-width: 1408px)": {
                slides: { perView: 2, spacing: 10 },
              },
          },
          slides: { perView: 1 },
  }, [navigation])
    });

}
