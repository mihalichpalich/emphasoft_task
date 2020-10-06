import React from 'react';
import {Formik, useField, Form} from "formik";
import * as Yup from 'yup';

import {Styles} from "./Styles";

const CustomTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type="text" className="text-input" {...field} {...props}/>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    )
};

const App = () => {
    return (
        <Styles>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .min(1, 'Must be at least 1 character')
                        .max(150, 'Must be 150 characters or less')
                        .required('Required'),
                    password: Yup.string()
                        .min(1, 'Must be at least 1 character')
                        .max(128, 'Must be 128 characters or less')
                        .required('Required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false)
                    }, 3000)
                }}
            >
                {props => (
                    <Form>
                        <h1>Sign Up</h1>
                        <CustomTextInput label="Username" name="username" type="text"/>
                        <CustomTextInput label="Password" name="password" type="password"/>
                        <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
                    </Form>
                )}
            </Formik>
        </Styles>
    );
};

export default App;
