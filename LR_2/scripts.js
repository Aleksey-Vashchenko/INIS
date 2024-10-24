window.onload = function() {
    
    const storedShirt = localStorage.getItem('selectedShirt');
    const imagesPathPrefix = "../LR_1/";

    
    if (storedShirt) {
        const selectedShirt = JSON.parse(storedShirt);
        let currentColor = Object.keys(selectedShirt.colors)[0] || 'default';  
        let currentSide = 'front';
        
        document.getElementById('shirt-name').textContent = selectedShirt.name;
        document.getElementById('shirt-price').textContent = selectedShirt.price;
        document.getElementById('shirt-description').textContent = selectedShirt.description;
        

        document.getElementById('front-view').addEventListener('click', () => {
            currentSide = 'front';
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });

        document.getElementById('back-view').addEventListener('click', () => {
            currentSide = 'back';
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });

        const colorOptionsDiv = document.getElementById('color-options');
        Object.keys(selectedShirt.colors).forEach(color => {
            const colorButton = document.createElement('button');
            colorButton.textContent = color;
            colorButton.style.backgroundColor = color;
            colorButton.classList.add('color-button');
            colorButton.setAttribute('data-color', color);

            colorButton.addEventListener('click', (event) => {
                currentColor = event.target.getAttribute('data-color');
                updateShirtImage(currentColor, currentSide,selectedShirt);
            });

            colorOptionsDiv.appendChild(colorButton);
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });
    }

    function updateShirtImage(currentColor, currentSide,selectedShirt) {
        if (currentColor === "default") {
            document.getElementById('shirt-image').src = imagesPathPrefix + selectedShirt.default[currentSide];
        } else {
            document.getElementById('shirt-image').src = imagesPathPrefix + selectedShirt.colors[currentColor][currentSide];
        }
    }
};
