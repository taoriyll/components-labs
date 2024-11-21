const fs = require('fs');

function countWordInFile(filePath, targetWord) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

        stream.on('data', chunk => {
            const words = chunk.split(/\s+/);
            count += words.filter(word => word === targetWord).length;
            // console.log(words);
        });

        stream.on('end', () => {
            resolve(count);
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
}

const filePath = 'js-book-dummy.txt';
// const filePath = 'task4-dummy.txt';
const targetWord = 'example';

countWordInFile(filePath, targetWord)
    .then(count => {
        console.log("Task4:");
        console.log(`Word "${targetWord}" found ${count} times.`);
    })
    .catch(error => console.error('Error:', error));
