(() => {
    class SearchForm {
        constructor() {
            const filteringElementList = document.querySelectorAll("#colorFilter,#stripesFilter,#shapesFilter");

            for (var i = 0; i < filteringElementList.length; i++) {
                const filteringElement = filteringElementList[i];
                filteringElement.addEventListener("change", () => {
                    this.emitFilterEvent();
                });

                if ("INPUT" === filteringElement.nodeName) {
                    filteringElement.addEventListener("keyup", () => {
                        this.emitFilterEvent();
                    });
                }
            }
        }
        
        emitFilterEvent() {
            const detail = {
                colorFilter: this.collectColors(),
                shapeFilter: this.collectShapes(),
                stripeFilter: this.collectStripes(),
            };
            const event = new CustomEvent('filter', { detail: detail });
            document.dispatchEvent(event);
        }
        
        collectColors() {
            const colorPickElement = document.querySelector("#colorFilter");
            const checkedElements = colorPickElement.querySelectorAll("input:checked");

            const selectedColors = [];
            for (var i = 0; i < checkedElements.length; i++) {
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