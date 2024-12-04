// Task 1

const arr = ["application", "banana", "cola", "apex", "offset"]; //ap
const arr1 = ["dog", "topex", "cola", "operator", "offset"]; // ope
const checkLetters = "ap";
const checkLetters1 = "ope";

function asyncFilter(array, letters, callback) {
    const results = new Array(array.length).fill(null);
    let processed = 0;

    array.forEach((item, index) => {
        isThere(item, letters, (err, hasLetters) => {
            if (err) {
                callback(err);
                return;
            }

            if (hasLetters) {
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

asyncFilter(arr, checkLetters, (err, res) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Task1:", res);
    }
});
asyncFilter(arr1, checkLetters1, (err, res) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Task1:", res);
    }
});
