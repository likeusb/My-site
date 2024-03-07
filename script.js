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

var nav = document.querySelector('nav');
var doorDiv = document.querySelector('.door');
var startX = 0;
var endX = 0;

document.addEventListener('DOMContentLoaded', function() {
    if (nav && doorDiv) {
        doorDiv.addEventListener('click', function(event) {
            nav.classList.toggle('open');
            event.stopPropagation();
        });

        document.body.addEventListener('click', function(event) {
            if (!doorDiv.contains(event.target)) {
                nav.classList.remove('open');
            }
        });

        document.body.addEventListener('touchstart', function(event) {
            startX = event.touches[0].clientX;
        });

        document.body.addEventListener('touchmove', function(event) {
            endX = event.touches[0].clientX;
        });

        document.body.addEventListener('touchend', function(event) {
            // Check if the target of the event is the .door div or a descendant of it
            if (!doorDiv.contains(event.target)) {
                // Check if a swipe from left to right occurred
                if (endX - startX > 100 && startX < 50) {
                    nav.classList.add('open');
                }
                // Check if a swipe from right to left occurred
                else if (startX - endX > 100 && startX < 200) {
                    nav.classList.remove('open');
                }
            }
        });
    }
});