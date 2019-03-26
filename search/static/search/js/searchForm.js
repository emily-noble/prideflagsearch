"use strict";

(() => {
    /**
     * Collect filters based on dom elements and call functions to process the filters.
     */
    class SearchForm {
        /**
         * Create a SearchForm.
         */
        constructor() {
            this.formChangeCallbackList = [];

            const selectorString = "#colorFilter,#stripesFilter,#shapesFilter";
            const filteringElementList = document.querySelectorAll(selectorString);

            for (let i = 0; i < filteringElementList.length; i++) {
                const filteringElement = filteringElementList[i];
                filteringElement.addEventListener("change", () => {
                    this.callFormChangeCallbacks();
                });

                if ("INPUT" === filteringElement.nodeName) {
                    filteringElement.addEventListener("keyup", () => {
                        this.callFormChangeCallbacks();
                    });
                }
            }
        }

        /**
         * Add a function to be called when then search form changes.
         * Callback will be called with the filter as the first argument.
         * @param {Function} callback
         */
        addFormChangeCallback(callback) {
            this.formChangeCallbackList.push(callback);
        }

        /**
         * Call all callbacks with the filter as the first argument
         * @private
         */
        callFormChangeCallbacks() {
            const filter = {
                colorFilter: this.collectColors(),
                shapeFilter: this.collectShapes(),
                stripeFilter: this.collectStripes(),
            };

            this.formChangeCallbackList.forEach((callback) => {
                callback(filter);
            });
        }

        /**
         * Get a list of required colors
         * @private
         * @returns {array}
         */
        collectColors() {
            const colorPickElement = document.querySelector("#colorFilter");
            const checkedElements = colorPickElement.querySelectorAll("input:checked");

            const selectedColors = [];
            for (let i = 0; i < checkedElements.length; i++) {
                selectedColors.push(checkedElements[i].value);
            }

            return selectedColors;
        }

        /**
         * Get the number of stripes
         * @private
         * @returns {int}
         */
        collectStripes() {
            const inputElement = document.querySelector("#stripesFilter");

            return parseInt(inputElement.value);
        }

        /**
         * Get if shapes are required
         * @private
         * @returns {boolean|null}
         */
        collectShapes() {
            const selectElement = document.querySelector("#shapesFilter");
            const rawValue = selectElement.value;

            if ("true" === rawValue) {
                return true;
            } else if ("false" === rawValue) {
                return false;
            }

            return null;
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.SearchForm = SearchForm;
})();