// Task 3

const arr = ["hero", "lantern", "banana", "cola", "apex", "latina"];
const checkLetters = "la";

function asyncFilterWithAbort(array, letters, controller) {
    const results = new Array(array.length).fill(null);
    const signal = controller.signal;

    const promises = array.map((item, index) =>
        isThereWithAbort(item, letters, signal)
            .then(hasLetters => {
                if (hasLetters) {
                    results[index] = item;
                }
            })
    );

    return Promise.all(promises).then(() => results.filter(Boolean));
}

function isThereWithAbort(word, letters, signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 2000);

        signal.addEventListener("abort", () => {
            clearTimeout(timeoutId);
            reject(new Error("Operation was canceled"));
        });
    });
}

const controller = new AbortController();

asyncFilterWithAbort(arr, checkLetters, controller)
    .then(result => {
        console.log("Task3:");
        console.log("Result:", result);
    })
    .catch(error => console.error(error));

// Cancel the operation after 1.5 seconds
setTimeout(() => {
    controller.abort();
    console.log("Operations were canceled");
}, 1500);
