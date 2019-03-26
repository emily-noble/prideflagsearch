"use strict";

(() => {
    class SearchForm {
        constructor() {
            this.formChangeCallbackList = [];
            
            const selectorString = "#colorFilter,#stripesFilter,#shapesFilter";
            const filteringElementList = document.querySelectorAll(selectorString);

            for (let i = 0; i < filteringElementList.length; i++) {
                const filteringElement = filteringElementList[i];
                filteringElement.addEventListener("change", () => {
                    this.callFormChangeCallbacks();
                });

                if ("INPUT" === filteringElement.nodeName) {
                    filteringElement.addEventListener("keyup", () => {
                        this.callFormChangeCallbacks();
                    });
                }
            }
        }
        
        addFormChangeCallback(callback) {
            this.formChangeCallbackList.push(callback);
        }
        
        callFormChangeCallbacks() {
            const filter = {
                colorFilter: this.collectColors(),
                shapeFilter: this.collectShapes(),
                stripeFilter: this.collectStripes(),
            };
            
            this.formChangeCallbackList.forEach((callback) => {
                callback(filter);
            });
        }
        
        collectColors() {
            const colorPickElement = document.querySelector("#colorFilter");
            const checkedElements = colorPickElement.querySelectorAll("input:checked");

            const selectedColors = [];
            for (let i = 0; i < checkedElements.length; i++) {
               selectedColors.push(checkedElements[i].value);
            }

            return selectedColors;
        }

        collectStripes() {
            const inputElement = document.querySelector("#stripesFilter");

            return parseInt(inputElement.value);
        }

        collectShapes() {
            const selectElement = document.querySelector("#shapesFilter");
            const rawValue = selectElement.value;

            if ("true" === rawValue) {
                return true;
            } else if ("false" === rawValue) {
                return false;
            } 

            return null;
        }
    }
    
    window.PFS = window.PFS || {};
    window.PFS.SearchForm = SearchForm;
})();