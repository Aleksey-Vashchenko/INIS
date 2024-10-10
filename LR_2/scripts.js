window.onload = function() {
    // Получаем сохраненное имя футболки из localStorage
    const storedShirt = localStorage.getItem('selectedShirt');
    const imagesPathPrefix = "../LR_1/";

    // Текущее состояние
    if (storedShirt) {
        const selectedShirt = JSON.parse(storedShirt);
        let currentColor = Object.keys(selectedShirt.colors)[0] || 'default';  
        let currentSide = 'front';
        
        // Обновляем информацию на странице
        document.getElementById('shirt-name').textContent = selectedShirt.name;
        document.getElementById('shirt-price').textContent = selectedShirt.price;
        document.getElementById('shirt-description').textContent = selectedShirt.description;

        // Устанавливаем картинку по умолчанию (фронтальная сторона)
        

        // Добавляем обработчики для кнопок Front и Back
        document.getElementById('front-view').addEventListener('click', () => {
            currentSide = 'front';
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });

        document.getElementById('back-view').addEventListener('click', () => {
            currentSide = 'back';
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });

        // Генерируем кнопки цветов
        const colorOptionsDiv = document.getElementById('color-options');
        Object.keys(selectedShirt.colors).forEach(color => {
            const colorButton = document.createElement('button');
            colorButton.textContent = color;
            colorButton.style.backgroundColor = color;
            colorButton.classList.add('color-button');
            colorButton.setAttribute('data-color', color);

            // Устанавливаем картинку соответствующего цвета при клике
            colorButton.addEventListener('click', (event) => {
                currentColor = event.target.getAttribute('data-color');
                updateShirtImage(currentColor, currentSide,selectedShirt);
            });

            colorOptionsDiv.appendChild(colorButton);
            updateShirtImage(currentColor, currentSide,selectedShirt);
        });
    }

    function updateShirtImage(currentColor, currentSide,selectedShirt) {
        // Проверяем, есть ли такой цвет
        if (currentColor === "default") {
            // Если цвета нет, используем изображение по умолчанию
            document.getElementById('shirt-image').src = imagesPathPrefix + selectedShirt.default[currentSide];
        } else {
            // Устанавливаем картинку в зависимости от стороны (front/back) и цвета
            document.getElementById('shirt-image').src = imagesPathPrefix + selectedShirt.colors[currentColor][currentSide];
        }
    }
};
