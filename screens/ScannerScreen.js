import React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useBarcodeScanner } from '../hooks/UseInventory';

export default function ScannerScreen() {
    const { fetchProduct, loading } = useBarcodeScanner();

    const handleBarcodeScan = async (barcode) => {
        const product = await fetchProduct(barcode);
        if (product) {
            console.log("Produto encontrado:", product.name);
        }
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Simular Scan (789123456789)" onPress={() => handleBarcodeScan('789123456789')} />
            )}
        </View>
    );
}