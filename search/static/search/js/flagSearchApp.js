"use strict";

(() => {
    /**
     * A flag searching application
     */
    class FlagSearchApp {
        /**
         * Create a FlagSearchApp.
         * @param {array} flagList - List of flag objects
         * @param {PFS.ResultDisplay} flagDisplay
         */
        constructor(flagList, flagDisplay) {
            this.flagList = flagList;
            this.flagDisplay = flagDisplay;
        }

        /**
         * Run a search using the provided filters and display the results
         * @param {Object} filters - Object with the following optional values:
         *      shapeFilter {boolean|null}
         *      stripeFilter {int|null}
         *      colorFilter {array} - List of color names
         */
        search(filters) {
            const defaultFilters = {
                shapeFilter: null,
                stripeFilter: null,
                colorFilter: [],
            }

            filters = filters || defaultFilters;
            
            this.flagList.forEach((flagElement) => {
                flagElement.classList.remove("hidden");
                
                // Search by shapes
                if (null !== filters.shapeFilter) {
                    const hasShapes = flagElement.dataset.shapes === "True";
                    if (filters.shapeFilter !== hasShapes) {
                        flagElement.classList.add("hidden");
                    }
                }

                // Search by stripes
                if (filters.stripeFilter && !isNaN(filters.stripeFilter)) {
                    const stripeCount = parseInt(flagElement.dataset.stripes, 10);
                    if (filters.stripeFilter !== stripeCount && !isNaN(stripeCount)) {
                        flagElement.classList.add("hidden");
                    }
                }

                // Search by colors
                if (filters.colorFilter.length) {
                    const colorList = JSON.parse(flagElement.dataset.colors);
                    const differenceList = filters.colorFilter.filter((i) => {
                        return colorList.indexOf(i) < 0;
                    });

                    if (differenceList.length) {
                        flagElement.classList.add("hidden");
                    }
                }
            });

        }
    }

    window.PFS = window.PFS || {};
    window.PFS.FlagSearchApp = FlagSearchApp;
})();