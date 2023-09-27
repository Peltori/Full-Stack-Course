async function fetchNames() {
    let url = "/Data/names.json";
    try {
        let result = await fetch(url);
        return await result.json();
    } catch (error) {
        console.log(error);
    }
}

function init(){
    let nameInput = document.getElementById("nameInput");
    nameInput.addEventListener("keyup", renderNames);
}

async function renderNames() {
    let names = await fetchNames();
    
    // check console that json data is loaded correctly
    console.log(names);
    
    let searchText = document.getElementById("nameInput").value.toLowerCase();

    // find empty div
    let namediv = document.getElementById("nameSpace");

    // remove names from div element before adding new one
    while (namediv.firstChild) {
        namediv.removeChild(namediv.firstChild);
    }

    if (searchText === "") {
        return; // Do not show any results if input empty
    }

    // loop through JSON data
    names.forEach(name => {
        let lowerCaseName = name.toLowerCase();
        if (lowerCaseName.startsWith(searchText)) {
            // create p element as person
            let persons = document.createElement("p");
            persons.className = "person";
            let personsText = document.createTextNode(name);
            persons.appendChild(personsText);
            
            // add created elements to div
            namediv.appendChild(persons);
        }
    });
  }

function handleKeyPress(event) {
    if (event.key === "ArrowUp") {
        // Up arrow: Select previous name
        if (selectedNameIndex > 0) {
            selectedNameIndex--;
            highlightSelectedName();
        }
    } else if (event.key === "ArrowDown") {
        // Down arrowkey: Select next name
        if (selectedNameIndex < document.querySelectorAll(".person").length -1) {
            selectedNameIndex++;
            highlightSelectedName();
        }
    } else if (event.key === "Enter") {
        // Enter: Select current name and place it to the input field
        let selectedNameElement = document.querySelector(".person.selected");
        if (selectedNameElement) {
            document.getElementById("nameInput").value = selectedNameElement.textContent;
            document.getElementById("nameSpace").textContent = ""; // Empty text content
        }
    }

    highlightSelectedName();
}

function highlightSelectedName() {
    let nameElements = document.querySelectorAll(".person");
    nameElements.forEach((element, index) => {
        if (index === selectedNameIndex) {
            element.classList.add("selected");
        } else {
            element.classList.remove("selected");
        }
    });
}

let selectedNameIndex = -1;