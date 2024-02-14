let tabList = document.querySelector('.tabs');
let tabButtons = tabList.querySelectorAll('.tab-button');
let contextList = tabList.querySelectorAll('.tabpanel');

let onButton = (event) => {
    contextList.forEach(panel => panel.hidden = true);

    tabButtons.forEach(btn => btn.setAttribute( 'aria-selected', false));

    event.currentTarget.setAttribute('aria-selected', true);

    const { id } = event.currentTarget;

    contextList.forEach((panel) => {
        panel.hidden = panel.getAttribute('aria-labelledby') == id ? false : true;
    });
}

tabButtons.forEach((btn) => btn.addEventListener('click', onButton));