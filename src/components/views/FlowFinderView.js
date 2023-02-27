import {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import AutoComplete from '../Autocomplete.js';

import {theories} from "../../data/theoriesData";
import searchIcon from "../../assets/search-icon.png";
import upvote from '../../assets/triangle-up-rounded.svg';
import downvote from '../../assets/triangle-down-rounded.svg';

import UpvoteIcon from "../UpvoteIcon";
import DownvoteIcon from '../DownvoteIcon';

const Table = styled.div`
  font-family: 'Nunito', sans-serif;
  width: 1050px;
  margin: auto;
  margin-top: 200px;
`

const TableTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 30px;
`

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`

const TableColumn = styled.div`
`

const Highlighted = styled.span`
  background-color: #f3f3f3;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0 5px 0 5px;

  :hover {
    background-color: dodgerblue;
    color: #fcfcfc;
  }
`

const HeaderRow = styled.div`
  font-weight: bold;
`

const SearchBar = styled.input`
  margin-left: 5px;
  border: 0;
  outline: 0;
  font-size: 15px;
  color: #6a7072;
`

const Entry = ({name, authors, lastUpdated}) => {

    return (
        <TableRow>
            <TableColumn style={{width: 500}}
                         className={name !== 'Theory name' ? "highlight" : null}>{name}</TableColumn>
            <TableColumn style={{width: 350}}>{authors}</TableColumn>
            <TableColumn style={{width: 200}}>{lastUpdated}</TableColumn>
        </TableRow>
    );
}

function FlowFinderView(props) {

    const onEnterCallback = (event) => {
        let scene = theories.find(item => event === item.name);
        props.setViewName('flowVisualizerView');
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(theories);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const filteredData = theories.filter((row) =>
            row.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setData(filteredData)
    }, [searchQuery])

    return (
        <>
            {/*<SearchBar>*/}
            {/*    <AutoComplete data={theories.map(item => item.name)} onEnterCallback={onEnterCallback} placeholder='Search for theories'/>*/}
            {/*</SearchBar>*/}
            <Table>
                {/*<TableTitle>Most recent</TableTitle>*/}
                <div style={{marginBottom: 20, color: 'gray'}} className="highlight">
                    <img style={{height: 12, width: 12}} src={searchIcon}/>
                    <SearchBar type="text" id="name" name="name" placeholder="Search by keywords" onChange={handleSearch}/>
                </div>
                <HeaderRow>
                    <TableRow>
                        <TableColumn style={{width: 500}}>Theory name<UpvoteIcon/><DownvoteIcon/></TableColumn>
                        <TableColumn style={{width: 350}}>Authors<UpvoteIcon/><DownvoteIcon/></TableColumn>
                        <TableColumn style={{width: 200}}>Last updated<UpvoteIcon/><DownvoteIcon
                            fill="dodgerblue"/></TableColumn>
                    </TableRow>
                </HeaderRow>
                {data.map((item) => {
                    return (
                        <TableRow>
                            <TableColumn style={{width: 500}} className={item.name !== 'Theory name' ? "highlight" : null} onClick={onEnterCallback}>{item.name}</TableColumn>
                            <TableColumn style={{width: 350}}>{item.authors.map(author => <Highlighted>{author}</Highlighted>)}</TableColumn>
                            <TableColumn style={{width: 200}}>{item.lastUpdated}</TableColumn>
                        </TableRow>
                    )
                })}
                <TableRow style={{color: 'gray', borderBottom: 0, marginTop: 15}}>
                    <span className="highlight">↓ Load more</span>
                    <span style={{marginLeft: 20}} className="highlight">+ Start a new theory</span>
                </TableRow>
            </Table>
            }
        </>
    );
}

export default FlowFinderView;
