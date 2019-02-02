var labelPreview = document.getElementById("label-preview");
var labelPreviewText = document.getElementById("label-preview-text");
var labelName = document.getElementById("label-name");
var labelDescription = document.getElementById("label-description");
var labelColor = document.getElementById("label-color");
var randomizeColor = document.getElementById("randomize-color");
var displayLabels = document.getElementById("display-labels");
var createLabel = document.getElementById("create-label");
var error = document.getElementById("error");

function getLabelName() {
    if (labelName.value.trim() === "") {
        error.innerHTML = "Name cannot be empty"
        labelPreviewText.innerHTML = "Label preview";
    } else {
        error.innerHTML = "";
        labelPreviewText.innerHTML = labelName.value;
    }
}

function randomColorGenerator() {
    var characters = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9];
    var randomColorArray = [];
    for (var i = 0; i < 6; i++) {
        var randomIndex = Math.floor(Math.random()*characters.length);
        randomColorArray.push(characters[randomIndex])
    }
    return randomColorArray.join("");
}

function getRandomColor() {
    const color = randomColorGenerator();
    labelPreview.style.backgroundColor = `#${color}`;
    labelColor.value = `#${color}`;
};

getRandomColor();

function setRandomColor() {
    const color = labelColor.value;
    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)){
        error.innerHTML="";
        labelPreview.style.backgroundColor = color;
        labelColor.value = color;
    } else {
        error.innerHTML = "Color must be in valid hex code format"
    }
}

function createLabelRow() {
    var displayLabelText = document.createElement("span");
    displayLabelText.className = "display-label-text";
    displayLabelText.innerHTML = labelName.value;

    var displayLabel = document.createElement("div");
    displayLabel.className = "display-label";
    displayLabel.style.backgroundColor = labelColor.value;
    displayLabel.append(displayLabelText);

    var displayLabelCell = document.createElement("td");
    displayLabelCell.className="display-label-cell";
    displayLabelCell.append(displayLabel);

    var displayDescription = document.createElement("div");
    displayDescription.className = "display-description";
    displayDescription.innerHTML = labelDescription.value;

    var displayDescriptionCell = document.createElement("td");
    displayDescriptionCell.className="display-description-cell";
    displayDescriptionCell.append(displayDescription);

    var deleteLabel = document.createElement("button");
    deleteLabel.innerHTML = "Delete";
    deleteLabel.className = "delete-label";
    deleteLabel.setAttribute("onclick", "deleteLabel(this)");

    var deleteCell = document.createElement("td");
    deleteCell.className="delete-cell"
    deleteCell.append(deleteLabel);

    var newRow = document.createElement("tr");
    newRow.append(displayLabelCell, displayDescriptionCell, deleteCell);

    displayLabels.append(newRow);
}

function getLabelsCount() {
    var labelCount = document.getElementById("display-labels-count");
    var count = document.getElementsByClassName("display-label").length
    labelCount.innerHTML = `${count} ${count === 1 ? "label" : "labels"}`
}

getLabelsCount();

function deleteLabel(el) {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
    getLabelsCount();
}

labelName.onblur = function() {
    getLabelName();
}

randomizeColor.onclick = function() {
    getRandomColor();
}

labelColor.onblur = function() {
    setRandomColor();
}

createLabel.onclick = function() {
    if (labelName.value.trim() === "") {
        error.innerHTML = "Name cannot be empty"
    } else {
        createLabelRow();
        getRandomColor();
        getLabelsCount();
        error.innerHTML = "";
        labelName.value = "";
        labelDescription.value = "";
        labelPreviewText.innerHTML = "Label preview";
    }
}