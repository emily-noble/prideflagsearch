"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Enable javascript-only features
    const javaScriptRequiredList = document.querySelectorAll(".jx-javascript-required");
    javaScriptRequiredList.forEach((element) => {
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
    
    // Wire up citation disclosures
    document.querySelectorAll(".jx-disclosure").forEach((disclosureButton) => {
        new PFS.ExclusiveDisclosure(disclosureButton);
    });
    
    
    // Create the search app (handles updating display)
    const searchApp = new PFS.FlagSearchApp(
        document.querySelectorAll(".jx-flag-card"),
        document.querySelector("#resultsCount"),
        document.querySelector("#resultsWord")
    );

    // Create search form (listens to and emits filter changes)
    const searchForm = new PFS.SearchForm();
    searchForm.addFormChangeCallback(
        (filter) => 
        {
            // Close any open disclosures
            const event = new CustomEvent("PFS.ExclusiveDisclosure.hide.default");
            document.dispatchEvent(event);
            
            // Update search results
            searchApp.search(filter);
        }
    );
})