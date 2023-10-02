let isArrowKeyPressed = false; // Track whether an arrow key is currently pressed
let selectedNameIndex = -1; // Define selectedNameIndex globally
let namediv; // Define namediv globally


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
    nameInput.addEventListener("keydown", handleKeyDown);
    nameInput.addEventListener("keyup", handleKeyUp);
    namediv = document.getElementById("nameSpace"); // Initialize namediv

    //let selectedNameIndex = -1;
}

async function renderNames() {
    let names = await fetchNames();
    
    // check console that json data is loaded correctly
    console.log(names);
    
    let searchText = document.getElementById("nameInput").value.toLowerCase();

    // remove names from div element before adding new one
    namediv.textContent = "";

    if (searchText === "") {
        return; // Do not show any results if input empty
    }

    // loop through JSON data
    names.forEach(name => {
        let lowerCaseName = name.toLowerCase();
        if (lowerCaseName.startsWith(searchText)) {
            // Check if the name is an exact match with the search
            if (lowerCaseName !== searchText) {
                // create p element as person
                let persons = document.createElement("p");
                persons.className = "person";
                let personsText = document.createTextNode(name);
                persons.appendChild(personsText);
                
                // add created elements to div
                namediv.appendChild(persons);
            }
        }
    });

    // Clear the namespace if the full name is in the search field
    if (names.includes(searchText)) {
        namediv.textContent = "";
    }
}

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
        // Up arrow: Select previous name
        if (!isArrowKeyPressed && selectedNameIndex > 0) {
            selectedNameIndex--;
            isArrowKeyPressed = true;
        }
    } else if (event.key === "ArrowDown") {
        // Down arrowkey: Select next name
        if (!isArrowKeyPressed && selectedNameIndex < document.querySelectorAll(".person").length - 1) {
            selectedNameIndex++;
            isArrowKeyPressed = true;
        }
    } else if (event.key === "Enter") {
        // Enter: Select current name and place it in the input field
        let selectedNameElement = document.querySelector(".person.selected");
        if (selectedNameElement) {
            selectedName = selectedNameElement.textContent;
            document.getElementById("nameInput").value = selectedName;
            document.getElementById("nameSpace").textContent = ""; // Empty text content

            event.preventDefault(); // Prevent the default behavior (form submission)
        }
    }

    highlightSelectedName(); // Highlight based on selectedNameIndex
}

function handleKeyUp(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        isArrowKeyPressed = false; // Reset the arrow key press flag when released
    }
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