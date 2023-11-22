import { setOffcanvasContent } from './showList.js';

export const addEvents = (DOMElement, movieArray) => {
  DOMElement.addEventListener('click', (e) => {
    e.stopPropagation();

    const id = Number(DOMElement.id);
    const offcanvas = document.querySelector('#offcanvasTop');

    setOffcanvasContent(id, offcanvas, movieArray);
  });
};
