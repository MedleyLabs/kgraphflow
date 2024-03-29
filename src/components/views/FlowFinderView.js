import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { theories } from "../../data/theoriesData";
import searchIcon from "../../assets/search-icon.png";
import UpvoteIcon from "../svg/UpvoteIcon";
import DownvoteIcon from '../svg/DownvoteIcon';
import logo from "../../assets/molecular-human-logo.png";

const Table = styled.div`
  font-family: 'Nunito', sans-serif;
  width: 1200px;
  margin: auto;
  margin-top: 150px;
`

const TableHeader = styled.span`
  color: #aeb2b3;
  margin-right: 20px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;

  :hover {
    color: dodgerblue;
  }
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
  font-family: 'Nunito', sans-serif;
  margin-left: 5px;
  border: 0;
  outline: 0;
  font-size: 15px;
  color: #6a7072;
`

const StarMargin = styled.span`
  position: relative;
  top: -1px;
`

const SiteLogo = styled.img`
  position: relative;
  top: 20px;
  left: 20px;
  height: 50px;
`

const FillableStar = ({number}) => {

    const [isFilled, setIsFilled] = useState(false);

    return (
        <span onClick={() => {setIsFilled(!isFilled)}}>
            { isFilled
                ? <><StarMargin>★</StarMargin>{(number+1).toString()}</>
                : <><StarMargin>☆</StarMargin>{number.toString()}</>
            }
        </span>
    )
}

function FlowFinderView(props) {

    const onEnterCallback = (event) => {
        // let scene = theories.find(item => event === item.name);
        props.setView('flowVisualizerView', {});
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
            <SiteLogo src={logo} alt='Composition logo'/>
            {/*<SearchBar>*/}
            {/*    <AutoComplete data={theories.map(item => item.name)} onEnterCallback={onEnterCallback} placeholder='Search for theories'/>*/}
            {/*</SearchBar>*/}
            <Table>
                {/*<TableTitle>Most recent</TableTitle>*/}
                <div style={{marginBottom: 20, color: 'gray'}} className="highlight">
                    <TableHeader>Filter</TableHeader>
                    <TableHeader>Sort</TableHeader>
                    <img style={{height: 12, width: 12}} src={searchIcon} alt="Search icon"/>
                    <SearchBar type="text" id="name" name="name" placeholder="Search by keywords" onChange={handleSearch}/>
                </div>
                <HeaderRow>
                    <TableRow>
                        <TableColumn style={{width: 55}}><UpvoteIcon marginLeft={0}/><DownvoteIcon fill="dodgerblue"/></TableColumn>
                        <TableColumn style={{width: 600}}>Theory name<UpvoteIcon/><DownvoteIcon/></TableColumn>
                        <TableColumn style={{width: 350}}>Authors<UpvoteIcon/><DownvoteIcon/></TableColumn>
                        <TableColumn style={{width: 200}}>Last updated<UpvoteIcon/><DownvoteIcon/></TableColumn>
                    </TableRow>
                </HeaderRow>
                {data.map((item) => {
                    return (
                        <TableRow>
                            <TableColumn style={{width: 55}}><FillableStar number={item.stars}/></TableColumn>
                            <TableColumn style={{width: 600}} className={item.name !== 'Theory name' ? "highlight" : null} onClick={onEnterCallback}>{item.name}</TableColumn>
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
        </>
    );
}

export default FlowFinderView;
