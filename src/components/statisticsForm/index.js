import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StatsFormContainer } from "./styled";
export default function SearchForm({getSearchPayload}) {
  const [sortBy, setSortBy] = useState('popularity')
  const [language, setLanguage] = useState('EN')
  const [keyword, setKeyword] = useState('');
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  }
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  }
  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
  }
  const handleSearch = () => {
    getSearchPayload(language, keyword, sortBy);
    setKeyword('');
  }
  const handleRefresh = () => {
    setKeyword('');
    setSortBy('popularity');
    setLanguage('EN');
    getSearchPayload(null,null,null);
  }
  return (
    <StatsFormContainer>
      <FormControl class="column01">
        <FormLabel id="language">Language</FormLabel>
        <RadioGroup
          aria-labelledby="language"
          defaultValue="english"
          name="radio-buttons-group"
          value={language}
          onChange={handleChangeLanguage}
        >
          <FormControlLabel value="EN" control={<Radio />} label="English" />
          <FormControlLabel value="VN" control={<Radio />} label="Vietnamese" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column00">
        <FormLabel id="sortBy">Sort by</FormLabel>
        <RadioGroup
          aria-labelledby="sortBy"
          defaultValue="english"
          name="radio-buttons-group"
          value={sortBy}
          onChange={handleChangeSortBy}
        >
          <FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
          <FormControlLabel value="alphabet" control={<Radio />} label="Alphabet" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column02">
        <FormLabel id="word">Word</FormLabel>
        <br></br>
        <TextField value={keyword} onChange={handleChangeKeyword} id="word" label="Keyword" variant="outlined" style={{width: "100%"}}/>
      </FormControl>

      <FormControl class="column03">
        <Button variant="contained" size="large" onClick={handleSearch}>Search</Button>
        <br></br>
        <Button variant="outlined" size="large" style={{marginTop: 5}} onClick={handleRefresh}>Refresh</Button>
      </FormControl>
    </StatsFormContainer>
  );
}
