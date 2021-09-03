import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';

const CustomTextField = props => {
    const { name, required, label, defaultVal, xsLen, smLen } = props;
    const { control } = useFormContext()
    return (
        <Grid item xs={xsLen ? xsLen : 12} sm={smLen ? smLen : 6}>
            <Controller
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label={label}
                        required={required}
                        defaultValue={defaultVal}
                    />
                )}
                control={control}
                fullWidth
                name={name}
            />
        </Grid>
    )
}

export default CustomTextField;