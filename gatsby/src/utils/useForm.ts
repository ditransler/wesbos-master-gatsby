import React from 'react';
import { useState } from 'react';

type Defaults = {
    name: string;
    email: string;
};

const useForm = (defaults: Defaults) => {
    const [values, setValues] = useState<Defaults>(defaults);

    function updateValue(evt: React.ChangeEvent<HTMLInputElement>): void {
        // Check if its a number and convert
        let newValue: number | string = evt.target.value;
        if (evt.target.type === 'number') {
            newValue = parseInt(evt.target.value, 10);
        }
        setValues({
            // Copy the existing values into it
            ...values,
            // Update the new value that changed
            [evt.target.name]: newValue
        });
    }

    return { values, updateValue };
};

export default useForm;
