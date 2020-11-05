import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import { Auth } from 'aws-amplify';

const authReducer = (state, action) => {
    switch (action.type) {
    case 'signin':
        return { errorMessage: '', isAuthenticated: action.payload };
    case 'signout':
        return { token: null, errorMessage: '' };
    case 'add_error':
        return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    default:
        return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('Index');
    } else {
        navigate('Signin');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};


const signin = dispatch => async ({ email, password }) => {
    try {
        await Auth.signIn(email, password);
        dispatch({ type: 'signin', payload: true });
        navigate('Index');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something wrong signingIn' });
    }
};

const signup = () => {};
const signout = () => {};



export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);
