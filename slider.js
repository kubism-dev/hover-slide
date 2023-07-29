class Slider {
	constructor(selector) {
		console.log(selector);
		this.slider =
			selector instanceof Element ? selector : document.querySelector(selector);
		this.class =
			selector instanceof Element
				? selector.classList[0]
				: selector.replace('.', '');
		this.images = [...this.slider.children];
		this.isDragging = false;
		this.startPos = 0;
		this.currentTranslate = 0;
		this.prevTranslate = 0;
		this.currentIndex = 0;

		this.init();
	}

	init = () => {
		this.slider.classList.add('is-init');

		if (window.matchMedia('(pointer: fine)').matches) {
			this.slider.addEventListener('mousemove', (e) => this.handleMouseMove(e));
			this.slider.classList.add(`${this.class}--hover`);
		} else {
			this.handleTouchStart();
			window.addEventListener('resize', () => this.setPositionByIndex());
			this.slider.classList.add(`${this.class}--touch`);
			this.slider.parentElement.classList.add(`${this.class}-wrap--touch`);
		}
	};

	handleMouseMove = (e) => {
		const x = e.offsetX;
		const sliderWidth = this.slider.offsetWidth;
		const percentage = x / sliderWidth;
		const index = Math.floor(percentage * this.images.length);

		if (index > this.images.length - 1) return;

		this.images.forEach((image) => (image.style.zIndex = 0));
		this.images[index].style.zIndex = 1;
	};

	handleTouchStart = () => {
		this.images.forEach((slide, index) => {
			const slideImage = slide.querySelector('img');
			slideImage.addEventListener('dragstart', (e) => e.preventDefault());

			slide.addEventListener('pointerdown', (event) =>
				this.handlePointerDown(event, index)
			);
			slide.addEventListener('pointerup', () => this.handlePointerUp());
			slide.addEventListener('pointerleave', () => this.handlePointerUp());
			slide.addEventListener('pointermove', (event) =>
				this.handlePointerMove(event)
			);
		});
	};

	handlePointerDown = (event, index) => {
		this.currentIndex = index;
		this.startPos = event.clientX;
		this.isDragging = true;
		this.animationID = requestAnimationFrame(() => this.animation());
		this.slider.classList.add('is-touched');
	};

	handlePointerMove = (event) => {
		if (this.isDragging) {
			const currentPosition = event.clientX;
			this.currentTranslate =
				this.prevTranslate + currentPosition - this.startPos;
		}
	};

	handlePointerUp = () => {
		cancelAnimationFrame(this.animationID);
		this.isDragging = false;
		const movedBy = this.currentTranslate - this.prevTranslate;

		if (movedBy < -100 && this.currentIndex < this.images.length - 1)
			this.currentIndex += 1;

		if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1;

		this.setPositionByIndex();
		this.slider.classList.remove('is-touched');
	};

	animation = () => {
		this.setSliderPosition();
		if (this.isDragging) requestAnimationFrame(() => this.animation());
	};

	setPositionByIndex = () => {
		this.currentTranslate = this.currentIndex * -this.slider.offsetWidth;
		this.prevTranslate = this.currentTranslate;
		this.setSliderPosition();
	};

	setSliderPosition = () => {
		this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
	};
}
