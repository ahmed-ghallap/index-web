const menuIcon = $(".menu-icon");
const menu= $(".menu");
const values = $('.value')
const prograsses = $(".prograss")

menuIcon.click(() => {
    menuIcon.toggleClass('close');
    menu.toggle(300)
});
const spanHeight = parseInt(values.eq(0).css('height'));

window.addEventListener('scroll', function foo () {
    var windowHeight = window.innerHeight;

    var top = Math.ceil(values.get(0).getBoundingClientRect().top);
    if ((top + spanHeight - windowHeight) <= 0 ) {
    console.log("hello");
        values
        .parents(".prograss")
        .each((index, el) => {
            const v = parseInt($(el).data('value'))
            circleAnimation(el, v)
            window.removeEventListener('scroll', foo)
        })
    }
});

function circleAnimation (el, deg) {
    let count = 0;
    const interval = setInterval(() => {
        $(el).css("background", `conic-gradient(var(--clr) ${Math.floor(count/100*360)}deg, #ededed 0deg)`)
        $(el).children('span').html(count + '<sm>%</sm>')

        count++
        if (count >= deg)
            clearInterval(interval);
    }, 10);
    
}