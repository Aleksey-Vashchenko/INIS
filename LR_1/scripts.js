window.onload = function() {
    const shirtsList = document.getElementById('shirts-list');
    const modal = document.getElementById('quick-view-modal');
    const modalShirtImage = document.getElementById('modal-shirt-image');
    const modalShirtName = document.getElementById('modal-shirt-name');
    const modalShirtDescription = document.getElementById('modal-shirt-description');
    const modalShirtPrice = document.getElementById('modal-shirt-price');
    const closeModal = document.querySelector('.close');
    modal.style.display='none';

    shirts.forEach((shirt,index) => {
        // Создание карточки для каждой футболки
        const shirtCard = document.createElement('div');
        shirtCard.classList.add('shirt-card');

        // Изображение футболки
        const shirtImage = document.createElement('img');
        shirtImage.src = shirt.colors.white.front;
        shirtImage.alt = shirt.name;
        shirtImage.classList.add('shirt-image');
        shirtCard.appendChild(shirtImage);

        // Название футболки
        const shirtName = document.createElement('h2');
        shirtName.textContent = shirt.name;
        shirtCard.appendChild(shirtName);

        // Доступные цвета
        const colorInfo = document.createElement('p');
        const colorCount = Object.keys(shirt.colors).length;
        colorInfo.textContent = `Available in ${colorCount} color${colorCount > 1 ? 's' : ''}`;
        shirtCard.appendChild(colorInfo);

        // Контейнер для кнопок
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Кнопка "Quick View"
        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.classList.add('btn');
        buttonsContainer.appendChild(quickViewButton);

        // Кнопка "See Page"
        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        seePageButton.classList.add('btn');
        buttonsContainer.appendChild(seePageButton);

        shirtCard.appendChild(buttonsContainer);
        shirtsList.appendChild(shirtCard);

        // Обработчик для Quick View
        quickViewButton.addEventListener('click', () => {
            modal.style.display = 'block';
            modalShirtImage.src = shirt.default.front;
            modalShirtName.textContent = shirt.name;
            modalShirtDescription.textContent = shirt.description;
            modalShirtPrice.textContent = shirt.price;
        });
        seePageButton.addEventListener('click', function() {
            const shirtNumber = index; // Получаем имя футболки из data-атрибута кнопки
            const stringShirt = JSON.stringify(shirt);
            localStorage.setItem('selectedShirt', stringShirt);
            window.location.href = '../LR_2/index.html'; // Переходим на страницу с деталями
            
        });
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}
