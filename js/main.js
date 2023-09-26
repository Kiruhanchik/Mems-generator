let imgSrc = '';

const selectImg = () => {
    let memImg = document.getElementById('file');
    if (memImg) {
        console.log(memImg);
        let reader = new FileReader();
        reader.onload = function(event) {
            let imageBase64 = event.target.result;
            if (imageBase64.includes("image")) {
                document.getElementById('mem-img').src = imageBase64;
                imgSrc = imageBase64;
            } else {
                alert('Загрузите картинку');
            }
        }
    reader.readAsDataURL(memImg.files[0]);
    }
}

const addText = () => {
    let text = document.createElement('input');
    text.setAttribute('placeholder', 'Введите текст для вашего мема');
    text.setAttribute('type', 'text');
    text.classList.add('input-text');
    document.getElementById('params').insertBefore(text, document.querySelector('#add-text'));
}

const createMem = () => {
    if (imgSrc.includes("image")) {
    document.getElementById('save-mem').style.display = 'block';
    let canvas = document.getElementById("your-mem");
    let context = canvas.getContext("2d");
    let dragging = false;
    let dragStartX, dragStartY;
    let image = new Image();
    image.src = imgSrc;
      
      // Установка размеров канваса в размеры изображения
    canvas.width = image.width;
    canvas.height = image.height;
      
      // Масштабирование изображения для заполнения канваса
      let imageScale = Math.min(canvas.width / image.width, canvas.height / image.height);
      let imageWidth = image.width * imageScale;
      let imageHeight = image.height * imageScale;
      let offsetX = (canvas.width - imageWidth) / 2;
      let offsetY = (canvas.height - imageHeight) / 2;
      context.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
    canvas.style.boxShadow = '10px 5px 5px rgb(198, 198, 198)';
    canvas.style.border = '2px solid black';

    context.font = "30px Arial";
    context.fillStyle = document.getElementById('input-text-color').value;
    context.fillText(document.getElementsByClassName('input-text')[0].value, 50, 50);

    canvas.addEventListener("mousedown", startDragging);

    function startDragging(event) {
        startX = event.clientX;
        startY = event.clientY;
        canvas.addEventListener("mousemove", dragText);
        canvas.addEventListener("mouseup", stopDragging);
    }

    function dragText(event) {
        let deltaX = event.clientX - startX;
        let deltaY = event.clientY - startY;

        // Очищаем canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        let image = new Image();
        image.src = imgSrc;
        
        // Установка размеров канваса в размеры изображения
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Масштабирование изображения для заполнения канваса
        let imageScale = Math.min(canvas.width / image.width, canvas.height / image.height);
        let imageWidth = image.width * imageScale;
        let imageHeight = image.height * imageScale;
        let offsetX = (canvas.width - imageWidth) / 2;
        let offsetY = (canvas.height - imageHeight) / 2;
        context.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
        canvas.style.boxShadow = '10px 5px 5px rgb(198, 198, 198)';
        canvas.style.border = '2px solid black';

        // Смещаем текст на новые координаты
        let newX = event.clientX + deltaX;
        let newY = event.clientY + deltaY;

        // Отрисовываем текст на новой позиции
        context.font = "30px Arial";
        context.fillStyle = document.getElementById('input-text-color').value;
        context.fillText(document.getElementsByClassName('input-text')[0].value, newX, newY);
    }

    function stopDragging() {
        canvas.removeEventListener("mousemove", dragText);
        canvas.removeEventListener("mouseup", stopDragging);
    }

    } else {
      alert('Заполните все поля!');
    }
}

const saveMem = () => {
    let link = document.createElement("a");
    link.download = "mem.png"; // Имя файла для сохранения

    // Конвертирование содержимого canvas в формат data URL
    let dataURL = document.getElementById('your-mem').toDataURL("image/png");

    // Назначение ссылки на содержимое data URL
    link.href = dataURL;

    // Нажатие на ссылку для запуска загрузки файла
    link.click();

    // Очистка ссылки
    link.remove();
}
 
window.onload = function() {
    document.getElementById('file').addEventListener('change', selectImg);
    document.getElementById('add-text').addEventListener('click', addText);
    document.getElementById('create-mem').addEventListener('click', createMem);
    document.getElementById('save-mem').addEventListener('click', saveMem);
}