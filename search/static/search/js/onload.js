"use strict";

document.addEventListener("DOMContentLoaded", function() {
    fetch("static/search/data/prideflags.json").then(function(data) {
        return data.json();
    }).then(function(data){
        const flagList = data.flags;
        
        const display = new PFS.ResultDisplay(document.querySelector("#searchResults"));
        const searchApp = new PFS.FlagSearchApp(flagList, display);
        
        const searchForm = new PFS.SearchForm();
        searchForm.addFormChangeCallback((filter) => searchApp.search(filter));
        
        searchApp.search();
    });
})