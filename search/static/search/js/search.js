var theData = null;

function search() {
    // Search by shapes
    var shouldHaveShapes = collectShapes();
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
    var numberOfStripes = collectStripes();
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
    var requiredColors = collectColors();
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
    
    return passedColorsSearch;
}

function displaySearchResults(flagList) {
    
    var searchResults = document.querySelector("#searchResults");
    
    searchResults.innerHTML = "";
    
    flagList.forEach((flag) => {
        var resultRow = document.createElement("div");
        resultRow.classList.add("row");
        
        var resultColumn = document.createElement("div");
        resultColumn.classList.add("col-12");
        
        resultColumn.innerText = flag.name;
        
        searchResults.appendChild(resultColumn);
    });
}

function wireEventHooks() {
    var filteringElementList = document.querySelectorAll("#colorFilter,#stripesFilter,#shapesFilter");
    
    for (var i = 0; i < filteringElementList.length; i++) {
        var filteringElement = filteringElementList[i];
        filteringElement.addEventListener("change", function() {
            var results = search();
            displaySearchResults(results);
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('static/search/data/prideflags.json').then(function(data) {
        return data.json();
    }).then(function(data){
        theData = data.flags;
        wireEventHooks();
    });
})