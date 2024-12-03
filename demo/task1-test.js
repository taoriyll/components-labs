const arr = ["dog", "topex", "cola", "operator", "offset"]; 
const arr1 = ["application", "banana", "cola", "apex", "offset"]; //ap

const checkLetters = "ope";
const checkLetters1 = "ap";

function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

function asyncFilterWithDebounce(array, letters, callback) {
    const debouncedCallback = debounce(callback, 2000); // Add 2-second delay
    asyncFilter(array, letters, debouncedCallback);
}

// Timestamp Logger
function logWithTimestamp(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

//asyncFilter tests
asyncFilterWithDebounce(arr, checkLetters, (err, res) => {
    if (err) {
        logWithTimestamp(`Error: ${err}`);
    } else {
        logWithTimestamp(`Result: ${res}`);
    }
});
asyncFilterWithDebounce(arr1, checkLetters1, (err, res) => {
    if (err) {
        logWithTimestamp(`Error: ${err}`);
    } else {
        logWithTimestamp(`Result: ${res}`);
    }
});

function isThere(word, letters, callback) {
    setTimeout(() => {
        const hasLetters = [...letters].every(letter => word.includes(letter));
        logWithTimestamp(`Checked word: ${word}`);
        callback(null, hasLetters);
    }, 1000);
}

function asyncFilter(array, letters, callback) {
    const res = [];
    let processed = 0;

    array.forEach(item => {
        isThere(item, letters, (err, hasLetters) => {
            if (err) {
                callback(err);
                return;
            }

            if (hasLetters) {
                res.push(item);
            }

            processed++;
            if (processed === array.length) {
                callback(null, res);
            }
        });
    });
}
