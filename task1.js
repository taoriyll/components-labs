// Task 1

const arr = ["application", "banana", "cola", "apex", "offset"]; //ap
const arr1 = ["dog", "topex", "cola", "operator", "offset"]; // ope
const checkLetters = "ap";
const checkLetters1 = "ope";
// змінити виклик
function asyncFilter(array, check, callback) {
    const results = new Array(array.length).fill(null);
    let processed = 0;
    let ifError = false;

    array.forEach((item, index) => {
        check(item, (err, success) => {
            if(ifError) return;
            if (err) {
                callback(err);
                ifError = true;
                return;
            }

            if (success) {
                results[index] = item;
            }

            processed++;
            if (processed === array.length) {
                // Filter out nulls before returning
                callback(null, results.filter(Boolean));
            }
        });
    });
}

function isThere(word, letters, callback) {
    setTimeout(() => {
        try {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            callback(null, hasLetters); 
        } catch (error) {
            callback(error);
        }
    }, 1000);
}

asyncFilter(arr, (item, callback) => isThere(item, checkLetters, callback), (err, res) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Task1:", res);
    }
});
asyncFilter(arr1, (item, callback) => isThere(item, checkLetters, callback), (err, res) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Task1:", res);
    }
});
