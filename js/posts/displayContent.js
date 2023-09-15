document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.idea__control');

    controls.forEach(control => {
        const more = control.querySelector('.control__more');
        const less = control.querySelector('.control__less');

        more.addEventListener('click', (e) => {
            const card = findRootCard(e.target);

            if (!card) {
                return null;
            }

            card.setAttribute('active', '');
        })

        less.addEventListener('click', (e) => {
            const card = findRootCard(e.target);

            if (!card) {
                return null;
            }

            card.removeAttribute('active');
        })
    })

    function findRootCard(e) {
        const parent = e.parentElement;
        if (parent.classList.contains('brainstorm__ideas')) {
            return e;
        }

        if (!parent) {
            return null;
        }

        return findRootCard(parent);
    }
})