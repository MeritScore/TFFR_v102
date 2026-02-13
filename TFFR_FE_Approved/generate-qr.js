import QRCode from 'qrcode';

const url = 'https://thefunfanreporter.com/';
const outputPath = 'public/qr-code.png';

QRCode.toFile(outputPath, url, {
    color: {
        dark: '#39ff14',  // Cyberpunk Green
        light: '#050505'  // Cyberpunk Black
    },
    width: 512,
    margin: 2
}, function (err) {
    if (err) throw err;
    console.log(`QR code generated at ${outputPath}`);
});
