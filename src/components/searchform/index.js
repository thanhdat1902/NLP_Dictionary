import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SearchFormContainer } from "./styled";
export default function SearchForm({getSearchPayload}) {
  const [searchType, setSearchType] = useState('match')
  const [language, setLanguage] = useState('EN')
  const [keyword, setKeyword] = useState('');
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  }
  const handleChangeSearchType = (event) => {
    setSearchType(event.target.value);
  }
  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
  }
  const handleSearch = () => {
    getSearchPayload(language, keyword, searchType);
    setKeyword('');
  }
  const handleRefresh = () => {
    setKeyword('');
    setSearchType('match');
    setLanguage('EN');
    getSearchPayload(null,null,null);
  }
  return (
    <SearchFormContainer>
      <FormControl class="column01">
        <FormLabel id="source_language">Source Language</FormLabel>
        <RadioGroup
          aria-labelledby="source_language"
          defaultValue="english"
          name="radio-buttons-group"
          value={language}
          onChange={handleChangeLanguage}
        >
          <FormControlLabel value="EN" control={<Radio />} label="English" />
          <FormControlLabel value="VN" control={<Radio />} label="Vietnamese" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column02">
        <FormLabel id="word">Word</FormLabel>
        <br></br>
        <TextField value={keyword} onChange={handleChangeKeyword} id="word" label="Keyword" variant="outlined" style={{width: "100%"}}/>
        <RadioGroup
          aria-labelledby="word"
          defaultValue="match"
          name="radio-buttons-group"
          row
          value={searchType}
          onChange={handleChangeSearchType}
        >
          <FormControlLabel value="match" control={<Radio />} label="Match" />
          <FormControlLabel value="phrase" control={<Radio />} label="Phrase" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column03">
        <Button variant="contained" size="large" onClick={handleSearch}>Search</Button>
        <br></br>
        <Button variant="outlined" size="large" style={{marginTop: 5}} onClick={handleRefresh}>Refresh</Button>
      </FormControl>
    </SearchFormContainer>
  );
}
