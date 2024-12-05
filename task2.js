const arr = ["traitor", "banana", "predator", "apex", "offset"];
const arr1 = ["creator", "banana", "apex", "offset"];
const checkLetters = "or";

function asyncFilterPromise(array, check) {
    const results = new Array(array.length).fill(null);

    const promises = array.map((item, index) => {
        return check(item).then(success => {
            if (success) results[index] = item; // Store item by its index
        });
    });

    return Promise.all(promises).then(() => results.filter(Boolean)); // Filter out null values
}

async function asyncFilterAwait(array, check) {
    const results = new Array(array.length).fill(null);

    for (let index = 0; index < array.length; index++) {
        const success = await check(array[index]);
        if (success) results[index] = array[index];
    }

    return results.filter(Boolean); // Filter out null values
}

let i = 0;

function ifThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const success = [...letters].every(letter => word.includes(letter));
            resolve(success);
        }, 1500 - 100 * i++);
    });
}

asyncFilterPromise(arr, word => ifThere(word, checkLetters))
    .then(result => {
        console.log("Task2:");
        console.log("Promise result:", result);
    })
    .catch(error => console.error("Error:", error));

asyncFilterAwait(arr1, word => ifThere(word, checkLetters))
    .then(result => {
        console.log("Async/await result:", result);
    })
    .catch(error => console.error("Error:", error));
