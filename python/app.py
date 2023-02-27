import os
import wget

from flask import Flask, jsonify, request
from flask_cors import CORS
from owlready2 import (
    default_world,
    get_namespace,
    get_ontology,
)

app = Flask(__name__)
CORS(app)

if not os.path.exists('fma.owl'):
    print('Downloading .owl file for FMA...')
    url = 'https://data.bioontology.org/ontologies/FMA/submissions/29/download?apikey=8b5b7825-538d-40e0-9e9e-5ab9274a9aeb'
    wget.download(url)

onto = get_ontology('file://fma.owl').load()
obo = get_namespace('http://purl.org/sig/ont/fma/')


def parse_data(entity_name):

    properties = list(default_world.sparql(f'''
       SELECT ?y
       {{ ?x rdfs:label "{entity_name}" .
         ?x rdfs:subClassOf* ?y }}
    '''))

    data = {
        'name': entity_name,
        'arterial_supply': [],
        'children': [],
        'parents': [],
        'receives_input_from': [],
        'sends_output_to': [],
    }

    for property in properties:

        property = property[0]

        if str(property).startswith('fma.receives_input_from'):
            value = property.__dict__['value']
            label = getattr(obo, str(value)[4:]).label[0]
            data['receives_input_from'].append(label)

        elif str(property).startswith('fma.sends_output_to'):
            value = property.__dict__['value']
            label = getattr(obo, str(value)[4:]).label[0]
            data['sends_output_to'].append(label)

        elif str(property).startswith('fma.arterial_supply'):
            value = property.__dict__['value']
            label = getattr(obo, str(value)[4:]).label[0]
            data['arterial_supply'].append(label)

        elif str(property).startswith('fma.regional_part_of'):
            value = property.__dict__['value']
            label = getattr(obo, str(value)[4:]).label[0]
            data['parents'].append(label)

        elif str(property).startswith('fma.regional_part'):
            value = property.__dict__['value']
            label = getattr(obo, str(value)[4:]).label[0]
            child = parse_data(label)
            data['children'].append(child)

    data['arterial_supply'].sort()
    data['parents'].sort()
    data['receives_input_from'].sort()
    data['sends_output_to'].sort()

    data['children'] = sorted(data['children'], key=lambda d: d['name'])

    return data

@app.route('/get_data', methods=['POST'])
def get_data():
    entity_name = request.json.get('entity_name')
    data = parse_data(entity_name)
    response = jsonify(data)
    return response

if __name__ == '__main__':
    app.run(debug=True)
