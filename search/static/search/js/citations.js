function handleShowCitationEvent(flagData, event) {
    const shouldShowCitation = ("false" === event.target.getAttribute("aria-expanded"));
    
    removeAllCitations();
    resetAllShowMoreTexts();
    
    if (shouldShowCitation) {
        showCitation(flagData, event.target); 
    }
}

function removeAllCitations() {
    const citationRowList = document.querySelectorAll(".jx-citation-row");
    
    for (i = 0; i < citationRowList.length; ++i) {
        let child = citationRowList[i];
        if (child.parentElement) {
            child.parentElement.removeChild(child);
        }
    }
}

function resetAllShowMoreTexts() {
    const showMoreButtonList = document.querySelectorAll(".citation-reveal button");
    
    for (i = 0; i < showMoreButtonList.length; ++i) {
        const thisButton = showMoreButtonList[i];
        thisButton.innerHTML = "<i class='fas fa-caret-right'></i> Details";
        thisButton.setAttribute("aria-expanded", "false");
    }
}

function showCitation(flagData, flagElement) {
    // Change show more text
    flagElement.innerHTML = "<i class='fas fa-caret-down'></i> Details";
    flagElement.setAttribute("aria-expanded", "true");
    
    // Add citation content
    const citationRow = buildCitationRow(flagData.citation);
    
    let [leftOffset, width] = calculateBounds(flagElement);
    
    citationRow.style.position = "relative";
    citationRow.style.left = leftOffset + "px";
    citationRow.style.width = width + "px";
    citationRow.style.outline = "1px solid black";
    
    flagElement.after(citationRow);
}

function buildCitationRow(flagCitation) {
    let hasParts = false;
    const citationRow = document.createElement("div");
    citationRow.classList.add("jx-citation-row");

    if (flagCitation.text) {
        hasParts = true;
        const textDiv = document.createElement("div");
        textDiv.innerText = flagCitation.text;
        citationRow.appendChild(textDiv);
    }
    
    if (flagCitation.sourceList) {
        hasParts = true;
        const sourceList = document.createElement("ol");
        citationRow.appendChild(sourceList);

        flagCitation.sourceList.forEach(function(item, index) {
            const thisSource = document.createElement("li");
            thisSource.innerText = item;
            sourceList.appendChild(thisSource);
        });
    }
    
    if (flagCitation.flagImageSource) {
        hasParts = true;
        const flagSource = document.createElement("div");
        flagSource.innerText = flagCitation.flagImageSource;
        citationRow.appendChild(flagSource);
    }
    
    if (!hasParts) {
        citationRow.innerText = "We couldn't find details about this flag in our records. Know something? Help us out!.";
    }
    return citationRow;
}

function calculateBounds(element) {
    const origBounds = element.getBoundingClientRect();
    const origLeft = origBounds.left;
    const origRight = origBounds.right;
    let leftOffset = Infinity;
    let leftPadding = null;
    let rightOffset = 0;
    let rightPadding = null;
    const flagColList = element.closest(".row").querySelectorAll(".flag-col");
    
    flagColList.forEach((flagCol) => {
        var rect = flagCol.getBoundingClientRect(); 
        
        if (rect.left < leftOffset) {
            leftOffset = rect.left;
            
            const rawPaddingLeft = window.getComputedStyle(flagCol, null).paddingLeft;
            leftPadding = parseInt(rawPaddingLeft.substring(0, rawPaddingLeft.length - 2));
        }
        
        if (rect.right > rightOffset) {
            rightOffset = rect.right;
            
            const rawPaddingRight = window.getComputedStyle(flagCol, null).paddingRight;
            rightPadding = parseInt(rawPaddingRight.substring(0, rawPaddingRight.length - 2));
        }
    });
    
    return [leftOffset - origLeft + leftPadding, rightOffset - leftOffset - leftPadding - rightPadding];
}