const rdflib = require('rdflib');

const file = 'path/to/your/file.rdf';
const store = rdflib.graph();
rdflib.parse(file, store, 'http://example.org/', 'text/turtle');