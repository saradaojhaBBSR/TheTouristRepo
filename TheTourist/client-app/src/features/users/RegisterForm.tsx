import { Formik, Form, ErrorMessage } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import ValidationError from "../activities/errors/ValidationError";


export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (

        <Formik
            initialValues={{ displayName: '', userName: '', email: '', password: '', error: '' }}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
            onSubmit={async (values, { setErrors }) => { userStore.register(values).catch(error => setErrors({ error })) }}
        >
            {({ handleSubmit, isSubmitting,errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to The Tourist' color='teal' textAlign='center' />
                    <div className="field">
                        <label htmlFor="displayName">Display Name</label>
                        <MyTextInput placeholder="Display Name" name='displayName' />
                    </div>
                    <div className="field">
                        <label htmlFor="userName">Username</label>
                        <MyTextInput placeholder="Username" name='userName' />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <MyTextInput placeholder="Email" name='email' />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <MyTextInput placeholder="Password" name='password' type="password" />                        
                    </div>
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationError errors={errors.error ? [errors.error] : []}/>}/>
                    <Button loading={isSubmitting} type="submit" disabled={!isValid || !dirty || isSubmitting} className="ui button primary">Register</Button>
                </Form>
            )}
        </Formik>
    );
});