const exec = require('child_process').exec;

let lettersToNumbers = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
    а: 1, б: 2, в: 3, г: 4, д: 5, е: 6, ё: 7, ж: 8, з: 9,
    и: 1, й: 2, к: 3, л: 4, м: 5, н: 6, о: 7, п: 8, р: 9,
    с: 1, т: 2, у: 3, ф: 4, х: 5, ц: 6, ч: 7, ш: 8, щ: 9,
    ъ: 1, ы: 2, ь: 3, э: 4, ю: 5, я: 6
};

let busyPorts = [5432, 3306, 6379];

// Getting ports used in the system only for  Ubuntu
if (process.platform === 'linux') {
    getBusyPorts(textToPort);
} else {
    textToPort();
}

/**
 * Getting ports used in the system
 * This function tested only for Ubuntu
 * @param {Function} callback Function for transform text to port number
 */
function getBusyPorts(callback) {
    let bashCommand = 'netstat -ntulp';
    exec(bashCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error:`, error);
            return;
        }

        if (stderr !== 'null') {
            console.error(`stderr:`, stderr);
        }

        let pattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:(\d+)|:::(\d+)/gim;
        let matches;
        while ((matches = pattern.exec(stdout)) !== null) {
            let port = parseInt(matches[1] || matches[2], 10);
            if (!busyPorts.includes(port)) {
                busyPorts.push(port);
            }
        }

        callback();
    });
}

/**
 * Generate port number from text
 * If not gotten sourceText, then port will be output on console
 * @param {String} sourceText Text for port generation
 * @returns {*} Port number if gotten sourceText
 */
function textToPort(sourceText = '') {
    let numbersArr = [];
    let port = null;

    let text = sourceText || process.argv[2].split('=')[1];
    if (!text) {
        return port;
    }

    let letters = text.split('');

    letters.forEach(letter => {
        if (lettersToNumbers[letter]) {
            numbersArr.push(lettersToNumbers[letter]);
        }
    });

    if (numbersArr.length >= 5) {
        numbersArr[0] = (numbersArr[0] > 6) ? 6 : numbersArr[0];
        numbersArr = numbersArr.slice(0, 5);
    }

    port = parseInt(numbersArr.join(''), 10);
    while (busyPorts.includes(port) || port > 65536) {
        port -= 1;
    }

    if (!sourceText) {
        console.log(`Port for text '${text}' is ${port}`);
        return true;
    }

    return port;
}

module.exports = textToPort;
