"use strict";

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".jx-disclosure").forEach((disclosureButton) => {
        new PFS.ExclusiveDisclosure(disclosureButton);
    });
    
    const javaScriptRequiredList = document.querySelectorAll(".jx-javascript-required");
    
    javaScriptRequiredList.forEach((element) => {
            if (element.classList.contains("hidden")) {
                element.classList.remove("hidden");
            } else {
                element.classList.add("hidden");
            }
        });
    
    const searchApp = new PFS.FlagSearchApp(
        document.querySelectorAll(".jx-flag-card"),
        document.querySelector("#resultsCount"),
        document.querySelector("#resultsWord")
    );

    const searchForm = new PFS.SearchForm();
    searchForm.addFormChangeCallback((filter) => searchApp.search(filter));
})