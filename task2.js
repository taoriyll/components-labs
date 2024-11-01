// Task 2

const arr = ["traitor", "banana", "predator", "apex", "offset"];
const checkLetters = "or";

function asyncFilterPromise(array, letters) {
    const results = [];

    const promises = array.map(item => {
        return isThere(item, letters).then(hasLetters => {
            if (hasLetters) results.push(item);
        });
    });

    return Promise.all(promises).then(() => results); // A bit of parallelism
}

function isThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000);
    });
}

asyncFilterPromise(arr, checkLetters)
    .then(result => {
        console.log("Task 2:");
        console.log("Promise chaining result:", result);
    })
    .catch(error => {
        console.error("Error:", error);
    });

async function asyncFilterAwait() {
    try {
        const result = await asyncFilterPromise(arr, checkLetters);
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
    
asyncFilterAwait();
    

