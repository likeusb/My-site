(function() {
    var theme = localStorage.getItem('theme');
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
})();

document.querySelector('.ThemeToggle').addEventListener('click', function() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', (event) => {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 0){
            document.querySelector('.PNContainer').style.transform = 'translateY(-100%)';
        } else {
            document.querySelector('.PNContainer').style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
});

document.addEventListener('DOMContentLoaded', function() {
    var nav = document.querySelector('nav');
    var doorDiv = document.querySelector('.door');

    var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

    if (isTouchDevice) {
        doorDiv.addEventListener('touchstart', navtoggle);
    } else {
        doorDiv.addEventListener('click', navtoggle);
    }

    document.body.addEventListener('click', function() {
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            nav.classList.add('close');
        }
    });

    function navtoggle(event) {
        event.preventDefault();
        event.stopPropagation();

        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            nav.classList.add('close');
        } else {
            nav.classList.remove('close');
            nav.classList.add('open');
        }

        setTimeout(function() {
            void nav.offsetHeight;
        }, 0);
    }
});