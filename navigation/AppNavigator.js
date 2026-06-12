import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configsExports/firebaseconfig';


import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProductDetailsScreen from "../screens/ProductDetailScreen";
import AddProductScreen from "../screens/AddProdutoScreen";
const Stack = createStackNavigator();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) return null;

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                    <Stack.Screen name="AddProduct" component={AddProductScreen} />
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
}