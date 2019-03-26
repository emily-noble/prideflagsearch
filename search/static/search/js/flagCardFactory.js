"use strict";

(() => {
    /**
     * A factory to generate flag card DOM elements
     */
    class FlagCardFactory {
        /**
         * Create a FlagCardFactory.
         */
        constructor() {
            this.citationFactory = new PFS.CitationFactory();
        }

        /**
         * Returns a flag card DOM element.
         * @param {Object} flag
         * @returns {DOMElement} 
         */
        buildFlagCard(flag) {
            const resultColumn = document.createElement("div");
            resultColumn.classList.add("col-lg-6");
            resultColumn.classList.add("col-xl-3");
            resultColumn.classList.add("flag-col");

            const resultHeader = document.createElement("h3");
            resultHeader.classList.add("citation-header");
            resultHeader.innerText = flag.name;
            resultColumn.appendChild(resultHeader);

            const imageElement = this.buildImageElement(flag.src);
            if (imageElement) {
                resultColumn.appendChild(imageElement);
            }

            const citationElement = this.buildCitationElement(flag.citation);
            if (citationElement) {
                resultColumn.appendChild(citationElement);
            }

            return resultColumn;
        }

        /**
         * Builds the image DOM elements
         * @private
         * @param {string} source - The URL for the image
         * @returns {DOMElement} 
         */
        buildImageElement(source) {
            if (!source) {
                return null;
            }

            const resultImage = document.createElement("img");
            resultImage.src = source;
            resultImage.alt = ""; // Flag's name is elsewhere on the page, don't need alt text
            resultImage.classList.add("img-fluid");

            return resultImage;
        }

        /**
         * Builds the citation disclosure DOM elements
         * @private
         * @param {Object} citation
         * @returns {DOMElement} 
         */
        buildCitationElement(citation) {
            if (!citation) {
                return null;
            }

            const resultShowMoreWrapper = document.createElement("div");
            resultShowMoreWrapper.classList.add("citation-reveal");

            const resultShowMore = document.createElement("button");
            resultShowMore.innerHTML = "<i class='fas fa-caret-right'></i> Details";
            resultShowMore.setAttribute("aria-expanded", "false");
            resultShowMore.setAttribute("role", "button");

            const disclosure = new PFS.ExclusiveDisclosure(
                resultShowMore,
                () => this.citationFactory.buildCitation(citation),
                "citations"
            );
            resultShowMore.addEventListener("click", () => {
                disclosure.toggle();
            });

            resultShowMoreWrapper.appendChild(resultShowMore);

            return resultShowMoreWrapper;
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.FlagCardFactory = FlagCardFactory;
})();