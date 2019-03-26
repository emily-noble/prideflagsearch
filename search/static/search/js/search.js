// const citationFactory = new PFS.CitationFactory();
const flagFactory = new PFS.FlagCardFactory();
const disclosureList = [];

function search(filters) {
    if (!filters) {
        filters = {
            shapeFilter: null,
            stripeFilter: null,
            colorFilter: [],
        };
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

function displaySearchResults(flagList) {
    
    var searchResults = document.querySelector("#searchResults");
    
    searchResults.innerHTML = "";
    
    for (var i = 0; i < flagList.length; i += 4) {
        var resultRow = document.createElement("div");
        resultRow.classList.add("row");
        
        if (i < flagList.length) {
            var flagA = flagList[i];
            const flagColumn = flagFactory.buildFlagCard(flagA);
            resultRow.appendChild(flagColumn);
        }
        
        if (i + 1 < flagList.length) {
            var flagB = flagList[i + 1];
            const flagColumn = flagFactory.buildFlagCard(flagB);
            resultRow.appendChild(flagColumn);
        }
        
        if (i + 2 < flagList.length) {
            var flagC = flagList[i + 2];
            const flagColumn = flagFactory.buildFlagCard(flagC);
            resultRow.appendChild(flagColumn);
        }
        
        if (i + 3 < flagList.length) {
            var flagD = flagList[i + 3];
            const flagColumn = flagFactory.buildFlagCard(flagD);
            resultRow.appendChild(flagColumn);
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
