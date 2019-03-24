let theData = null;

document.addEventListener("DOMContentLoaded", function() {
    fetch('static/search/data/prideflags.json').then(function(data) {
        return data.json();
    }).then(function(data){
        theData = data.flags;
        wireEventHooks();
        
        var results = search();
        displaySearchResults(results);
    });
})