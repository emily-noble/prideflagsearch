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
            });

            let filteredFlagList = this.flagList;

            // Search by shapes
            const shouldHaveShapes = filters.shapeFilter;
            if (null !== shouldHaveShapes) {
                this.flagList.forEach((flagElement) => {
                    const hasShapes = flagElement.dataset.shapes === "True";
                    if (shouldHaveShapes !== hasShapes) {
                        flagElement.classList.add("hidden");
                    }
                });
//                 filteredFlagList = filteredFlagList.filter((flag) => {
//                     return flag.shapes === shouldHaveShapes;
//                 });
            }

            // Search by stripes
            const numberOfStripes = filters.stripeFilter;
            if (numberOfStripes && !isNaN(numberOfStripes)) {
                this.flagList.forEach((flagElement) => {
                    const stripeCount = parseInt(flagElement.dataset.stripes, 10);
                    if (numberOfStripes !== stripeCount && !isNaN(stripeCount)) {
                        flagElement.classList.add("hidden");
                    }
                });
//                 filteredFlagList = filteredFlagList.filter((flag) => {
//                     return flag.stripes === numberOfStripes;
//                 });
            }

            // Search by colors
            const requiredColors = filters.colorFilter;
            if (requiredColors.length) {
                this.flagList.forEach((flagElement) => {
                    const colorList = JSON.parse(flagElement.dataset.colors);
                    const differenceList = requiredColors.filter((i) => {
                        return colorList.indexOf(i) < 0;
                    });
                    
                    if (differenceList.length) {
                        flagElement.classList.add("hidden");
                    }
                });
//                 filteredFlagList = filteredFlagList.filter((flag) => {
//                     const differenceList = requiredColors.filter((i) => {
//                         return flag.colors.indexOf(i) < 0;
//                     });

//                     return 0 === differenceList.length;
//                 });
            }

//             filteredFlagList = this.sortFlagList(filteredFlagList);

//             this.flagDisplay.update(filteredFlagList);
        }

        /**
         * Sorts a list of flags alphabetically
         * @private
         * @param {array} flagList
         * @returns {array}
         */
        sortFlagList(flagList) {
            const sortedFlagList = flagList.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }

                if (a.name > b.name) {
                    return 1;
                }

                return 0;
            });

            return sortedFlagList;
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.FlagSearchApp = FlagSearchApp;
})();