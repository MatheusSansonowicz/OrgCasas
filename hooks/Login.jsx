// src/hooks/Login.js
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../configsExports/firebaseconfig';
WebBrowser.maybeCompleteAuthSession();
export const Login = () => {
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '387368700143-483t02gh6uupl3nvibgbqducd22u1kch.apps.googleusercontent.com', // Precisa do Client ID gerado no Google Cloud
    });

    const login = async () => {
        setLoading(true);
        try {
            await promptAsync();
        } catch (error) {
            console.error("Erro ao abrir o login do Google:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .catch((error) => console.error("Erro ao autenticar no Firebase:", error))
                .finally(() => setLoading(false));
        } else if (response?.type === 'dismiss' || response?.type === 'cancel') {
            setLoading(false);
        }
    }, [response]);

    return { login, loading };
};