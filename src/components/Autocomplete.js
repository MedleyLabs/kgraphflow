import React, { useState } from 'react';
import styled from 'styled-components';

import searchIcon from '../assets/search-icon.png';

const SearchBar = styled.div`
  font-family: 'Nunito', sans-serif;
  border: 0;
  outline: 0;
  font-size: 14px;
  color: #6a7072;
  text-align: left;
`

const AutoComplete = ({data, onTypeCallback, placeholder = 'Search'}) => {

    const [suggestions, setSuggestions] = useState(['Ventral posteromedial nucleus', 'Ventral tegmentum']);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(e.target.value);
        if (query.length > 1) {
            const filterSuggestions = data.filter(
                (suggestion) =>
                    suggestion.toLowerCase().indexOf(query) > -1
            );
            setSuggestions(filterSuggestions);
            setSuggestionsActive(true);
            onTypeCallback(query);
        } else {
            setSuggestionsActive(false);
        }
    };

    const onEnterCallback = () => {

    };

    const handleClick = (e) => {
        setSuggestions([]);
        setValue(e.target.innerText);
        setSuggestionsActive(false);
    };

    const handleKeyDown = (e) => {
        // UP ARROW
        if (e.keyCode === 38) {
            if (suggestionIndex === 0) {
                return;
            }
            setSuggestionIndex(suggestionIndex - 1);
        }
        // DOWN ARROW
        else if (e.keyCode === 40) {
            if (suggestionIndex - 1 === suggestions.length) {
                return;
            }
            setSuggestionIndex(suggestionIndex + 1);
        }
        // ENTER
        else if (e.keyCode === 13) {
            setSuggestionIndex(0);
            setSuggestionsActive(false);
            onEnterCallback(suggestions[suggestionIndex]);
            setValue('');
        }
    };

    const Suggestions = () => {
        return (
            <ul className="suggestions">
                {suggestions.map((suggestion, index) => {
                    return (
                        <li
                            className={index === suggestionIndex ? "suggestion-active" : "suggestion"}
                            key={index}
                            onClick={handleClick}
                        >
                            <span>{suggestion}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <SearchBar>
            <div className="autocomplete">
                <div className='autocomplete-searchbar'>
                    <input
                        className='autocomplete-input'
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <img className='autocomplete-img' src={searchIcon}/>
                </div>
                {suggestionsActive && <Suggestions/>}
            </div>
        </SearchBar>
    );

};

export default AutoComplete;