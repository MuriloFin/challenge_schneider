document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.attribute__icon');

    icons.forEach(icon => {
        const point = icon.querySelector('.attribute__value');
        const value = `${parseInt(point.textContent)}%`;

        icon.style.setProperty('--points', value);
    })
})