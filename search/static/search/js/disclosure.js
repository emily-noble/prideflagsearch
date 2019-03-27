"use strict";

(() => {
    /**
     * Converts a text APA citation into a linked APA style citation
     * @param {DOMElement} element The disclosure content element
     * @returns {array} The bounds of the disclosure content
     */
    function calculateBounds(element) {
        const origBounds = element.getBoundingClientRect();
        const origLeft = origBounds.left;

        let leftOffset = Infinity;
        let leftPadding = null;
        let rightOffset = 0;
        let rightPadding = null;

        const columnList = element.closest(".row").querySelectorAll(".flag-col");

        columnList.forEach((flagColumn) => {
            const rectangle = flagColumn.getBoundingClientRect();

            if (rectangle.left < leftOffset) {
                leftOffset = rectangle.left;

                const rawPaddingLeft = window.getComputedStyle(flagColumn, null).paddingLeft;
                leftPadding = parseInt(rawPaddingLeft.substring(0, rawPaddingLeft.length - 2));
            }

            if (rectangle.right > rightOffset) {
                rightOffset = rectangle.right;

                const rawPaddingRight = window.getComputedStyle(flagColumn, null).paddingRight;
                rightPadding = parseInt(rawPaddingRight.substring(0, rawPaddingRight.length - 2));
            }
        });

        return [
            leftOffset - origLeft + leftPadding,
            rightOffset - leftOffset - leftPadding - rightPadding
        ];
    }

    /**
     * A Disclosure element.
     */
    class Disclosure {
        /**
         * Create a Disclosure.
         * @param {DOMElement} toggleElement - The element controlling the disclosure.
         * @param {Function} contentCallback - The function to call to get the disclosure's content.
         */
        constructor(toggleElement, contentCallback) {
            this.toggleElement = toggleElement;

            this.content = null;
            this.contentCallback = contentCallback;

            this.hide();
        }

        /**
         * Toggles the disclosure's visibility.
         *      If it was hidden, shows the disclosure.
         *      If it was shown, hides the disclosure.
         */
        toggle() {
            if (!this.isShown()) {
                this.show();
            } else {
                this.hide();
            }
        }

        /**
         * Shows the disclosure
         */
        show() {
            // Get content if not already populated
            if (null === this.content) {
                this.content = this.contentCallback();
                this.content.style.position = "relative";
                this.content.style.outline = "1px solid black";
            }

            // Change disclosure caret
            this.toggleElement.innerHTML = "<i class='fas fa-caret-down'></i> Details";
            this.toggleElement.setAttribute("aria-expanded", "true");

            // Add disclosure content
            let [leftOffset, width] = calculateBounds(this.toggleElement);

            this.content.style.left = leftOffset + "px";
            this.content.style.width = width + "px";

            this.toggleElement.after(this.content);
        }

        /**
         * Hides the disclosure
         */
        hide() {
            // Change disclosure caret
            this.toggleElement.innerHTML = "<i class='fas fa-caret-right'></i> Details";
            this.toggleElement.setAttribute("aria-expanded", "false");

            // Remove the content element from the DOM
            if (this.content && this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
        }

        /**
         * Returns true if the disclosure is shown
         * @returns {boolean}
         */
        isShown() {
            return "true" === this.toggleElement.getAttribute("aria-expanded");
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.Disclosure = Disclosure;
})();