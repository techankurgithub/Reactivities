import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

interface Props {
    placeholder: string;
    name: string;
    label?: string
}

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker {...field} {...props} selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)} ></DatePicker>
            { meta.touched && meta.error ? (
                <Label basic color="red" content={meta.error}></Label>
            ) : null}
        </Form.Field>
    );
};

export default MyDateInput;