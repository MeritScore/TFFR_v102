const { PdfReader } = require('pdfreader');
let fullText = '';
new PdfReader().parseFileItems(process.argv[2], (err, item) => {
    if (err) console.error(err);
    else if (!item) console.log(fullText);
    else if (item.text) {
        fullText += item.text + ' ';
        if (fullText.length > 500 && fullText.endsWith(' ')) {
            console.log(fullText);
            fullText = '';
        }
    }
});
