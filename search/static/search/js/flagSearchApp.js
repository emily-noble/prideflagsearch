"use strict";

(() => {
    class FlagSearchApp {
        constructor(flagList, flagDisplay) {
            this.flagList = flagList;
            this.flagDisplay = flagDisplay;
        }

        search(filters) {
            const defaultFilters = {
                shapeFilter: null,
                stripeFilter: null,
                colorFilter: [],
            }

            filters = filters || defaultFilters;

            let filteredFlagList = this.flagList;

            // Search by shapes
            const shouldHaveShapes = filters.shapeFilter;
            if (null !== shouldHaveShapes) {
                filteredFlagList = filteredFlagList.filter((flag) => {
                    return flag.shapes === shouldHaveShapes;
                });
            }

            // Search by stripes
            const numberOfStripes = filters.stripeFilter;
            if (numberOfStripes && !isNaN(numberOfStripes)) {
                filteredFlagList = filteredFlagList.filter((flag) => {
                    return flag.stripes === numberOfStripes;
                });
            }

            // Search by colors
            const requiredColors = filters.colorFilter;
            if (requiredColors.length) {
                filteredFlagList = filteredFlagList.filter((flag) => {
                    const differenceList = requiredColors.filter((i) => {
                        return flag.colors.indexOf(i) < 0;
                    });

                    return 0 === differenceList.length;
                });
            }

            filteredFlagList = this.sortFlagList(filteredFlagList);

            this.flagDisplay.update(filteredFlagList);
        }

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