/**
 * /script/update-readme.md
 * @description script to update README.md
 * @author John Kindem
 * @version v1.0
 */

// config object
const config = {
    // script dev mode
    devMode: true,

    // README.md source file path
    readmePath: '../README.md',
    // introduction source file path
    introductionPath: './introduction.md',
    // post dir path
    postDirPath: '../post',

    // some regex
    regex: {
        number: /^[1-9]\d*$/
    }
};

// import modules
const fs = require('fs');

/**
 * get meta info by line
 * @param {string} line line string
 * @returns {string} meta info string
 */
function getMetaInfoByLine(line) {
    const tokens = line.split(' ');
    let result = '';
    tokens.forEach((token, index) => { if (index > 0) { result += index === tokens.length - 1 ? token : `${token} `; } });
    return result;
};

/**
 * main function
 */
(function() {
    // read introduction.md
    let introduction = fs.readFileSync(config.introductionPath).toString();

    // read post dir
    let files = fs.readdirSync(config.postDirPath);
    // if name is not match regex 'number', remove it
    let postNames = [];
    files.forEach((file) => { if (file.match(config.regex.number)) { return postNames.push(file); } });
    // sort by number order
    postNames.sort((a, b) => {
        const numberA = parseInt(a, 10);
        const numberB = parseInt(b, 10);
        return numberA - numberB;
    });

    // for every post name, ready its meta info
    let postMetaInfos = [];
    postNames.forEach((postName) => {
        // read file
        let content = fs.readFileSync(`${config.postDirPath}/${postName}`).toString();
        let lines = content.split('\n');

        // return meta info object
        return postMetaInfos.push({
            key: getMetaInfoByLine(lines[1]),
            title: getMetaInfoByLine(lines[2]),
            date: getMetaInfoByLine(lines[3]),
            labels: getMetaInfoByLine(lines[4]).split(' ')
        });
    });

    // TODO
})();