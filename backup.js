// Task 1 debounce

const arr1 = ["application", "banana", "cola", "apex", "offset"];
const checkLetters = "ope";

async function asyncFilter(array, letters, debounceTime = 500) {
    const results = [];

    for (let item of array) {
        const startTime = Date.now();
        
        if (await isThere(item, letters)) {
            results.push(item);
        }

        const elapsedTime = Date.now() - startTime;
        
        // Якщо час обробки елемента менший за debounceTime, додаємо затримку
        if (elapsedTime < debounceTime) {
            await new Promise(resolve => setTimeout(resolve, debounceTime - elapsedTime));
        }
    }

    return results;
}

async function isThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000); // Основна затримка для імітації асинхронності
    });
}

asyncFilter(arr1, checkLetters).then(res => console.log("Task1:", res));

// Task 2 parallism

const arr1 = ["application", "banana", "cola", "apex", "offset"];
const checkLetters = "ope";

function asyncFilterParallel(array, letters) {
    const promises = array.map(item => isThere(item, letters));
    return Promise.all(promises).then(results => {
        return array.filter((_, index) => results[index]);
    });
}

function isThere(word, letters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000);
    });
}

asyncFilterParallel(arr1, checkLetters).then(result => console.log("Parallel result:", result));
