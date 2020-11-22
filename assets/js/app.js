
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function screenSaver(el) {
    let status = true,
        delay = 10000, // 10 seconds
        timeout = false,
        images = el.querySelectorAll('img');

    images.forEach(image => image.addEventListener('animationend', (e) => activeImage(image)));

    // Random image display function
    let activeImage = (image) => {
        if (status) {
            let elRect = el.getBoundingClientRect(),
                w = elRect.width * 0.3, // 30% of the screen size
                imageSizeIntervalW = {
                    from: w * 0.5, // Random from 15 percent
                    to: w
                },
                imageSizeIntervalPos = {
                    x: [0],
                    y: [0]
                };

            // choose inactive pictures
            let notActiveImages = el.querySelectorAll('img:not(.active)');
            let selectedImage = notActiveImages[getRandom(0, notActiveImages.length - 1)];
            let rect = selectedImage.getBoundingClientRect();
            let coef = rect.width / rect.height;

            // placement on the screen
            let randImageSizeIntervalW = getRandom(imageSizeIntervalW.from, imageSizeIntervalW.to);
            let randImageSizeIntervalH = randImageSizeIntervalW / coef;
            imageSizeIntervalPos.x.push(elRect.width - randImageSizeIntervalW);
            imageSizeIntervalPos.y.push(elRect.height - randImageSizeIntervalH);

            selectedImage.style.top = getRandom(imageSizeIntervalPos.y[0], imageSizeIntervalPos.y[1]) + 'px';
            selectedImage.style.left = getRandom(imageSizeIntervalPos.x[0], imageSizeIntervalPos.x[1]) + 'px';

            selectedImage.style.width = randImageSizeIntervalW + 'px';

            selectedImage.classList.add('active');
        }

        // clean inactive image
        if (image) cleanImage(image);
    };

    let cleanImage = (image) => {
        image.classList.remove('active');
        image.style.width = null;
        image.style.top = null;
        image.style.left = null;
    };

    let clearRect = () => {
        el.querySelectorAll('img.active').forEach(el => {
            cleanImage(el);
        });
        el.classList.remove('show');
    }

    let onScreenEvent = (e) => {
        status = false;
        if (!status) clearRect();

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            status = true;
            el.classList.add('show');
            setTimeout(() => activeImage(), 1000);
        }, delay)
    }

    window.addEventListener('pointermove', onScreenEvent);
    window.addEventListener('keyup', onScreenEvent);
    window.addEventListener('whell', onScreenEvent);
    window.addEventListener('click', onScreenEvent);

    onScreenEvent();
}

let screenSaverEl = document.querySelector('.screen_saver');
if (screenSaverEl) screenSaver(screenSaverEl);


