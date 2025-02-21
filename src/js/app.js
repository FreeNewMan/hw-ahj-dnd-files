// import CardForm from './components/CardForm';
import AddButton from './components/AddButton';
import StateColumn from './components/StateColumn';
import CardForm from './components/CardForm';

// Разметка колонок
const leftCol = document.querySelector('.state-column.left');
const leftcaption = 'Сделать!';

const middleCol = document.querySelector('.state-column.middle');
const middlecaption = 'В процессе';

const rightCol = document.querySelector('.state-column.right');
const rightcaption = 'Готово';

const getStorageData = (prm) => {
  let sData = [];
  const textJson = localStorage.getItem(prm);
  try {
    sData = JSON.parse(textJson);
  } catch (error) {
    // console.log(error);
    return [];
  }
  return sData || [];
};

document.addEventListener('DOMContentLoaded', () => {
  // Считываение данных из localStorage
  let leftData = [];
  let middleData = [];
  let rightData = [];

  leftData = getStorageData('leftCol');
  middleData = getStorageData('middleCol');
  rightData = getStorageData('rightCol');

  // Если в localStorage ничего нет
  if (leftData.length === 0) {
    leftData = [
      { id: 1, content: 'Задача 1' },
      { id: 2, content: 'Задача 2' },
      { id: 3, content: 'Задача 3' },
      { id: 4, content: 'Задача 4' },
      { id: 5, content: 'Задача 5' },
    ];
  }

  if (middleData.length === 0) {
    middleData = [
      { id: 1, content: 'Задача 12' },
      { id: 2, content: 'Задача 22' },
      { id: 3, content: 'Задача 32' },
      { id: 4, content: 'Задача 42' },
      { id: 5, content: 'Задача 52' },
    ];
  }

  if (rightData.length === 0) {
    rightData = [
      { id: 1, content: 'Задача 13' },
      { id: 2, content: 'Задача 23' },
      { id: 3, content: 'Задача 33' },
      { id: 4, content: 'Задача 43' },
      { id: 5, content: 'Задача 53' },
    ];
  }

  /// /
  /// Инициализация колонок и кнопок

  const leftStateCol = new StateColumn(leftCol, leftcaption, leftData);
  leftStateCol.bindToDOM();
  // Кнопка Добавить карточку левой панели
  const addButtonSelectorLeft = leftCol.querySelector('.state-footer');
  const addButtonLeft = new AddButton(addButtonSelectorLeft, leftStateCol, CardForm);
  addButtonLeft.bindToDOM();

  const middleStateCol = new StateColumn(middleCol, middlecaption, middleData);
  middleStateCol.bindToDOM();
  // Кнопка Добавить карточку средней панели
  const addButtonSelectormiddle = middleCol.querySelector('.state-footer');
  const addButtonmiddle = new AddButton(addButtonSelectormiddle, middleStateCol, CardForm);
  addButtonmiddle.bindToDOM();

  const rightStateCol = new StateColumn(rightCol, rightcaption, rightData);
  rightStateCol.bindToDOM();
  // Кнопка Добавить карточку правой панели
  const addButtonSelectorright = rightCol.querySelector('.state-footer');
  const addButtonright = new AddButton(addButtonSelectorright, rightStateCol, CardForm);
  addButtonright.bindToDOM();

  // Перетаскивание

  let actualElement;
  let mouseUpItem;
  let leaveItem;
  let comeTopItem;
  let prevClientX;
  let prevClientY;

  const addLeaveItem = (draggedItem) => {
    const leaItem = document.createElement('li');
    leaItem.classList.add('items-item-leave');
    draggedItem.after(leaItem);
    return leaItem;
  };

  const removeLeaveItem = () => {
    const leaItem = document.querySelector('.items-item-leave');
    if (leaItem) {
      leaItem.remove();
    }
  };

  const removeComeItem = () => {
    const leaItem = document.querySelector('.items-item-come');
    if (leaItem) {
      leaItem.remove();
    }
  };

  const addComeItem = (overTopItem, prm) => {
    const comeItem = document.createElement('li');
    comeItem.classList.add('items-item-come');

    // console.log(overTopItem.previousElementSibling);

    if (prm === 0) {
      if (overTopItem.previousElementSibling && !Array.from(overTopItem.previousElementSibling.classList).includes('items-item-come')) {
        overTopItem.before(comeItem);
      }
    }

    if (prm === 1) {
      if (overTopItem.nextElementSibling && !Array.from(overTopItem.nextElementSibling.classList).includes('items-item-come')) {
        overTopItem.after(comeItem);
      }
    }

    if (prm === 2) {
      overTopItem.prepend(comeItem);
    }

    if (prm === 3) {
      overTopItem.appendChild(comeItem);
    }

    if (comeItem) {
      const sibNext = comeItem.nextElementSibling;
      const sibPrev = comeItem.previousElementSibling;

      if (sibNext && sibNext.nextElementSibling && sibNext.nextElementSibling.className === 'items-item-leave') {
        sibNext.nextElementSibling.remove();
      }

      if (sibPrev && sibPrev.className === 'items-item-leave') {
        sibPrev.remove();
      }
    }

    return comeItem;
  };

  const onMouseOver = (e) => {
    actualElement.style.top = `${actualElement.offsetTop - (prevClientY - e.clientY)}px`;
    actualElement.style.left = `${actualElement.offsetLeft - (prevClientX - e.clientX)}px`;
    prevClientX = e.clientX;
    prevClientY = e.clientY;

    const curStateColEl = e.target.closest('.state-column');
    if (curStateColEl) {
      if (e.target.className === 'item-text') {
        mouseUpItem = e.target.parentElement;
      } else {
        mouseUpItem = e.target;
      }

      if (mouseUpItem.className === 'items-item') {
        const topSide = mouseUpItem.offsetTop;
        const bottomSide = mouseUpItem.offsetTop + mouseUpItem.offsetHeight;

        // Ближе к верхней стороне карточки

        if ((e.clientY - topSide) <= (bottomSide - e.clientY)) {
          removeComeItem();
          comeTopItem = addComeItem(mouseUpItem, 0);
        } else {
          removeComeItem();
          comeTopItem = addComeItem(mouseUpItem, 1);
        }

        comeTopItem.style.height = leaveItem.style.height;
      }

      if (e.target.className === 'state-header') {
        mouseUpItem = e.target.parentElement.querySelector('.items');
        removeComeItem();
        comeTopItem = addComeItem(mouseUpItem, 2);
        comeTopItem.style.height = leaveItem.style.height;
      }

      if (e.target.className === 'state-footer') {
        mouseUpItem = e.target.parentElement.querySelector('.items');
        removeComeItem();
        comeTopItem = addComeItem(mouseUpItem, 3);
        comeTopItem.style.height = leaveItem.style.height;
      }
    }
  };

  const onMouseUp = () => {
    if (comeTopItem) {
      comeTopItem.replaceWith(actualElement);
    }

    actualElement.classList.remove('dragged');
    actualElement.style = undefined;
    actualElement = undefined;
    removeLeaveItem();

    document.querySelector('.container').style = null;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
  };

  document.querySelectorAll('.items').forEach((itm) => {
    itm.addEventListener('mousedown', (e) => {
      e.preventDefault();

      prevClientX = e.clientX;
      prevClientY = e.clientY;

      if (e.target.className === 'item-text') {
        actualElement = e.target.parentElement;
      } else {
        actualElement = e.target;
      }

      if (actualElement.className === 'items-item') {
        const prevWidth = `${actualElement.offsetWidth - 20}px`;
        const prevHeight = `${actualElement.offsetHeight}px`;
        const prevTop = actualElement.offsetTop;
        const prevLeft = actualElement.offsetLeft;

        actualElement.classList.add('dragged');
        actualElement.style.width = prevWidth;
        actualElement.style['max-width'] = prevWidth;

        actualElement.style.cursor = 'grabbing';
        actualElement.style.top = `${prevTop}px`;
        actualElement.style.left = `${prevLeft}px`;

        leaveItem = addLeaveItem(actualElement);
        leaveItem.style.height = prevHeight;

        document.querySelector('.container').style.cursor = 'grabbing';

        document.documentElement.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseover', onMouseOver);
      }
    });
  });
});

// Сохрнание в LocalStorage
const saveToStorageData = (objUI, prmId) => {
  const contentNodelist = objUI.querySelectorAll('.item-text');
  const arrData = Array.from(contentNodelist);
  const jData = arrData.map((el, i) => ({ id: i, content: el.innerText }));
  localStorage.setItem(prmId, JSON.stringify(jData));
};

window.addEventListener('beforeunload', () => {
  saveToStorageData(leftCol, 'leftCol');
  saveToStorageData(middleCol, 'middleCol');
  saveToStorageData(rightCol, 'rightCol');
});
