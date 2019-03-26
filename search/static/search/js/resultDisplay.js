"use strict";

(() => {
    /**
     * Manage the display of a list of flags
     */
    class ResultDisplay {
        /**
         * Create a ResultDisplay.
         * @param {DOMElement} container - Element to put results in
         * @param {int} flagsPerRow - The number of flags per result row
         */
        constructor(container, flagsPerRow = 4) {
            this.container = container;
            this.flagsPerRow = flagsPerRow;
            this.flagFactory = new PFS.FlagCardFactory();
        }

        /**
         * Update the display to show the provided flag list.
         * @param {array} flagList - List of flag objects
         */
        update(flagList) {
            // Clear existing display
            this.container.innerHTML = "";

            for (let i = 0; i < flagList.length; i += 4) {
                const resultRow = document.createElement("div");
                resultRow.classList.add("row");

                for (let j = 0; j < this.flagsPerRow; j++) {
                    const flagIndex = i + j;

                    if (flagIndex < flagList.length) {
                        const flagColumn = this.flagFactory.buildFlagCard(flagList[i + j]);
                        resultRow.appendChild(flagColumn);
                    }
                }

                this.container.appendChild(resultRow);
            }

            const resultsCount = document.querySelector("#resultsCount");
            resultsCount.innerText = flagList.length;

            const resultsWord = document.querySelector("#resultsWord");
            if (1 === flagList.length) {
                resultsWord.innerText = "flag";
            } else {
                resultsWord.innerText = "flags";
            }
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.ResultDisplay = ResultDisplay;
})();