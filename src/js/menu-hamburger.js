const menu_hamburgerBtn = document.getElementById('menu-btn');
const header = document.getElementById('header');

if(menu_hamburgerBtn){
    menu_hamburgerBtn.addEventListener('click', () => {

        header.classList.toggle('is-expanded');

    });
}
