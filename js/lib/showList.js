export const showList = (array, parentElement) => {
  if (!Array.isArray(array))
    throw new Error('The first parameter must be an array');

  if (!(parentElement instanceof HTMLElement))
    throw new Error('The second parameter must be a HTMLElement');

  const HTMLToAppend = renderGroupList(array);
  parentElement.innerHTML = '';
  parentElement.innerHTML = HTMLToAppend;
};

export const renderGroupList = (array) => {
  let contentToAppend = '';

  array.forEach(({ id, title, tagline, vote_average }) => {
    const score = calculateStars(vote_average);
    const stars = renderStars(score);

    contentToAppend += `
        <a 
          href="#" 
          class="list-group-item bg-dark pe-auto"
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasTop" 
          aria-controls="offcanvasTop"
          id="${id}"
        >
          <div class="fs-5 fw-bold text-white">${title}</div>
          <div class="d-flex justify-content-between">
            <div class="text-secondary fst-italic">${tagline}</div>
            <div class="text-secondary">${stars}</div>
          </div>
        </a>
  `;
  });

  return contentToAppend;
};

export const calculateStars = (score) => {
  if (typeof score !== 'number')
    throw new Error('The parameter must be a string or a number');

  return Math.round(score / 2);
};

export const renderStars = (scoreRounded) => {
  if (typeof scoreRounded !== 'number')
    throw new Error('The parameter provided must be a number');

  let contentToAppend = '';

  for (let i = 0; i < scoreRounded; i++) {
    contentToAppend += `<img src="./icons/star-fill.svg" />`;
  }

  for (let i = scoreRounded; i < 5; i++) {
    contentToAppend += `<img src="./icons/star.svg" />`;
  }

  return contentToAppend;
};

export const setOffcanvasContent = (id, offcanvas, movieArrays) => {
  if (typeof id !== 'number')
    throw new Error('The first parameter provided must be a number');

  // Here goes the WIP logic for test

  if (!(movieArrays instanceof Array))
    throw new Error(
      'The third parameter provided must be an instance of array'
    );

  const { title, overview, genres, release_date, revenue, runtime, budget } =
    movieArrays.find((movie) => {
      return movie.id == id;
    });

  let genresToAppend = '';
  genres.forEach((genre, index) => {
    if (index === genres.length - 1) {
      genresToAppend += `<div>${genre.name}</div>`;
    } else {
      genresToAppend += `<div>${genre.name}</div>`;
      genresToAppend += `<div>-</div>`;
    }
  });

  const split = release_date.split('-');
  const year = split[0];

  console.log(year);

  const contentToAppend = `
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">${title}</h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body" id="offcanvasTopBody">${overview}</div>
  <hr />
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex gap-2 m-4">${genresToAppend}</div>
    <div class="dropdown me-4">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        More
      </button>
      <ul class="dropdown-menu">
        <div class="container">
          <div class="d-flex justify-content-between">
            <div>Año:</div>
            <div>${year}</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>Duración:</div>
            <div>${runtime} mins</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>Presupuesto:</div>
            <div>$${budget}</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>Ganancias:</div>
            <div>$${revenue}</div>
          </div>
        </div>
        
      </ul>
    </div>
  </div>
  `;

  offcanvas.innerHTML = contentToAppend;
};
