"use strict";

(() => {
    /**
     * A Disclosure element.
     */
    class Disclosure {
        /**
         * Create a Disclosure.
         * @param {DOMElement} toggleElement - The element controlling the disclosure.
         * @param {Function} contentCallback - The function to call to get the disclosure's content.
         */
        constructor(toggleElement) {
            this.toggleElement = toggleElement;
            this.contentElement = document.getElementById(this.toggleElement.getAttribute("aria-controls"));
            
            this.toggleElement.addEventListener("click", () => this.toggle());

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
            // Change disclosure caret
            this.toggleElement.innerHTML = "Details <i class='fas fa-caret-down'></i>";
            this.toggleElement.setAttribute("aria-expanded", "true");

            // Show disclosure content
            this.contentElement.classList.remove("hidden");
        }

        /**
         * Hides the disclosure
         */
        hide() {
            // Change disclosure caret
            this.toggleElement.innerHTML = "Details <i class='fas fa-caret-right'></i>";
            this.toggleElement.setAttribute("aria-expanded", "false");

            // Hide disclosure content
            this.contentElement.classList.add("hidden");
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