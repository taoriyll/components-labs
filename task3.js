// Task 3

const arr = ["hero", "lantern", "banana", "cola", "apex", "latina"];
const checkLetters = "la";

function asyncFilterWithAbort(array, letters, controller) {
    const results = [];
    const signal = controller.signal;

    const promises = array.map(item => {
        return isThereWithAbort(item, letters, signal)
            .then(hasLetters => {
                if (hasLetters){
                    controller.abort(); // Скасовуємо всі інші запити
                    results.push(item);
                }
            })
            .catch(error => {
                if (error.name === 'AbortError') {

                } else {
                    throw error;
                }
            });
    });

    return Promise.all(promises).then(() => results);
}

function isThereWithAbort(word, letters, signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000);

        // Перериваємо операцію, якщо спрацьовує сигнал
        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new DOMException("Операція була скасована", "AbortError"));
        });
    });
}

// Створення AbortController
const controller = new AbortController();

// Викликаємо функцію з AbortController
asyncFilterWithAbort(arr, checkLetters, controller)
    .then(result => {
        console.log("Task3:");
        console.log("Result:", result);
    })
    .catch(error => console.error("Error:", error));

// setTimeout(() => {
//     controller.abort();
//     console.log("Операції були скасовані.");
// }, 1500);
