import { getData, API } from '../js/lib/getData.js';
import { filterData } from './lib/filterData.js';
import { showList } from './lib/showList.js';
import { addEvents } from './lib/addEvents.js';

const list = document.querySelector('#list');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', async (e) => {
  const data = await getData(API);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { value } = form.querySelector('input');

    const filteredData = filterData(value, data.body);
    showList(filteredData, list);

    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach((item) => addEvents(item, data.body));
  });
});
