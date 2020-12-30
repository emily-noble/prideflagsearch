"use strict";

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".jx-disclosure").forEach((disclosureButton) => {
        new PFS.ExclusiveDisclosure(disclosureButton);
    });
    
//     fetch("static/search/data/prideflags.json").then(function(data) {
//         return data.json();
//     }).then(function(data) {
//         const flagList = data.flags;

//         const display = new PFS.ResultDisplay(document.querySelector("#searchResults"));
//         const searchApp = new PFS.FlagSearchApp(document.querySelectorAll(".flag-card"), display);

//         const searchForm = new PFS.SearchForm();
//         searchForm.addFormChangeCallback((filter) => searchApp.search(filter));

// //         searchApp.search();
        
//         const javaScriptRequiredList = document.querySelectorAll(".jx-javascript-required");
        
//         javaScriptRequiredList.forEach((element) => {
//             if (element.classList.contains("hidden")) {
//                 element.classList.remove("hidden");
//             } else {
//                 element.classList.add("hidden");
//             }
//         });
//     });
})