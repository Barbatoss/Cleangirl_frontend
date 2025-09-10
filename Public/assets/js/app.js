// <!-- ============== HEARTFELT CLEANING SWIPER SLIDER ============== -->

var swiper = new Swiper('.mySwiper', {
  spaceBetween: 16,
  slidesPerView: 3.85,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.next_arrow',
    prevEl: '.prev_arrow',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3.6,
    },
  },
});

// <!-- ============= VIDEO SCRIPT =========== -->

const videoContainers = document.querySelectorAll('.video-container');
videoContainers.forEach((container) => {
  const video = container.querySelector('.video');
  const circlePlayButton = container.querySelector('.circle-play-b');
  function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }
  circlePlayButton.addEventListener('click', togglePlay);
  video.addEventListener('playing', function () {
    circlePlayButton.style.opacity = 0;
    circlePlayButton.style.pointerEvents = 'none';
  });
  video.addEventListener('pause', function () {
    circlePlayButton.style.opacity = 1;
    circlePlayButton.style.pointerEvents = 'all';
  });
});

// <!-- ----------------------------------Clean Girl Supporters counter------------------------->
document.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter');
  const target = parseInt(counter.getAttribute('data-target'));

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const animateCount = (element, start, end, duration) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(
        progress * (end - start) + start
      ).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const onScroll = () => {
    if (isElementInViewport(counter)) {
      window.removeEventListener('scroll', onScroll);
      animateCount(counter, 0, target, 3000);
    }
  };

  window.addEventListener('scroll', onScroll);
});
