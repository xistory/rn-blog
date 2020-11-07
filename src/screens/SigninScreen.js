import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
    const { state, signin, facebookSignin, clearErrorMessage } = useContext(Context);

    return (
            <View style={styles.container}>
            <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
            />
            <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
            />
            <Button title="Facebook Sign In" onPress={facebookSignin} />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SigninScreen;
