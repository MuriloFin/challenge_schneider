document.addEventListener('DOMContentLoaded', () => {
    const voteControls = document.querySelectorAll('.idea__upvote');

    voteControls.forEach(voteControl => {
        const up = voteControl.querySelector('.upvote__up');
        const count = voteControl.querySelector('.upvote__count');
        const down = voteControl.querySelector('.upvote__down');

        const filled = 'ph-fill';

        up.addEventListener('click', () => {
            if (down.classList.contains(filled)) {
                count.textContent = parseInt(count.textContent) + 2;
                up.classList.add(filled);
                down.classList.remove(filled);
                return;
            }

            if (up.classList.contains(filled)) {
                count.textContent = parseInt(count.textContent) - 1;
                up.classList.remove(filled);
                return;
            }

            count.textContent = parseInt(count.textContent) + 1;
            up.classList.add(filled);
        })

        down.addEventListener('click', () => {
            if (up.classList.contains(filled)) {
                count.textContent = parseInt(count.textContent) - 2;
                down.classList.add(filled);
                up.classList.remove(filled);
                return;
            }

            if (down.classList.contains(filled)) {
                count.textContent = parseInt(count.textContent) + 1;
                down.classList.remove(filled);
                return;
            }

            count.textContent = parseInt(count.textContent) - 1;
            down.classList.add(filled);
        })
    })
})