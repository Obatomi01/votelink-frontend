'use client';

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  FormControl,
  Radio,
  FormLabel,
} from '@mui/material';

import { useState, useEffect } from 'react';
import styles from '../../styles/vote/vote.module.scss';

const green = {
  800: ' #a7d1a7',
  600: ' #28a745',
};

type TitleFormProps = {
  categoryCandidates: string[];
  categoryTitle: '';
  onHandleForm: (form: any) => void;
};

function TitleForm(props: TitleFormProps) {
  const [value, setValue] = useState<String>('');

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setValue(value);

    const castedVote: any = {};
    castedVote[name] = value;

    props.onHandleForm(castedVote);
  };

  const onClearSelectionHandler = (event: any) => {
    setValue('');

    const name = props.categoryTitle;

    const castedVote: any = {};
    castedVote[name] = '';

    props.onHandleForm(castedVote);
  };

  return (
    <>
      <div className={styles['election--contents']}>
        <RadioGroup
          aria-label='gender'
          name={props.categoryTitle}
          value={value}
          onChange={handleChange}
        >
          {props.categoryCandidates.map((candidate: string, index: number) => (
            <FormControlLabel
              key={index}
              value={candidate}
              control={
                <Radio
                  sx={{
                    color: green[800],
                    '&.Mui-checked': {
                      color: green[600],
                    },
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                  }}
                />
              }
              label={<p>{candidate}</p>}
            />
          ))}
          <p onClick={onClearSelectionHandler}>Clear selection</p>
        </RadioGroup>
      </div>
    </>
  );
}

export default TitleForm;
