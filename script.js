if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

document.querySelector('.ThemeToggle').addEventListener('click', function() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
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

// Define isNavOpen, nav and doorDiv in the global scope
var isNavOpen = false;
var nav = document.querySelector('nav');
var doorDiv = document.querySelector('.door');

// Function to open the nav
function openNav() {
    nav.style.transform = 'translateX(0)';
    isNavOpen = true;
}

// Function to close the nav
function closeNav() {
    nav.style.transform = 'translateX(-100%)';
    isNavOpen = false;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if the nav and .door div were found
    if (nav && doorDiv) {
        // Add a mouseenter event listener to the nav to open it
        nav.addEventListener('mouseenter', openNav);

        // Add a mouseleave event listener to the nav to close it
        nav.addEventListener('mouseleave', closeNav);

        // Add a click event listener to the .door div to open/close the nav
        doorDiv.addEventListener('click', function(event) {
            if (isNavOpen) {
                closeNav();
            } else {
                openNav();
            }
            event.stopPropagation();
        });

        // Add a click event listener to the nav to stop event propagation
        nav.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // Add a click event listener to the body to close the nav
        document.body.addEventListener('click', closeNav);
    } else {
        console.log('Could not find nav element or .door div');
    }
});