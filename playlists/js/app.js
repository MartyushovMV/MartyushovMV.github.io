const AUDIOS = [...document.querySelectorAll('.playlist a')];
const PLAYER = document.querySelector('#player');
const SOURCE = PLAYER.querySelector('source');
const LENGTH = AUDIOS.length;

function initPlaylist() {

  let current = 0;
  let link = '';

  AUDIOS.forEach((audio) => {
    audio.addEventListener('click', (e) => {
      e.preventDefault();
      link = audio.getAttribute('href');
      let index = audio.getAttribute('tabindex');
      if (index == current) {
        if (PLAYER.paused) {
          PLAYER.play();
        } else {
          PLAYER.pause();
        }
      } else {
        current = index;
        SOURCE.setAttribute("src", link);
        PLAYER.load();
        PLAYER.play();
      }
    })
  })

  PLAYER.addEventListener('ended', () => {
    current++;
    if (current == LENGTH) {
      current = 0;
      link = AUDIOS[0].getAttribute('href');
      SOURCE.setAttribute("src", link);
      PLAYER.load();
    } else {
      link = AUDIOS[current].getAttribute('href');
      SOURCE.setAttribute("src", link);
      PLAYER.load();
      PLAYER.play();
    }
  })

  PLAYER.addEventListener('pause', () => {
    if (!PLAYER.ended) {
      let status_bar = AUDIOS[current].querySelector('.play_status');
      status_bar.classList.add("playing");
    }
  })

  PLAYER.addEventListener('play', () => {
    let playlist = document.querySelector('.playlist');
    if (playlist.querySelector('.playing')) {
      let paused_track = playlist.querySelector('.playing');
      paused_track.classList.remove("playing");
    }
  });

}

initPlaylist();
