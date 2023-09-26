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