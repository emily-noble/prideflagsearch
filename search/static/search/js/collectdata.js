function collectColors() {
    var selectElement = document.querySelector("#colorFilter");
    
    var selectedColors = [];
    for (var i = 0; i < selectElement.selectedOptions.length; i++) {
       selectedColors.push(selectElement.selectedOptions[i].value); 
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