const arr = ["hero", "lantern", "banana", "cola", "apex", "latina"];

function asyncFilterWithAbort(array, check, controller) {
    const results = new Array(array.length).fill(null);
    const signal = controller.signal;

    const promises = array.map((item, index) =>
        check(item, signal)
            .then(success => {
                if (success) {
                    results[index] = item;
                }
            })
    );

    return Promise.all(promises).then(() => results.filter(Boolean));
}

function ifThere(word, letters, signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            const success = [...letters].every(letter => word.includes(letter));
            resolve(success);
        }, 2000);

        signal.addEventListener("abort", () => {
            clearTimeout(timeoutId);
            reject(new Error("Operation was canceled"));
        });
    });
}

// Create AbortController
const controller = new AbortController();

asyncFilterWithAbort(arr, (word, signal) => ifThere(word, "la", signal), controller)
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
