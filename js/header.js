document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');
    const navStyle = nav.style;

    const minOpacity = .5;

    window.addEventListener('scroll', () => {
        let opacity = minOpacity;

        if (nav.clientHeight > window.scrollY) {
            opacity = 1 - window.scrollY / nav.clientHeight + minOpacity;
        }

        navStyle.setProperty('--opacity', opacity)
    })
})
