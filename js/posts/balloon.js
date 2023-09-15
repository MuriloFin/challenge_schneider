document.addEventListener('DOMContentLoaded', () => {
    const translate = {
        positive: '100%',
        negative: '-100%'
    }

    const gap = '12px';

    const paddingHorizontal = '1.2rem';
    const paddingVertical = '.6rem';

    const balloons = document.querySelectorAll('.balloon');

    balloons.forEach(balloon => {
        const action = balloon.querySelector('.action');
        const reaction = balloon.querySelector('.reaction');

        const { left, top } = reaction.getBoundingClientRect();

        let translateLeft = null;
        let translateTop = null;

        let gapLeft = null;
        let gapTop = null;

        if (left > window.innerWidth / 2) {
            translateLeft = `calc(${translate.negative} - ${paddingHorizontal})`;
            gapLeft = `-${gap}`;
        } else {
            translateLeft = `calc(${translate.positive} + ${paddingHorizontal})`;
            gapLeft = `${gap}`;
        }

        if (top > window.innerHeight / 2) {
            translateTop = `calc(${translate.negative} - ${paddingVertical})`;
            gapTop = `-${gap}`;
        } else {
            translateTop = `calc(${translate.positive} + ${paddingVertical})`;
            gapTop = `${gap}`;
        }

        reaction.style.setProperty('--left', translateLeft);
        reaction.style.setProperty('--top', translateTop);
        reaction.style.setProperty('--translate-left', translateLeft);
        reaction.style.setProperty('--translate-top', translateTop);
        reaction.style.setProperty('--gap-left', gapLeft);
        reaction.style.setProperty('--gap-top', gapTop);

        let timeout = null;

        action.addEventListener('mouseenter', () => {
            timeout = setTimeout(() => {
                reaction.setAttribute('display', '')
            }, 700)
        })

        action.addEventListener('mouseleave', () => {
            clearTimeout(timeout)
            reaction.removeAttribute('display')
        })
    })
})
