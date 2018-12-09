function collectColors() {
    var colorPickElement = document.querySelector("#colorFilter");
    var checkedElements = colorPickElement.querySelectorAll("input:checked");
    
    var selectedColors = [];
    for (var i = 0; i < checkedElements.length; i++) {
       selectedColors.push(checkedElements[i].value); 
    }
    
    return selectedColors;
}

function collectStripes() {
    var inputElement = document.querySelector("#stripesFilter");
    
    return parseInt(inputElement.value);
}

function collectShapes() {
    var selectElement = document.querySelector("#shapesFilter");
    var rawValue = selectElement.value;
    
    if ("true" === rawValue) {
        return true;
    } else if ("false" === rawValue) {
        return false;
    } 
    
    return null;
}