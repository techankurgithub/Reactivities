import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
    const { userStore } = useStore();
    
    return (
        <Formik initialValues={{email: '', password: '', error: ''}} onSubmit={ (values, {setErrors}) => userStore.login(values).catch( 
            error => setErrors({error: "Invalid email or password"}))}>
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content="Login to Activites" color="teal" textAlign="center"></Header>
                    <MyTextInput placeholder="Email" name="email"></MyTextInput>
                    <MyTextInput placeholder="Password" type="password" name="password"></MyTextInput>
                    <ErrorMessage name="error" render={ () => 
                    <Label style={{marginBottom: '10'}} basic color="red" content={errors.error}></Label>}></ErrorMessage>
                    <Button loading={isSubmitting} content="Login" fluid positive type="submit"></Button>
                </Form>
            )}
        </Formik>
    );
};

export default observer(LoginForm);