// Task 2
const arr = ["traitor", "banana", "predator", "apex", "offset"];
const arr1 = ["creator", "banana", "apex", "offset"];
const checkLetters = "or";

// Promise-based asyncFilter function. All asynchronous operations (isThere calls) are initiated simultaneously using map
function asyncFilterPromise(array, letters) {
    const results = new Array(array.length).fill(null);

    const promises = array.map((item, index) => {
        return isThere(item, letters).then(hasLetters => {
            if (hasLetters) results[index] = item; // Store item by its index
        });
    });

    return Promise.all(promises).then(() => results.filter(item => item !== null)); // Filter out null values
}

let i = 0;

function isThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1500 - 100 * i);
        i++;
    });
}

// Async/await based asyncFilter. Each asynchronous operation (isThere call) is initiated only after the previous one completes.
async function asyncFilterAwait(array, letters) {
    const results = new Array(array.length).fill(null);

    for (let index = 0; index < array.length; index++) {
        const hasLetters = await isThere(array[index], letters);
        if (hasLetters) results[index] = array[index];
    }

    return results.filter(item => item !== null);
}

asyncFilterPromise(arr, checkLetters)
    .then(result => {
        console.log("Task2:");
        console.log("Promise result:", result);
    })
    .catch(error => console.error("Error:", error));

asyncFilterAwait(arr1, checkLetters)
    .then(result => {
        console.log("Async/await result:", result);
    })
    .catch(error => console.error("Error:", error));
