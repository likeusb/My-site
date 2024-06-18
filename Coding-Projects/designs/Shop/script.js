const img1 = document.getElementById("imgconv1");
const img2 = document.getElementById("imgconv2");
const img3 = document.getElementById("imgconv3");
const img4 = document.getElementById("imgconv4");



function imageOneCycle () {
    img1.classList.remove("stayLeft");
    img1.classList.add("mRI");
    img4.classList.remove("mRI");
    img4.classList.add("mRO");
    img3.classList.remove("mRO");
    img3.classList.add("stayLeft");
}

function imageTwoCycle () {
    img2.classList.remove("stayLeft");
    img2.classList.add("mRI");
    img1.classList.remove("mRI");
    img1.classList.add("mRO");
    img4.classList.remove("mRO");
    img4.classList.add("stayLeft");
}

function imageThreeCycle () {
    img3.classList.remove("stayLeft");
    img3.classList.add("mRI");
    img2.classList.remove("mRI");
    img2.classList.add("mRO");
    img1.classList.remove("mRO");
    img1.classList.add("stayLeft");
}

function imageFourCycle () {
    img4.classList.remove("stayLeft");
    img4.classList.add("mRI");
    img3.classList.remove("mRI");
    img3.classList.add("mRO");
    img2.classList.remove("mRO");
    img2.classList.add("stayLeft");
}

let cycleIndex = 0;
const cycles = [imageTwoCycle, imageThreeCycle, imageFourCycle, imageOneCycle];

setInterval(() => {
    cycles[cycleIndex]();
    cycleIndex = (cycleIndex + 1) % cycles.length;
}, 3000);