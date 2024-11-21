// Task 2

const arr = ["traitor", "banana", "predator", "apex", "offset"];
const arr1 = ["creator", "banana", "apex", "offset"];
const checkLetters = "or";

function asyncFilterPromise(array, letters) {
    const results = new Array(array.length).fill(null); //new array()
   
    const promises = array.map(item => {
        return isThere(item, letters).then(hasLetters => {
            if (hasLetters) results.push(item); //index в result, i = res
        });
    });

    return Promise.all(promises).then(() => results); // A bit of parallelism
}

// ==========

let i = 0;

function isThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000 - 100 * i);
        i++;
    });
}

asyncFilterPromise(arr, checkLetters)
    .then(result => {
        console.log("Task2:");
        console.log("Promise result:", result);
    })
    .catch(error => console.error("Error:", error));

async function asyncFilterAwait() {
    try {
        const result = await asyncFilterPromise(arr1, checkLetters);
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
    
asyncFilterAwait();
    

