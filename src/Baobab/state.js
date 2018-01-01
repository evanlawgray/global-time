import Baobab from 'baobab';

const tree = new Baobab({locations: []});

tree.on('update', e => {
  const eventData = e.data;

  console.log('Current data:', eventData.currentData);
  console.log('Previous data:', eventData.previousData);
  console.log('Transaction details:', eventData.transaction);
  console.log('Affected paths', eventData.paths);
});

export const locationsCursor = tree.select('locations');

export default tree;



