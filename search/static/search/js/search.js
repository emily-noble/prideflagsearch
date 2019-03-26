// const citationFactory = new PFS.CitationFactory();
const flagFactory = new PFS.FlagCardFactory();
const disclosureList = [];

function search(filters) {
    if (!filters) {
        return theData;
    }
    
    // Search by shapes
    var shouldHaveShapes = filters.shapeFilter;
    var passedShapesSearch = [];
    
    if (null === shouldHaveShapes) {
        passedShapesSearch = theData;
    } else {
        for (var i = 0; i < theData.length; i++) {
            var flagA = theData[i];
            if (shouldHaveShapes === flagA.shapes) {
                passedShapesSearch.push(flagA);
            }
        }
    }
    
    // Search by stripes
    var numberOfStripes = filters.stripeFilter;
    var passedStripesSearch = [];
    
    if (isNaN(numberOfStripes) || 0 >= numberOfStripes) {
        passedStripesSearch = passedShapesSearch;
    } else {
        for (var j = 0; j < passedShapesSearch.length; j++) {
            var flagB = passedShapesSearch[j];
            if (numberOfStripes === flagB.stripes) {
                passedStripesSearch.push(flagB);
            }
        }
    }
    
    // Search by colors
    var requiredColors = filters.colorFilter;
    var passedColorsSearch = [];
    
    if (0 === requiredColors.length) {
        passedColorsSearch = passedStripesSearch;
    } else {
        for (var k = 0; k < passedStripesSearch.length; k++) {
            var flagC = passedStripesSearch[k];
            var difference = requiredColors.filter(function(i) {return flagC.colors.indexOf(i) < 0;});
            if (0 >= difference.length) {
                passedColorsSearch.push(flagC);
            }
        }
    }
    
    var sortedFlagList = passedColorsSearch.sort(function(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        
        if (a.name > b.name){
            return 1;
        }
        
        return 0;
    });
    
    return sortedFlagList;
}

function buildFlagDomElements(flag, resultRow) {
    var resultColumn = document.createElement("div");
    resultColumn.classList.add("col-lg-6");
    resultColumn.classList.add("col-xl-3");
    resultColumn.classList.add("flag-col");
    resultRow.appendChild(resultColumn);
    
    const resultHeader = document.createElement("h3");
    resultHeader.classList.add("citation-header");
    resultHeader.innerText = flag.name;
    resultColumn.appendChild(resultHeader);

    if (flag.src) {
        var resultImg = document.createElement("img");
        resultImg.src = flag.src;
        resultImg.alt = ""; // Because the flag's name is elsewhere on the page, don't need alt text
        resultImg.classList.add("img-fluid");
        resultColumn.appendChild(resultImg);
    }
    
    if (flag.citation) {
        var resultShowMoreWrapper = document.createElement("div");
        resultShowMoreWrapper.classList.add("citation-reveal");
        resultColumn.appendChild(resultShowMoreWrapper);
        
        var resultShowMore = document.createElement("button");
        resultShowMore.innerHTML = "<i class='fas fa-caret-right'></i> Details";
        resultShowMore.setAttribute("aria-expanded", "false");
        resultShowMore.setAttribute("role", "button");
        
        const disclosure = new PFS.Disclosure(resultShowMore, () => {return citationFactory.buildCitation(flag.citation)});
        disclosureList.push(disclosure);
        resultShowMore.addEventListener("click", () => {
            if (!disclosure.isShown()) {
                hideAllDisclosures(); 
            }
            disclosure.toggle();
        });
        resultShowMoreWrapper.appendChild(resultShowMore);
    }

}

function hideAllDisclosures() {
    disclosureList.forEach((disclosure) => {
        disclosure.hide();
    })
}

function displaySearchResults(flagList) {
    
    var searchResults = document.querySelector("#searchResults");
    
    searchResults.innerHTML = "";
    
    for (var i = 0; i < flagList.length; i += 4) {
        var resultRow = document.createElement("div");
        resultRow.classList.add("row");
        
        if (i < flagList.length) {
            var flagA = flagList[i];
            buildFlagDomElements(flagA, resultRow);
        }
        
        if (i + 1 < flagList.length) {
            var flagB = flagList[i + 1];
            buildFlagDomElements(flagB, resultRow);
        }
        
        if (i + 2 < flagList.length) {
            var flagC = flagList[i + 2];
            buildFlagDomElements(flagC, resultRow);
        }
        
        if (i + 3 < flagList.length) {
            var flagD = flagList[i + 3];
            buildFlagDomElements(flagD, resultRow);
        }
        
        searchResults.appendChild(resultRow);
    }
    
    var resultsCount = document.querySelector("#resultsCount");
    resultsCount.innerText = flagList.length;
    
    var resultsWord = document.querySelector("#resultsWord");
    if (1 === flagList.length) {
        resultsWord.innerText = 'flag';
    } else {
        resultsWord.innerText = 'flags';
    }
}
