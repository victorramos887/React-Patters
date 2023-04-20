import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';


const MyTextField = React.forwardRef(({name, control, defaultValue, label, type, error, helperText}, ref) => {
  return (
    <div>
      <Controller 
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField 
            {...field}
            id={name}
            label={label}
            type={type}
            error={error}
            helperText={helperText}
            ref={ref}
          />
        )}
      />
    </div>
  )
})

export default MyTextField

