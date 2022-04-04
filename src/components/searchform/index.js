import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SearchFormContainer } from "./styled";
export default function SearchForm() {
  return (
    <SearchFormContainer>
      <FormControl class="column01">
        <FormLabel id="source_language">Source Language</FormLabel>
        <RadioGroup
          aria-labelledby="source_language"
          defaultValue="english"
          name="radio-buttons-group"
        >
          <FormControlLabel value="english" control={<Radio />} label="English" />
          <FormControlLabel value="vietnamese" control={<Radio />} label="Vietnamese" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column02">
        <FormLabel id="word">Word</FormLabel>
        <br></br>
        <TextField id="word" label="Keyword" variant="outlined" />
        <RadioGroup
          aria-labelledby="word"
          defaultValue="match"
          name="radio-buttons-group"
        >
          <FormControlLabel value="match" control={<Radio />} label="Match" />
          <FormControlLabel value="phrase" control={<Radio />} label="Phrase" />
        </RadioGroup>
      </FormControl>

      <FormControl class="column03">
        <Button variant="outlined" size="large">Search</Button>
        <br></br>
        <Button variant="outlined" size="large">Refresh</Button>
      </FormControl>
    </SearchFormContainer>
  );
}
