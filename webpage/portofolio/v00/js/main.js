$(document).ready(() => {
    const openIcon = $("#open-icon");
    const closeIcon = $("#close-icon");
    const dropdown = $(".dropdown-menu");

    openIcon.css('display', 'block')
    var fun = () => {
        openIcon.toggle()
        closeIcon.toggle()
        dropdown.toggle(200)
    };
    openIcon.click(fun)
    closeIcon.click(fun)

});