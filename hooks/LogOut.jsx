import React from 'react';
import { View, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../configsExports/firebaseconfig';

export function Logout() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert("Erro ao sair", error.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {/* No React Native, usamos title em vez de texto dentro da tag */}
            <Button
                title="Sair da Conta"
                onPress={handleLogout}
                color="#FF3B30"
            />
        </View>
    );
}