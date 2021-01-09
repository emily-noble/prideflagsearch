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
            
            // Manually set the toggle element's top margin so it doesn't move
            this.toggleElement.style.marginTop = window.getComputedStyle(this.toggleElement).marginTop;

            // Show disclosure content
            this.contentElement.classList.remove("hidden");
            
            // Set the content element's offset so it aligns with everything else
            const mainElement = document.getElementsByTagName("main")[0];
            const leftOffset = this.toggleElement.offsetLeft - mainElement.offsetLeft;
            console.log(this.contentElement, leftOffset);
            this.contentElement.style.left = `-${leftOffset}px`;
            
        }

        /**
         * Hides the disclosure
         */
        hide() {
            // Change disclosure caret
            this.toggleElement.innerHTML = "Details <i class='fas fa-caret-right'></i>";
            this.toggleElement.setAttribute("aria-expanded", "false");
            
            // Clear manually set margin top
            this.toggleElement.style.marginTop = "";

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