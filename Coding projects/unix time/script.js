function updateExamples() {
    var year = parseInt(document.getElementById('year').value);
    var month = parseInt(document.getElementById('month').value);
    var day = parseInt(document.getElementById('day').value);
    var hours = parseInt(document.getElementById('hours').value);
    var minutes = parseInt(document.getElementById('minutes').value);
    var timezone = document.getElementById('timezone').value;

    var date = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00${timezone}`);

    var styleDropdown = document.getElementById('style');
    styleDropdown.options[0].text = `Short Time (${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })})`;
    styleDropdown.options[1].text = `Long Time (${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })})`;
    styleDropdown.options[2].text = `Short Date (${date.toLocaleDateString('en-GB')})`;
    styleDropdown.options[3].text = `Long Date (${date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})`;
    styleDropdown.options[4].text = `Short Date/Time (${date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })})`;
    styleDropdown.options[5].text = `Long Date/Time (${date.toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })})`;
    styleDropdown.options[6].text = `Relative Time (${relativeTime(date)})`;

    var unixTimestamp = Math.floor(date.getTime() / 1000);
    var unixDate = new Date(unixTimestamp * 1000);
    var formattedUnixTimestamp;
    switch (styleDropdown.selectedIndex) {
        case 0: formattedUnixTimestamp = unixDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); break;
        case 1: formattedUnixTimestamp = unixDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); break;
        case 2: formattedUnixTimestamp = unixDate.toLocaleDateString('en-GB'); break;
        case 3: formattedUnixTimestamp = unixDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); break;
        case 4: formattedUnixTimestamp = unixDate.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }); break;
        case 5: formattedUnixTimestamp = unixDate.toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }); break;
        case 6: formattedUnixTimestamp = relativeTime(unixDate); break;
    }
    document.getElementById('unixTimestamp').textContent = formattedUnixTimestamp;
}

function relativeTime(date) {
    var now = new Date();
    var diffInSeconds = Math.floor((date - now) / 1000);

    if (diffInSeconds === 0) {
        return "Now";
    } else if (diffInSeconds < 0) {
        diffInSeconds = Math.abs(diffInSeconds);
        if (diffInSeconds < 60) return `${diffInSeconds} Seconds Ago`;
        var diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes === 1) return "A Minute ago";
        if (diffInMinutes < 60) return `${diffInMinutes} Minutes Ago`;
        var diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours === 1) return "An Hour Ago";
        if (diffInHours < 24) return `${diffInHours} Hours Ago`;
        var diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "A Day Ago";
        if (diffInDays < 7) return `${diffInDays} Days Ago`;
        var diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks === 1) return "A Week Ago";
        if (diffInDays < 30) return `${diffInWeeks} Weeks Ago`;
        var diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths === 1) return "A Month Ago";
        if (diffInMonths < 12) return `${diffInMonths} Months Ago`;
        var diffInYears = Math.floor(diffInMonths / 12);
        if (diffInYears === 1) return "A Year Ago";
        return `${diffInYears} Years Ago`;
    } else {
        if (diffInSeconds < 60) return `In ${diffInSeconds} Seconds`;
        var diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes === 1) return "In a Minute";
        if (diffInMinutes < 60) return `In ${diffInMinutes} Minutes`;
        var diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours === 1) return "In an Hour";
        if (diffInHours < 24) return `In ${diffInHours} Hours`;
        var diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "In a Day";
        if (diffInDays < 7) return `In ${diffInDays} Days`;
        var diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks === 1) return "In a Week";
        if (diffInDays < 30) return `In ${diffInWeeks} Weeks`;
        var diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths === 1) return "In a Month";
        if (diffInMonths < 12) return `In ${diffInMonths} Months`;
        var diffInYears = Math.floor(diffInMonths / 12);
        if (diffInYears === 1) return "In a Year";
        return `In ${diffInYears} Years`;
    }
}

document.getElementById('year').addEventListener('change', updateExamples);
document.getElementById('month').addEventListener('change', updateExamples);
document.getElementById('day').addEventListener('change', updateExamples);
document.getElementById('hours').addEventListener('change', updateExamples);
document.getElementById('minutes').addEventListener('change', updateExamples);
document.getElementById('timezone').addEventListener('change', updateExamples);

setInterval(updateExamples, 1000);

document.getElementById('year').addEventListener('change', updateExamples);
document.getElementById('month').addEventListener('change', updateExamples);
document.getElementById('day').addEventListener('change', updateExamples);
document.getElementById('hours').addEventListener('change', updateExamples);
document.getElementById('minutes').addEventListener('change', updateExamples);
document.getElementById('timezone').addEventListener('change', updateExamples);

// Rest of the JavaScript code

function updateDayDropdown() {
    var year = parseInt(document.getElementById('year').value);
    var month = parseInt(document.getElementById('month').value);
    var dayDropdown = document.getElementById('day');
    var selectedDay = parseInt(dayDropdown.value);
    var daysInMonth = new Date(year, month, 0).getDate();

    dayDropdown.innerHTML = '';
    for (var i = 1; i <= daysInMonth; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        dayDropdown.add(option);
    }

    if (selectedDay && selectedDay <= daysInMonth) {
        dayDropdown.value = selectedDay;
    }
}

document.getElementById('year').addEventListener('change', updateDayDropdown);
document.getElementById('month').addEventListener('change', updateDayDropdown);

document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var year = document.getElementById('year').value;
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var style = document.getElementById('style').value;
    var timezone = document.getElementById('timezone').value;

    var fullDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00${timezone}`);
    var unixTimestamp = fullDate.getTime() / 1000;
    var discordTimestamp = `<t:${unixTimestamp}:${style}>`;

    document.getElementById('result').textContent = discordTimestamp;
});

// JavaScript
document.getElementById('copyButton').addEventListener('click', function() {
    var resultText = document.getElementById('result').textContent;
    var copyButton = document.getElementById('copyButton');
    var hint = document.getElementById('hint'); // Make sure you have an element with id 'hint' in your HTML

    if (resultText) {
        navigator.clipboard.writeText(resultText).then(function() {
            console.log('Copying to clipboard was successful!');
            copyButton.style.backgroundColor = "var(--bg-success)";
            hint.textContent = "Copying to clipboard was successful!";
            setTimeout(function() {
                copyButton.classList.add('transition'); // Add transition class
                copyButton.style.backgroundColor = "var(--bg-primary)"; // Change back to default color after 1 second
            }, 1000);
        }, function(err) {
            console.error('Could not copy text: ', err);
            copyButton.style.backgroundColor = "var(--bg-failure)";
            hint.textContent = "Failed to copy. Check console for details.";
            setTimeout(function() {
                copyButton.classList.add('transition'); // Add transition class
                copyButton.style.backgroundColor = "var(--bg-primary)"; // Change back to default color after 1 second
            }, 1000);
        });
    } else {
        console.log('No result to copy.');
        hint.textContent = "No result to copy.";
    }
});

// Listen for the transition end event to remove the transition class
document.getElementById('copyButton').addEventListener('transitionend', function() {
    this.classList.remove('transition');
});