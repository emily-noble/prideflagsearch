let theData = null;

document.addEventListener("DOMContentLoaded", function() {
    fetch('static/search/data/prideflags.json').then(function(data) {
        return data.json();
    }).then(function(data){
        theData = data.flags;
    });
    
    new PFS.SearchForm();
    
    document.addEventListener("filter", (event) => {
        const results = search(event.detail);
        displaySearchResults(results);
    });
})