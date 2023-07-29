document.addEventListener('DOMContentLoaded', function () {
	// Multiple sliders
	document.querySelectorAll('.c-slider').forEach(function (slideItem, index) {
		new Slider(slideItem);
	});

	// Single slider
	// const slider = new Slider('.c-slider');
});
