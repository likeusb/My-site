function base32ToHex(base32) {
    const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";

    for (let i = 0; i < base32.length; i++) {
        const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += val.toString(2).padStart(5, '0');
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
        const chunk = bits.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16);
    }

    return hex;
}

function generateTOTP(secret) {
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = Math.floor(epoch / 30).toString(16).padStart(16, '0');

    const shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(base32ToHex(secret), "HEX");
    shaObj.update(time);
    const hmac = shaObj.getHMAC("HEX");

    const offset = parseInt(hmac.substring(hmac.length - 1), 16);
    const otp = (parseInt(hmac.substr(offset * 2, 8), 16) & 0x7fffffff) + '';
    return otp.substr(otp.length - 6, 6);
}

function updateTOTP() {
    const secret = 'JBSWY3DPM5TGQ2TENZVGMZLTMZSHG23G';
    const totp = generateTOTP(secret);
    document.getElementById('totp-display').innerText = `Current TOTP value: ${totp}`;
}

function scheduleTOTPUpdate() {
    updateTOTP();
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const timeUntilNext30Sec = 30000 - (epoch % 30) * 1000;
    setTimeout(() => {
        updateTOTP();
        setInterval(updateTOTP, 30000);
    }, timeUntilNext30Sec);
}

// Initial call to schedule the TOTP updates
scheduleTOTPUpdate();