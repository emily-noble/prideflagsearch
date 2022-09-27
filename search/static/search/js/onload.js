"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Enable javascript-only features
    const javaScriptRequiredList = document.querySelectorAll(".jx-javascript-required");
    javaScriptRequiredList.forEach((element) => {
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
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
        (filter) => {
            // Update search results
            searchApp.search(filter);
        }
    );
})