import { useState } from "react";

import searchIcon from '../assets/search-icon.png';

const AutoComplete = ({ data, onEnterCallback, placeholder='Search' }) => {

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
    } else {
      setSuggestionsActive(false);
    }
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
        <img className='autocomplete-img' src={searchIcon} />
      </div>
      {suggestionsActive && <Suggestions />}
    </div>
  );

};

export default AutoComplete;