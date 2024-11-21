// Task 1

// const arr = ["application", "banana", "cola", "apex", "offset"]; //ap
const arr = ["dog", "topex", "cola", "operator", "offset"]; // ope
const checkLetters = "ope";

async function asyncFilter(array, letters) {
    const results = [];

    for (let item of array) {
        if (await isThere(item, letters)) {
            results.push(item);
        }
    }
    return results;
}

// async function isThere(word, letters) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const hasLetters = [...letters].every(letter => word.includes(letter));
//             resolve(hasLetters);
//         }, 1000); 
//     });
// }

asyncFilter(arr, checkLetters).then(res => console.log("Task1:", res)); 
