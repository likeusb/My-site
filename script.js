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
            // downscroll code
            document.querySelector('.PNContainer').style.transform = 'translateY(-100%)'; // adjust this value
        } else {
            // upscroll code
            document.querySelector('.PNContainer').style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
});

// Define nav and doorDiv in the global scope
var nav = document.querySelector('nav');
var doorDiv = document.querySelector('.door');

document.addEventListener('DOMContentLoaded', function() {
    if (nav && doorDiv) {
        // Add a click event listener to the .door div to open/close the nav
        doorDiv.addEventListener('click', function(event) {
            console.log('doorDiv click event triggered');
            nav.classList.toggle('open');
            event.stopPropagation();
        });

        // Add a click event listener to the body to close the nav
        document.body.addEventListener('click', function() {
            console.log('body click event triggered');
            nav.classList.remove('open');
        });

        // Add a touchstart event listener to the .door div to open/close the nav
        doorDiv.addEventListener('touchstart', function(event) {
            console.log('doorDiv touchstart event triggered');
            nav.classList.toggle('open');
            event.preventDefault();
            event.stopPropagation();
        });

        // Add a touchstart event listener to the body to close the nav
        document.body.addEventListener('touchstart', function() {
            console.log('body touchstart event triggered');
            nav.classList.remove('open');
        });
    } else {
        console.log('Could not find nav element or .door div');
    }
});