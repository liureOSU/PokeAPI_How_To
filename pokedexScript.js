var doc = document;
var docBody = document.body;

doc.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    var pokeSubmit = doc.getElementById('pokeSubmit');
    
    pokeSubmit.addEventListener('click', function(event) {
        pokemonAPI();

    });
}

function pokemonAPI() {
    
    var oldRow = doc.getElementById("responseField");
    if (oldRow != null) {
        while (oldRow.hasChildNodes()) {
            oldRow.removeChild(oldRow.lastChild);
        }
    }
    
    console.log("Proceeding with Pokedex Request");
    var address = "https://pokeapi.co/api/v2/pokemon-species/";
    var pokemonName = doc.getElementById('pokemonName').value.toLowerCase();
    
    var req = new XMLHttpRequest();
    req.open('GET', address + pokemonName, true);
    
    req.onload = function() {
        if (req.status < 400 && req.status >= 200) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            
            // Create a new row.
            var resultBody = doc.getElementById('responseField');
            var newRow = doc.createElement('tr');
            newRow.id = "thisNewRow";
            resultBody.appendChild(newRow);

            var matrix0 = doc.createElement('td');
            newRow.appendChild(matrix0);
            
            // Pokemon number column.
            var matrix1 = doc.createElement('td');
            var pokemonNumber = doc.createTextNode(response.pokedex_numbers[response.pokedex_numbers.length - 1].entry_number);
            newRow.appendChild(matrix1);
            matrix1.appendChild(pokemonNumber);
            
            // Pokemon name column.
            var matrix2 = doc.createElement('td');
            var pokemonName = doc.createTextNode(response.names[0].name);
            newRow.appendChild(matrix2);
            matrix2.appendChild(pokemonName);
            
            // Pokemon genera column.
            var matrix3 = doc.createElement('td');
            var pokemonGenera = doc.createTextNode(response.genera[0].genus + " Pokémon");
            newRow.appendChild(matrix3);
            matrix3.appendChild(pokemonGenera);
            
            // Pokemon description column.
            var matrix4 = doc.createElement('td');
            var pokemonDesc = doc.createTextNode(response.flavor_text_entries[1].flavor_text);
            newRow.appendChild(matrix4);
            matrix4.appendChild(pokemonDesc);
            
            // Second API call on success.
            pokemon2API();               
        }
        else {
            alert("Error - Pokémon not found or request failed to complete.")
        }
    }
    req.send(null);
    event.preventDefault();

}

function pokemon2API() {  
                
    console.log("Proceeding with Pokedex-2 Request");
    var address = "https://pokeapi.co/api/v2/pokemon/";
    var pokemonName = doc.getElementById('pokemonName').value.toLowerCase();
    
    var req = new XMLHttpRequest();
    req.open('GET', address + pokemonName, true);
    
    req.onload = function() {
        if (req.status < 400 && req.status >= 200) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            
            // Find new row.
            var newRow = doc.getElementById('thisNewRow');
                while (newRow == null) {
                    console.log("waiting...")
                }
                    
            // Pokemon type column.
            var matrix5 = doc.createElement('td');
            var isDoubleTyped = response.types.length - 1;
            
            if (isDoubleTyped === 1) {
                var typeText = response.types[0].type.name.toUpperCase() + "/" + response.types[1].type.name.toUpperCase();
            } else if (isDoubleTyped === 0) {
                typeText = response.types[0].type.name.toUpperCase();
            }
            
            var pokemonType = doc.createTextNode(typeText);
            newRow.appendChild(matrix5);
            matrix5.appendChild(pokemonType);

            // Pokemon image column.
            var matrix6 = doc.createElement('td');
            var pokemonSprite = doc.createElement('img');
            pokemonSprite.src = response.sprites.front_default;
            
            newRow.appendChild(matrix6);
            matrix6.appendChild(pokemonSprite);
            
        }
    }
    req.send(null);
    event.preventDefault();
}
