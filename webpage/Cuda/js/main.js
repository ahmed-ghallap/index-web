const menuIcon = $(".menu-icon");
const menu= $(".menu");

menuIcon.click(() => {
    menuIcon.toggleClass('close');
    menu.toggle(300)
});