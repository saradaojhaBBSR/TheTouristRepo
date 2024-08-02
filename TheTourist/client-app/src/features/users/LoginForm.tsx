import { Formik, Form } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";


export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: '' }}
            onSubmit={async (values) => {
                try {
                    await userStore.login(values);
                } catch (error) {
                    values.error = "Invalid email or password";
                }
            }}
        >
            {({ handleSubmit, isSubmitting, values }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to The Tourist' color='teal' textAlign='center' />
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <MyTextInput placeholder="Email" name='email' />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <MyTextInput placeholder="Password" name='password' type="password" />
                        {values.error && <Label style={{ marginBottom: 10 }} basic color='red' content={values.error} />}
                    </div>
                    <Button loading={isSubmitting} type="submit" className="ui button primary">Login</Button>
                </Form>
            )}
        </Formik>
    );
});