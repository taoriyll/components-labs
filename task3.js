// Task 3

const arr = ["hero", "lantern", "banana", "cola", "apex", "latina"];
const checkLetters = "la";

function asyncFilterWithAbort(array, letters, controller) {
    const results = [];
    const signal = controller.signal;
// try catch remove, redo res
    const promises = array.map(async item => {
        try {
            const hasLetters = await isThereWithAbort(item, letters, signal);
            if (hasLetters) {
                if (hasLetters) results.push(item);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("Query is canceled.");
            } else {
                throw error;
            }
        }
    });

    return Promise.all(promises).then(() => results);
}

function isThereWithAbort(word, letters, signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            const hasLetters = [...letters].every(letter => word.includes(letter));
            resolve(hasLetters);
        }, 1000);

        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error("Operation was canceled"));
        });
    });
}

// Create AbortController
const controller = new AbortController();

// Call function from AbortController
asyncFilterWithAbort(arr, checkLetters, controller)
    .then(result => {
        console.log("Task3:");
        console.log("Result:", result);
    })
    .catch(error => console.error("Error:", error));

setTimeout(() => {
    controller.abort();
    console.log("Operations were canceled");
}, 1500);
