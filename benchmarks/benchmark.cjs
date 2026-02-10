
const assert = require('assert');

// Mock localStorage
const localStorage = {
    items: {},
    setItemCalls: 0,
    setItem: function(key, value) {
        this.items[key] = value;
        this.setItemCalls++;
        console.log(`[Storage] Set '${key}' (Call #${this.setItemCalls})`);
    },
    getItem: function(key) {
        return this.items[key];
    },
    clear: function() {
        this.items = {};
        this.setItemCalls = 0;
    }
};

// Simulation Parameters
const TYPING_SPEED_MS = 100; // time between keystrokes
const DEBOUNCE_DELAY_MS = 1000;
const TEXT_TO_TYPE = "Hello World"; // 11 chars

// Baseline Logic (Synchronous)
function simulateBaseline() {
    console.log("\n--- Running Baseline (Synchronous Write) ---");
    localStorage.clear();

    let currentText = "";
    let startTime = Date.now();

    return new Promise((resolve) => {
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex >= TEXT_TO_TYPE.length) {
                console.log(`Baseline completed in ${Date.now() - startTime}ms`);
                console.log(`Total Writes: ${localStorage.setItemCalls}`);
                resolve(localStorage.setItemCalls);
                return;
            }

            // Simulate typing
            currentText += TEXT_TO_TYPE[charIndex];

            // Simulate Component Update + useEffect (Synchronous)
            // component re-renders -> useEffect runs immediately
            localStorage.setItem('strategyNotes', JSON.stringify({ content: currentText }));

            charIndex++;
            setTimeout(typeChar, TYPING_SPEED_MS);
        };

        typeChar();
    });
}

// Optimized Logic (Debounced)
function simulateOptimized() {
    console.log("\n--- Running Optimized (Debounced Write) ---");
    localStorage.clear();

    let currentText = "";
    let startTime = Date.now();
    let timeoutId = null;

    return new Promise((resolve) => {
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex >= TEXT_TO_TYPE.length) {
                // Wait for the final debounce to fire
                setTimeout(() => {
                    console.log(`Optimized completed (including wait) in ${Date.now() - startTime}ms`);
                    console.log(`Total Writes: ${localStorage.setItemCalls}`);
                    resolve(localStorage.setItemCalls);
                }, DEBOUNCE_DELAY_MS + 100);
                return;
            }

            // Simulate typing
            currentText += TEXT_TO_TYPE[charIndex];

            // Simulate Component Update + useEffect (Debounced)
            // component re-renders -> useEffect runs
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                localStorage.setItem('strategyNotes', JSON.stringify({ content: currentText }));
            }, DEBOUNCE_DELAY_MS);

            charIndex++;
            setTimeout(typeChar, TYPING_SPEED_MS);
        };

        typeChar();
    });
}

async function runBenchmark() {
    const baselineWrites = await simulateBaseline();
    const optimizedWrites = await simulateOptimized();

    console.log("\n--- Results ---");
    console.log(`Baseline Writes: ${baselineWrites}`);
    console.log(`Optimized Writes: ${optimizedWrites}`);
    console.log(`Improvement: ${(baselineWrites - optimizedWrites)} fewer writes.`);
    console.log(`Reduction: ${((baselineWrites - optimizedWrites) / baselineWrites * 100).toFixed(1)}%`);
}

runBenchmark();
