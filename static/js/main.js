// Mobile navigation toggle.
// Pairs with .site-nav in layouts/partials/header.html and the small-screen
// rules in static/css/mobile.css. Without JS the nav list simply stays visible.
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.site-nav');
    var button = nav && nav.querySelector('.site-nav__toggle');
    if (!button) {
        return;
    }

    function setOpen(open) {
        nav.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
    }

    button.addEventListener('click', function () {
        setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            button.focus();
        }
    });
});
