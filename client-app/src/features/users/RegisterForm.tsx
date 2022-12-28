import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

const RegisterForm = () => {
    const { userStore } = useStore();

    return (
        <Formik initialValues={{displayname: '', username: '', email: '', password: '', error: ''}} 
        onSubmit={ 
            (values, {setErrors}) => userStore.register(values).catch( 
            error => setErrors({error: error}))} 
            validationSchema={Yup.object({
                displayname: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}>
            {({handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content="SignUp to Activites" color="teal" textAlign="center"></Header>
                    <MyTextInput placeholder="Display Name" name="displayname"></MyTextInput>
                    <MyTextInput placeholder="User Name" name="username"></MyTextInput>
                    <MyTextInput placeholder="Email" name="email"></MyTextInput>
                    <MyTextInput placeholder="Password" type="password" name="password"></MyTextInput>
                    <ErrorMessage name="error" render={ () => 
                    <ValidationError errors={errors.error} />}></ErrorMessage>
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} content="Register" fluid positive type="submit"></Button>
                </Form>
            )}
        </Formik>
    );
};

export default observer(RegisterForm);