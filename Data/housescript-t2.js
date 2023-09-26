async function fetchHouses() {
    let url = "/Data/talotiedot.json";
    try {
        let result = await fetch(url);
        return await result.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderHouses() {
    let houses = await fetchHouses();
    
    // check console that json data is loaded correctly
    console.log(houses);
    
    // find empty houses div
    let housediv = document.getElementById("houses");
    
    // checkboxes div for sorting houses
    let sortDiv = document.getElementById("sortHouses");

    //add under 200m2 checkbox
    let sizeCheckbox = document.createElement("input");
    sizeCheckbox.type = "checkbox";
    sizeCheckbox.id = "under-200m2";
    
    //add label
    let sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "under-200m2";
    sizeLabel.textContent = "Alle 200m2";

    //addu under 1 000 000 euro
    let priceCheckbox = document.createElement("input");
    priceCheckbox.type = "checkbox";
    priceCheckbox.id = "under-1000000";

    //add label
    let priceLabel = document.createElement("label");
    priceLabel.htmlFor = "under-1000000";
    priceLabel.textContent = "Alle 1 000 000 €";
    
    sortDiv.appendChild(sizeCheckbox);
    sortDiv.appendChild(sizeLabel);
    sortDiv.appendChild(document.createElement("br"));
    sortDiv.appendChild(priceCheckbox);
    sortDiv.appendChild(priceLabel);

    // add eventlisteners for the checkboxes
    sizeCheckbox.addEventListener("change", updateDisplayedHouses);
    priceCheckbox.addEventListener("change", updateDisplayedHouses);
    
    function updateDisplayedHouses() {
        let sizeChecked = sizeCheckbox.checked;
        let priceChecked = priceCheckbox.checked;
        
        /* left over debug stuff
        console.log("Size Checkbox Checked: " + sizeChecked);
        console.log("Price Checkbox Checked: " + priceChecked);
        */
        
        let houses = document.querySelectorAll(".houseContainer");
        houses.forEach(house => {
            let size = parseFloat(house.querySelector(".houseSize").textContent);
            let price = parseFloat(house.querySelector(".price").textContent);
    
            // check prize and size before showing houses
            if (sizeChecked && priceChecked) {
                if (size < 200 && price < 1000000) {
                    house.style.display = "";
                } else {
                    house.style.display = "none";
                }
            } else if (sizeChecked) {
                if (size < 200) {
                    house.style.display = "";
                } else {
                    house.style.display = "none";
                }
            } else if (priceChecked) {
                if (price < 1000000) {
                    house.style.display = "";
                } else {
                    house.style.display = "none";
                }
            } else {
                house.style.display = "";
            }
        });
    }


    // loop through your JSON data
    houses.forEach(house => {
        
        // create a new house container  
        let housecontainer = document.createElement("div");
        housecontainer.className = "houseContainer";
        
        // create an image
        let image = document.createElement("img");
        image.src = house.image;
        image.className = "houseImage";
        
        // create p element as header
        let header = document.createElement("p");
        header.className = "header";
        let headerText = document.createTextNode(house.address);
        header.appendChild(headerText);
        
        // create p element as houseSize
        let houseSize = document.createElement("p");
        houseSize.className = "houseSize";
        let houseSizeText = document.createTextNode(house.size + " m2");
        houseSize.appendChild(houseSizeText);
        
        // create p element as description
        let description = document.createElement("p");
        description.className = "description";
        let descriptionText = document.createTextNode(house.text);
        description.appendChild(descriptionText);
        
        // create p element as price
        let price = document.createElement("p");
        price.className = "price";
        let formattedPrice = new Intl.NumberFormat('fi-FI').format(house.price);
        let priceText = document.createTextNode(formattedPrice);
        price.appendChild(priceText);
        
        // add created elements to container
        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(houseSize);
        housecontainer.appendChild(description);
        housecontainer.appendChild(price);
        
        // add house to div
        housediv.appendChild(housecontainer); 
    });
  }

  renderHouses();