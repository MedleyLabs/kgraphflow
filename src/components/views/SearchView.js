import React, { useState } from 'react';
import styled from 'styled-components';

import Autocomplete from '../Autocomplete.js';

import logo from '../../assets/neurometa-logo.png';


const SiteLogo = styled.img`
  position: relative;
  top: 25px;
  left: 25px;
  height: 50px;
`

const ViewContainer = styled.div`
  font-family: 'Nunito', sans-serif;
`

const SearchContainer = styled.div`
  margin: 2em 1em 1em 1em;

  box-sizing: border-box;
  padding: 1em;
  text-align: center;
`

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1.5px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
`;

const Title = styled.div`
  font-size: 2em;
  text-align: center;
  margin-top: 0;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 20px;
`;

const Row = styled.div`
  width: 80%;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 20px;
  font-size: 14px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin-top: 0.5em;
  width: 100%;
`;

const CoordinateInput = styled.input`
  flex: 1;
  margin-right: 1em;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 50px;
  height: 20px;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }
`;

const CoordinateBox = styled.div`
  flex: 1;
  margin-right: 1em;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 50px;
  height: 20px;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }
`;

const AddButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 12px;
  border-radius: 50%;
  background-color: ${({active}) => active ? '#00a1ff' : 'gray'};
  color: white;
  cursor: pointer;

  &:before, &:after {
    content: '';
    position: absolute;
    background-color: white;
  }

  &:before {
    width: 10px;
    height: 2px;
  }

  &:after {
    width: 2px;
    height: 10px;
  }
`;

const RemoveButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 12px;
  border-radius: 50%;
  background-color: #00a1ff;
  color: white;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    background-color: white;
    width: 10px;
    height: 2px;
  }
`;

const Button = styled.button`
  margin: 1em 0.25em;
  font-size: 1.3em;
  padding: 0.5em 1em;
  border-radius: 12px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: ${props => props.active ? 'dodgerblue' : 'gray'};
`;

const SelectContainer = styled.div`
  margin-top: 6px;
  margin-bottom: 24px;
  width: 100%;
`;

const Select = styled.select`
  background-color: white;
  border: 0;
  border-bottom: 1px solid gray;
  font-family: 'Nunito', sans-serif;
  //margin-left: 14px;
  font-size: 15px;
