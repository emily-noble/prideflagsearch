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
    
    row.after(citationRow);
}

function buildCitationRow(flagCitation) {
    const citationRow = document.createElement("div");
    citationRow.classList.add("row");
    citationRow.classList.add("jx-citation-row");
    
    const citationCol = document.createElement("div");
    citationCol.classList.add("col-12");
    citationCol.innerText = flagCitation.apa;
    citationRow.appendChild(citationCol);
    
    return citationRow;
}