const observerOne = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    let i = 0;
    let j = 0;
    let k = 0;
    let l = 0;
    let m = 0;

    let txt_1 = 'В мае 2023 года Президент РФ Владимир Путин подписал указ ';
    let txt_1_1 = '«О некоторых вопросах совершенствования системы высшего образования»';
    let txt_1_2 = ', целью которого является качественное улучшение процесса подготовки кадров для обеспечения долгосрочных потребностей различных отраслей отечественной экономики.';
    let txt_2 = 'Одна из наиболее актуальных задач сегодняшнего дня заключается в том, чтобы обеспечить ускоренный технологический прогресс нашего минерально-сырьевого комплекса - станового хребта любой суверенной державы. Реальный производственный сектор нуждается не в бакалаврах и магистрах, а в молодых инженерах, которые уже на стадии окончания «альма-матер» будут обладать необходимым для работы набором знаний, навыков и дополнительных компетенций.';
    let txt_3 = 'Владимир Литвиненко';

    let speed = 3;
    let link_tag = '<a id="doc_link" href="https://spmi.ru/sites/default/files/imci_images/metodologia/2023-12/0001202305120005.pdf"></a>'

    function typeWriterFifth() {
      if (m < txt_3.length) {
        document.getElementById("txt_3").innerHTML += txt_3.charAt(m);
        m++;
        setTimeout(typeWriterFifth, speed);
      }
    }

    function typeWriterForth() {
      if (l < txt_2.length) {
        document.getElementById("txt_2").innerHTML += txt_2.charAt(l);
        l++;
        setTimeout(typeWriterForth, speed);
      } else {
        typeWriterFifth();
      }
    }

    function typeWriterThird() {
      if (k < txt_1_2.length) {
        document.getElementById("txt_1").innerHTML += txt_1_2.charAt(k);
        k++;
        setTimeout(typeWriterThird, speed);
      } else {
        typeWriterForth();
      }
    }

    function typeWriterSecond() {
      if (j < txt_1_1.length) {
        document.getElementById("doc_link").innerHTML += txt_1_1.charAt(j);
        j++;
        setTimeout(typeWriterSecond, speed);
      } else {
        typeWriterThird();
      }
    }

    function typeWriterFirst() {
      if (i < txt_1.length) {
        document.getElementById("txt_1").innerHTML += txt_1.charAt(i);
        i++;
        setTimeout(typeWriterFirst, speed);
      } else {
        document.getElementById("txt_1").innerHTML += link_tag;
        typeWriterSecond();
      }
    }

    let starter = document.getElementById("txt_1").innerText.length;

    if (starter == 0) {
      typeWriterFirst();
    }

  });
});
observerOne.observe(document.querySelector('.quote-column'));


const observerTpd = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.children[0].classList.add('typed');
    }
  });
});

let targetTitle = '.section-title';
document.querySelectorAll(targetTitle).forEach((i) => {
  if (i) {
    observerTpd.observe(i);
  }
});

let targetButton = '.attachment-title';
document.querySelectorAll(targetButton).forEach((i) => {
  if (i) {
    observerTpd.observe(i);
  }
});


const observerFst = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.classList.add('active', 'custom');
    }
  });
});

observerFst.observe(document.querySelector('.quote_left'));
observerFst.observe(document.querySelector('.quote_right'));

const observerTwo = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.classList.add('text_animation_for_children');
    }
  });
});
observerTwo.observe(document.querySelector('.quote-column'));


const observerSix = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.children[0].classList.add('active', 'custom');
    }
  });
});

let targetImg = '.masked-image-block';
document.querySelectorAll(targetImg).forEach((i) => {
  if (i) {
    observerSix.observe(i);
  }
});

/*let targetTitle = '.section-title';
document.querySelectorAll(targetTitle).forEach((i) => {
  if (i) {
    observerSix.observe(i);
  }
});*/

/*let targetLink = '.attachment-title';
document.querySelectorAll(targetLink).forEach((i) => {
  if (i) {
    observerSix.observe(i);
  }
});*/

let targetIcon = '.download-icon';
document.querySelectorAll(targetIcon).forEach((i) => {
  if (i) {
    observerSix.observe(i);
  }
});

const observerSeven = new IntersectionObserver(entries => {
  // перебор записей
  entries.forEach(entry => {
    // если элемент появился
    if (entry.isIntersecting) {
      // добавить ему CSS-класс
      entry.target.classList.add('active', 'fade-up');
    }
  });
});

let targetSeven = '.faq-question';
document.querySelectorAll(targetSeven).forEach((i) => {
  if (i) {
    observerSeven.observe(i);
  }
});

const transition = document.querySelectorAll(".hoverable-link");

 for (let r = 0; r < transition.length; r++) {
  transition[r].addEventListener("transitionend", function(event) {
    if (event.pseudoElement == '::before') {
      transition[r].classList.add("hover-on");
    }
  });
}