`;

const TextRow = ({value}) => {

    const removeRow = () => {

    };

    return (
        <FlexContainer>
            <Row>{value}</Row>
            <RemoveButton onClick={removeRow}/>
        </FlexContainer>
    );
};

const CoordinatesRow = ({value}) => {

    const removeRow = () => {

    };

    return (
        <FlexContainer>
            <CoordinateBox>{value.x}</CoordinateBox>
            <CoordinateBox>{value.y}</CoordinateBox>
            <CoordinateBox>{value.z}</CoordinateBox>
            <RemoveButton onClick={removeRow} style={{marginLeft: 0}}/>
        </FlexContainer>
    );
};

const NetworkSearchBox = ({data, setData}) => {
    const [query, setQuery] = useState("");

    const handleAdd = () => {
        if (query) {
            setData([...data, query])
            setQuery("");
        }
    };

    return (
        <Box style={{marginRight: "1px solid #ccc"}}>
            <h2>Phenotypes</h2>
            {data.map((phenotype, idx) => <TextRow value={phenotype} key={idx}/>)}
            <FlexContainer>
                <Row>
                    <Autocomplete
                        data={['Chronic pain, orofacial', 'Chronic pain, spinal', 'Anxiety']}
                        onTypeCallback={(text) => {console.log("TEXT", text); setQuery(text)}}
                        placeholder='Search for observable traits...'
                    />
                </Row>
                <AddButton active={!!query} onClick={handleAdd}/>
            </FlexContainer>
        </Box>
    );
};

const RegionsSearchBox = ({data, setData}) => {
    const [query, setQuery] = useState("");

    const handleAdd = () => {
        if (query) {
            setData([...data, query])
        }
    };

    return (
        <Box>
            <h2>Neuronal Regions</h2>
            {data.map((region, idx) => <TextRow value={region} key={idx}/>)}
            <FlexContainer>
                <Row>
                    <Autocomplete
                        data={['Basolateral nucleus', 'Nucleus of the solitary tract']}
                        onTypeCallback={(text) => {console.log("TEXT", text); setQuery(text)}}
                        placeholder='Search for structural parts...'
                    />
                </Row>

                {/*<Input*/}
                {/*    type="text"*/}
                {/*    value={query}*/}
                {/*    onChange={e => setQuery(e.target.value)}*/}
                {/*    placeholder="Search for structural parts..."*/}
                {/*/>*/}
                <AddButton active={!!query} onClick={handleAdd}/>
            </FlexContainer>
        </Box>
    );
};


const CoordinatesSearchBox = ({data, setData}) => {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [z, setZ] = useState("");

    const handleAdd = () => {
        if (x && y && z) {
            setData([...data, {x: x, y: y, z: z}]);
        }
    };

    return (
        <Box>
            <h2>MNI Coordinates</h2>
            {data.map((coordinateSet, idx) => <CoordinatesRow value={coordinateSet} key={idx} />)}
            <FlexContainer>
                <CoordinateInput type="number" value={x} onChange={e => setX(e.target.value)} placeholder="X"/>
                <CoordinateInput type="number" value={y} onChange={e => setY(e.target.value)} placeholder="Y"/>
                <CoordinateInput type="number" value={z} onChange={e => setZ(e.target.value)} placeholder="Z"/>
                <AddButton active={!!(x && y && z)} onClick={handleAdd} style={{marginLeft: 0}}/>
            </FlexContainer>
        </Box>
    );
};

const SearchView = ({setView}) => {

    const [phenotypes, setPhenotypes] = useState([]);
    const [regions, setRegions] = useState([]);
    const [coordinates, setCoordinates] = useState([])

    const data = {
        'phenotypes': phenotypes,
        'regions': regions,
        'coordinates': coordinates
    };

    const [demoButtonActive, setDemoButtonActive] = useState(true);
    const [searchButtonActive, setSearchButtonActive] = useState(false);

    const runDemo = () => {
        setPhenotypes(['Chronic pain, orofacial', 'Anxiety', 'Thirst']);
        setRegions(['Cortex of insula', 'Median preoptic nucleus', 'Supraoptic nucleus', 'Vascular organ of the lamina terminalis']);
        setCoordinates([{x: 36, y: -26, z: 16}, {x: -14, y: -102, z: 4}, {x: 6, y: 0, z: 38}]);

        setDemoButtonActive(false);
        setSearchButtonActive(true);
    };

    const runSearch = () => {
        setView('flowConnectomeView', {networkIndices: [0, 1, 3], data: data})
    };

    return (
        <ViewContainer>
            <SiteLogo src={logo} alt='Composition logo'/>
            <SearchContainer style={{marginTop: 0}}>
                <SelectContainer>
                    <label htmlFor="ontology"><h3 style={{marginBottom: 10}}>Biomedical Ontology</h3></label>
                    <Select name="ontology" id="ontology-select">
                        <option value="foundational-model-of-anatomy">Foundational Model of Anatomy</option>
                        <option value="uberon">Uberon</option>
                        <option value="allen-brain-atlas">Allen Brain Atlas</option>
                    </Select>
                </SelectContainer>
                <SelectContainer style={{marginTop: 40, marginBottom: 40}}>
                    <label htmlFor="coordinate-system"><h3 style={{marginBottom: 10}}>Coordinate System</h3></label>
                    <Select name="coordinate-system" id="coordinate-system-select">
                        <option value="mni-152">MNI152</option>
                        <option value="fslr">fsLR</option>
                        <option value="fsaverage">fsaverage</option>
                        <option value="civet">CIVET</option>
                    </Select>
                </SelectContainer>
                <BoxContainer>
                    <NetworkSearchBox data={phenotypes} setData={setPhenotypes}/>
                    <RegionsSearchBox data={regions} setData={setRegions}/>
                    <CoordinatesSearchBox data={coordinates} setData={setCoordinates}/>
                </BoxContainer>
                <Button active={demoButtonActive} onClick={runDemo} style={{marginTop: 40}}>Demo Mode</Button>
                <Button active={searchButtonActive} onClick={runSearch}>Search</Button>
            </SearchContainer>
        </ViewContainer>
    );
};

export default SearchView;