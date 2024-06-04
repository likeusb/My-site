// Get the input field and SVG element
var inputField = document.querySelector('.NavbarSearch input');
var svgElement = document.querySelector('.NavbarSearch svg');

// Store the original SVG and the new SVG
var originalSvg = svgElement.outerHTML;
var newSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
<path d="M 10 2 C 5.5935666 2 2 5.5935666 2 10 C 2 14.406433 5.5935666 18 10 18 C 12.023929 18 13.871701 17.237039 15.283203 15.990234 L 16 16.707031 L 16 18 L 20 22 L 22 20 L 18 16 L 16.707031 16 L 15.990234 15.283203 C 17.237039 13.871701 18 12.023929 18 10 C 18 5.5935666 14.406433 2 10 2 z M 10 4 C 13.325553 4 16 6.6744469 16 10 C 16 13.325553 13.325553 16 10 16 C 6.6744469 16 4 13.325553 4 10 C 4 6.6744469 6.6744469 4 10 4 z M 8.2070312 6.7929688 L 6.7929688 8.2070312 L 8.5859375 10 L 6.7929688 11.792969 L 8.2070312 13.207031 L 10 11.414062 L 11.792969 13.207031 L 13.207031 11.792969 L 11.414062 10 L 13.207031 8.2070312 L 11.792969 6.7929688 L 10 8.5859375 L 8.2070312 6.7929688 z"></path>
</svg>`; // Replace this with your new SVG

// Listen for the input event
inputField.addEventListener('input', function() {
    if (inputField.value !== '') {
        // If the input field is not empty, replace the SVG
        svgElement.outerHTML = newSvg;
    } else {
        // If the input field is empty, replace it back with the original SVG
        svgElement.outerHTML = originalSvg;
    }
    // Reselect the SVG element
    svgElement = document.querySelector('.NavbarSearch svg');
});