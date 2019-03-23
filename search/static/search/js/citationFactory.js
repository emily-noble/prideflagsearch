(() => {
    /**
    * Converts a text APA citation into a linked APA style citation
    *
    * @param {string} text The APA style citation
    *
    * @returns {string} The APA style citation with HTML markdown for the link, if found. Otherwise returns what was provided.
    */
    function apaMarkdownLinkToHtmlLink(text) {
        // Attempt to extract an markdown style link from the text
        const apaCitationPartsRegex = /(.*)from \[(.*)\]\((.*)\)(.*)/g;
        const thisCitationParts = apaCitationPartsRegex.exec(text);

        if (thisCitationParts && 4 <= thisCitationParts.length) {
            // Add hyperlinked source
            const firstPart = thisCitationParts[1];
            const linkText = thisCitationParts[2];
            const linkUrl = thisCitationParts[3];
            const addendum = thisCitationParts[4];

            const fullHtml = firstPart + " from <a href='" + linkUrl + "' target='_blank'>" + linkText + "</a>" + addendum;
            return fullHtml;
        }

        return text; // No link could be found
    }
    
    class CitationFactory {
        /**
        * Returns a citation DOM element.
        * 
        * @param {Object} citation An object with the following optional properties:
        *   text
        *   sourceList
        *   imageSource
        *   firstAuthoring
        * 
        * @returns {DOMElement} 
        */
        buildCitation(citation) {
            const citationRow = document.createElement("div");
            citationRow.classList.add("jx-citation-row");

            // Early exit if citation is missing information
            if (!citation.text && !citation.sourceList && !citation.imageSource && !citation.firstAuthoring) {
                citationRow.innerText = "We couldn't find details about this flag in our records. Know something? Help us out!.";
                return citationRow;
            }

            if (citation.text) {
                const textHeader = document.createElement("h4");
                textHeader.classList.add("citation-header");
                textHeader.innerText = "More about this flag";
                citationRow.appendChild(textHeader);

                const textDiv = document.createElement("div");
                textDiv.innerText = citation.text;
                citationRow.appendChild(textDiv);
            }

            if (citation.sourceList) {
                const sourceHeader = document.createElement("h4");
                sourceHeader.classList.add("citation-header");
                sourceHeader.innerText = "Sources";
                citationRow.appendChild(sourceHeader);

                const sourceList = document.createElement("ol");
                citationRow.appendChild(sourceList);

                citation.sourceList.forEach(function(item, index) {
                    const thisSource = document.createElement("li");

                    // Attempt to extract an markdown style link from the url
                    const linkText = apaMarkdownLinkToHtmlLink(item);
                    thisSource.innerHTML = linkText;

                    sourceList.appendChild(thisSource);
                });
            }

            if (citation.imageSource) {
                const imageSourceHeader = document.createElement("h4");
                imageSourceHeader.classList.add("citation-header");
                imageSourceHeader.innerText = "Flag Image Source";
                citationRow.appendChild(imageSourceHeader);

                const flagSource = document.createElement("div");
                const imageLinkText = apaMarkdownLinkToHtmlLink(citation.imageSource);

                flagSource.innerHTML = imageLinkText;

                citationRow.appendChild(flagSource);
            }

            if (citation.firstAuthoring) {
                const authoringHeader = document.createElement("h4");
                authoringHeader.classList.add("citation-header");
                authoringHeader.innerText = "First Authored At";
                citationRow.appendChild(authoringHeader);

                const flagAuthoring = document.createElement("div");
                const authoringLinkText = apaMarkdownLinkToHtmlLink(citation.firstAuthoring);

                flagAuthoring.innerHTML = authoringLinkText;

                citationRow.appendChild(flagAuthoring);
            }

            return citationRow;
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.CitationFactory = CitationFactory;
})();