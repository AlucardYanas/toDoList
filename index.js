//создаем и возвращаем заголовок приложения
function createAppTitle (title) {
    let appTitle = document.createElement('h2'); // создаем переменную appTitle и помещаем ДОМ элемент h2
    appTitle.innerHTML = title; // присваиваем св-ву innerHTML (внутреннему содержимому тега) title, который мы передаем в качестве аргумента
    return appTitle; // возвращаем заголовок с нужным нам текстом, возвращаем созданный DOM элемент
  } // при инициации приложения мы вызываем функцию и возвращаемое значение (DOM элемент) помещаем внутрь div id="todo-app"

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form'); //создаем сам элемент формы
    let input = document.createElement('input'); //создаем поле для ввода
    let buttonWrapper = document.createElement('div'); // в эту переменную мы передаем вспомогательный элемент, используемый для стилизации кнопки в bootstrap
    let button = document.createElement('button'); // создаем саму кнопку
    
    // расставляем атрибуты (https://learn.javascript.ru/dom-attributes-and-properties#html-atributy)
    form.classList.add('input-group', 'mb-3'); // устанавливаем два класса, чтобы правильно отрисовать форму (штпут содержим группу элементов формы и стилизуется бутстрапом, мб 3 оставляет отступ после формы )
    input.classList.add('form-control'); // класс формконтрол помогает бустрапу правильно отобразить элемент формы
    input.placeholder = 'Введите название нового дела';  // атрибут плейсхолдер пояснение для того что вводить в поле. Отображается всегда, когда в поле ничего не введено.
    buttonWrapper.classList.add('input-group-append'); // на div buttonWrapper добавляем класс input-group-append. он нужен для позициионирования элемента в форме справа от поля для ввода
    button.classList.add('btn', 'btn-primary'); // добавляем 2 класса. btn нужен, чтобы применить к кнопке все стили, которые нужны каждой кнопке в бутстрапе, btn-primary отрисует ее синим
    button.textContent = 'Добавить дело'; // через св-во textContent добавляет кнопке текст

    //объединяем DOM элементы в единую структуру
    buttonWrapper.append(button); // с помощью метода append вкладываем кнопку в div buttonWrapper (12 строка)
    form.append(input);  //  вкладываем input в элемент form (10строка)
    form.append(buttonWrapper);

    //возвращаем отдельно form а также все вложенные в нее сущности(чтобы иметь к ним доступ)
    return {
        form,
        input,
        button,
      };
  }
   // через функцию создаем и возвращаем список элементов ( вероятно здесь надо все поменять так, чтоба записывать новые дела в массив)
   function createTodoList () {
    let list = document.createElement('ol'); //!! создаем переменную лист и присваиваем ей новый элемент ol(нумерованный список)
    list.classList.add('list-group'); // добавляем аттрибут list-group для бутстрап
    return list;
  }
  // функция создает DOM елемент с делом. название дела задается в форме, поэтому его мы укажем как аргумент функции, чтобы связать отправку форму с названием и созданием списка
  function createTodoItem(name) { // создает эелмент списка дел и возвращает все необходимое для взаимодействия с этим элементом.
    let item = document.createElement('li'); // создаем элемент li, который затем помещаем в список
    let buttonGroup = document.createElement('div'); //  создаем и помещаем кнопки в элемент (группу кнопок), который красиво покажет их в одной группе
    let doneButton = document.createElement('div');
    let deleteButton = document.createElement('button');

    //устанавливаем стили (добавляем классы) для элемента списка (li), а также для размещения кнопок в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // 1ый - чтобы красиво показать элемент внутри списка, остальыне 3 класса для выравнивания внутри li
    item.textContent = name; // устанавливаем св-во textContent в то, что было передано в качестве аргумента в начале функции (параметр name)
    //SIC! используем textContent а не innerHTML, потому что внутри name могут быть спецсимволы, нет необходимости, чтобы это превращалось в теги
    //добавляем классы к элементу buttonGroup
    buttonGroup.classList.add('btn-group', 'btn-group-sm'); // 1-ый применяет стили к группе кнопок, 2-ой делает группу меньше по высоте, чтобы элемент не был слишком большим
    // настраиваем кнопки
    doneButton.classList.add('btn', 'btn-success'); //2-ой делает кнопку зеленой
    doneButton.textContent = 'Готово'; // устанавливаем текст: Готово
    deleteButton.classList.add('btn', 'btn-danger'); // делаем красной
    deleteButton.textContent = 'Удалить';

    //вкладываем кнопки в отдельный элемент (группу кнопок), чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup); // вкладываем в item (элемент li)

    //приложению нужен доступ к самому элементу и кнопкам, чтобы отрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };  
}

// вызываем функции, чтобы элементы были помещены в DOM. Для этого создаем обработчик событий DOMContentLoaded на document 
document.addEventListener('DOMContentLoaded', function() { // это необходимо, чтобы мы получили доступ к DOM дереву загрузившейся HTML страницы
    let container = document.getElementById('todo-app'); // создаем переменную container - div c id todo-appв котором я размещаю приложение

    // поочердно вызываем все созданные  3 функции 
    let todoAppTitle = createAppTitle('Список дел'); // здесь передаем аргумент в функцию в виде строки
    let todoItemForm = createTodoItemForm(); 
    let todoList = createTodoList();
    
// размещаем результат вызова функций внутри контейнера. createAppTitle и createTodoList вернут DOM елемент, который можно разместить
  container.append(todoAppTitle); 
  container.append(todoItemForm.form); // возвращаем объект в котором есть form, поэтому мы размещаем не сам todoItemForm, а сначала берем св-во form. см комментарий на 28 строке
  container.append(todoList);

  //регистрируем обработчик события submit на форме по нажатию на enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', function(e){
    //эта строчка необходима, чтобы предовратить стандартное действие браузера
    //мы не хотим, чтобы странице перезагружалась при отправке формы
    e.preventDefault();

    //проверяем есть ли значение внутри инпута и игнорируем создание элемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value){
      return;
    }

    let todoItem = createTodoItem(todoItemForm.input.value); // помещаем в элемент todoItem результат выполнения функции сreateTodoItem

      //добавляем обработчики по клику на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success'); // при нажатии на кнопку готово с помощью метода класс лист toggle добавляем или убираем класс из list-group-item-success (в бутстрапе будет красить эелмент в зеленый)
      });
      todoItem.deleteButton.addEventListener('click', function() { // на кнопку удаления вешаем обработчик, в котором спрашиваем пользователя переда удалением
        if (confirm('Вы уверены?')) { //Функция confirm отображает модальное окно с текстом вопроса question и двумя кнопками: Да и Отмена. вернет true если человек нажмет да
          todoItem.item.remove(); // в случае подтверждения - удаляем
        }
      });

      //создаем и добавляем в список новое дело(элемент) с названием из поля для ввода
      todoList.append(todoItem.item); // в item хранится сам элемент 
    //обнуляем значение в поле, чтобы не стирать его вручную
    todoItemForm.input.value = '';
  });
});
  