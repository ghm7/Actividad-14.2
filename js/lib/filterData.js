export const filterData = (value, array) => {
  const propName = [
    'budget',
    'genres',
    'id',
    'original_language',
    'overview',
    'popularity',
    'release_date',
    'revenue',
    'tagline',
    'title',
    'vote_average',
  ];

  if (typeof value !== 'string')
    throw new Error('First parameter must be a string');

  if (!Array.isArray(array))
    throw new Error('Second parameter must be an array');

  if (array.length === 0) throw new Error('The array cannot be empty');

  // This checks if the array has the right props
  propName.forEach((property, index) => {
    if (!array[0].hasOwnProperty(propName[index]))
      throw new Error(
        'The object in the array does not provide the right key values'
      );
  });

  return value !== ''
    ? array.filter(
        ({ title, overview, tagline, genres }) =>
          title.toLowerCase().includes(value.toLowerCase()) ||
          overview.toLowerCase().includes(value.toLowerCase()) ||
          tagline.toLowerCase().includes(value.toLowerCase()) ||
          genres.some(({ name }) => name.toLowerCase() === value.toLowerCase())
      )
    : [];
};
