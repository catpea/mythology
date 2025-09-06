import cytoscape from 'https://cdn.jsdelivr.net/npm/cytoscape@3.33.1/dist/cytoscape.esm.min.mjs';

const loadGraph = async () => {
  try {
    const response = await fetch('elements.json', { mode: 'no-cors' });
    const data = await response.json();

    const cy = cytoscape({
      container: document.getElementById('cy'),
      boxSelectionEnabled: false,
      autounselectify: true,
      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'content': 'data(name)',
          'text-valign': 'center',
          'color': 'white',
          'text-outline-width': 2,
          'text-outline-color': '#888',
          'background-color': '#888'
        })
        .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'
        }),
      elements: data,
      layout: {
        name: 'grid',
        padding: 10
      }
    });

    cy.on('tap', 'node', (event) => {
      try {
        window.open(event.target.data('href'));
      } catch (e) {
        window.location.href = event.target.data('href');
      }
    });
  } catch (error) {
    console.error('Failed to load graph:', error);
  }
};

loadGraph();
