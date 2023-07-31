# Barebones Hover & Touch Slider

Desktop => Change image depending on Mouse Position on X axis.

Touch => Swipe.

[Demo](https://kubism-dev.github.io/hover-slide/)

```javascript
		new Slider(selector, {
			lazyload: true,
            threshold: 1.00
		});
```

```html
        <div class="c-slider-wrap" role="group" aria-label="Slider Gallery">
            <div class="c-slider">
                <div class="c-slider__item">
                    <img data-src="img/01.jpg" alt="image alt" class="is-lazy" />
                </div>
                <div class="c-slider__item">
                    <img data-src="img/01.jpg" alt="image alt" class="is-lazy" />
                </div>
            </div>
        </div>
```