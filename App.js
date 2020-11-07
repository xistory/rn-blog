import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as BlogProvider } from './src/context/BlogContext';

import { setNavigator } from './src/navigationRef';

import Amplify from 'aws-amplify';
import config from './src/config';
import { Linking } from 'expo';
import * as WebBrowser from 'expo-web-browser';


const urlOpenerExpo = async (url, redirectUrl) => {
    console.log(">>>>>>>>> in urlOpener");
    // On Expo, use WebBrowser.openAuthSessionAsync to open the Hosted UI pages.
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

    console.log("Type");
    console.log(type);
    console.log(newUrl);

    if (type === 'success') {
        await WebBrowser.dismissBrowser();

        if (Platform.OS === 'ios') {
            return Linking.openURL(newUrl);
        }
    }

};

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    },
    oauth: {
        domain: config.oauth.DOMAIN,
        scope: config.oauth.SCOPE,
        redirectSignIn: config.oauth.REDIRECTSIGNIN,
        redirectSignOut: config.oauth.REDIRECTSIGNOUT,
        responseType: config.oauth.RESPONSETYPE,
        options: config.oauth.OPTIONS,
        urlOpener: urlOpenerExpo
    }
});

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        Signup: SignupScreen,
        Signin: SigninScreen
    }),
    mainFlow: createStackNavigator({
        Index: IndexScreen,
        Show: ShowScreen,
        Create: CreateScreen,
        Edit: EditScreen
    })
});


const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <BlogProvider>
            <AuthProvider>
                <App ref={navigator => { setNavigator(navigator) }} />
            </AuthProvider>
        </BlogProvider>
        );
};
