import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/Login';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();

    return (
        <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Entrar" onPress={() => login(email, password)} />
            )}

            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}