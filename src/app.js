function animateButton() {
	anime({
	  targets: '#escapeButton',
	  translateX: () => anime.random(-200, 200),
	  translateY: () => anime.random(-200, 200),
	  easing: 'easeInOutQuad',
	  duration: 1000,
	});
    }
    