'use client';

import {
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from '@mui/material';
import { green } from '@mui/material/colors';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type CheckBoxesProps = {
  launched: boolean;
  unlaunched: boolean;
  showEndedSessions: boolean;
};

/**
 * @memberof ElectionSessions
 * @returns JSX for checkboxes
 */

function CheckBoxes(props: CheckBoxesProps) {
  const [state, setState] = useState({
    launched: props.launched,
    unlaunched: props.unlaunched,
    showEndedSessions: props.showEndedSessions,
  });
  const router = useRouter();

  const { launched, unlaunched, showEndedSessions } = state;
  // const { showEndedSessions } = props;
  const launchedFilterHandler = (url: string) => {
    if (launched && unlaunched) {
      return router.push(`${url}launched=true&unlaunched=true`);
    }
    if (!launched && !unlaunched) {
      return router.push(`${url}`);
    }
    if (launched) {
      return router.push(`${url}launched=true`);
    }
    if (unlaunched) {
      return router.push(`${url}unlaunched=true`);
    }
  };

  useEffect(() => {
    let url = `/admin/sessions${
      showEndedSessions ? '?showEndedSessions=true' : '?'
    }`;
    if (launched || unlaunched) {
      url = `/admin/sessions${
        showEndedSessions ? '?showEndedSessions=true&' : '?'
      }`;
    }

    launchedFilterHandler(url);
  }, [launched, unlaunched, showEndedSessions, launchedFilterHandler]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl
      sx={{ m: 3 }}
      component='fieldset'
      variant='standard'
      style={{
        margin: '0.8rem',
      }}
    >
      <FormGroup
        style={{
          flexDirection: 'row',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={launched}
              onChange={handleChange}
              name='launched'
              sx={{
                color: green[800],
                '&.Mui-checked': {
                  color: green[600],
                },
                '& .MuiSvgIcon-root': { fontSize: 24 },
              }}
            />
          }
          label={<p>Launched</p>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={unlaunched}
              onChange={handleChange}
              name='unlaunched'
              sx={{
                color: green[800],
                '&.Mui-checked': {
                  color: green[600],
                },
                '& .MuiSvgIcon-root': { fontSize: 24 },
              }}
            />
          }
          label={<p>Unlaunched</p>}
        />
      </FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={showEndedSessions}
            onChange={handleChange}
            name='showEndedSessions'
            sx={{
              color: green[800],
              '&.Mui-checked': {
                color: green[600],
              },
              '& .MuiSvgIcon-root': { fontSize: 24 },
            }}
          />
        }
        label={<p>Show Ended Sessions</p>}
      />
    </FormControl>
  );
}

export default CheckBoxes;
