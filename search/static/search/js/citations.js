function handleShowCitationEvent(flagData, event) {
    removeAllCitations();
    showCitation(flagData, event.target); 
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

function showCitation(flagData, flagElement) {
    console.log(flagData.name);
    const row = flagElement.closest("div.row");
    
    const citationRow = buildCitationRow(flagData.citation);
    
    let [leftOffset, width] = calculateBounds(flagElement);
    console.log(leftOffset, width);
    
    citationRow.style.position = "relative";
    citationRow.style.left = leftOffset + "px";
    citationRow.style.width = width + "px";
    citationRow.style.outline = "1px solid black";
    
    flagElement.after(citationRow);
}

function buildCitationRow(flagCitation) {
    const citationRow = document.createElement("div");
    citationRow.classList.add("jx-citation-row");
    citationRow.innerText = flagCitation.apa;
    
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