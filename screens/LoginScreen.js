import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, Button} from 'react-native';
import { Login } from '../hooks/Login';

export default function LoginScreen() {
    const { login, loading } = Login();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao OrgCasas</Text>
            <Text style={styles.subtitle}>Gerencie seu lar de forma inteligente.</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#4285F4" />
            ) : (
                <Button
                    title="Continuar com Google"
                    onPress={login}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 30 }
});