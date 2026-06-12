import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

import { ProductDatabase } from '../services/ProductDatabase';

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params || {};

    const [quantidade, setQuantidade] = useState(product?.quantidade || 1);

    const handleAumentar = () => setQuantidade(quantidade + 1);
    const handleDiminuir = () => {
        if (quantidade > 0) setQuantidade(quantidade - 1);
    };

    const handleSalvar = async () => {
        if (!product?.id && product?.id !== 0) {
            Alert.alert("Erro", "Produto sem ID válido para atualização.");
            return;
        }

        try {
            // Supondo que você crie essa função no ProductDatabase
            await ProductDatabase.updateQuantidade(product.id, quantidade);
            Alert.alert("Sucesso", "Quantidade atualizada no estoque!");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            Alert.alert("Erro", "Não foi possível atualizar o produto.");
        }
    };


    const handleExcluir = () => {
        Alert.alert("Atenção", "Deseja mesmo excluir este produto?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        if (product?.id || product?.id === 0) {
                            await ProductDatabase.delete(product.id);
                            navigation.goBack();
                        }
                    } catch (error) {
                        console.error("Erro ao excluir:", error);
                        Alert.alert("Erro", "Não foi possível excluir o produto.");
                    }
                }
            }
        ]);
    };

    if (!product) {
        return (
            <View style={styles.containerCenter}>
                <Text>Nenhum produto selecionado.</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* CABEÇALHO DO PRODUTO */}
            <View style={styles.header}>
                <Text style={styles.title}>{product.nome || 'Produto Sem Nome'}</Text>
                <Text style={styles.brand}>{product.marca || 'Marca Desconhecida'}</Text>
                <Text style={styles.barcode}>EAN: {product.codigoBarras || 'Sem código'}</Text>
            </View>

            {/* CONTROLE DE QUANTIDADE */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Quantidade no Estoque</Text>
                <View style={styles.qtdContainer}>
                    <TouchableOpacity style={styles.btnCircle} onPress={handleDiminuir}>
                        <Text style={styles.btnCircleText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtdText}>{quantidade}</Text>

                    <TouchableOpacity style={styles.btnCircle} onPress={handleAumentar}>
                        <Text style={styles.btnCircleText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* BOTÕES DE AÇÃO */}
            <View style={styles.footer}>
                <Button title="Salvar Alterações" onPress={handleSalvar} />
                <View style={{ marginTop: 10 }}>
                    <Button title="Excluir Produto" color="#FF3B30" onPress={handleExcluir} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
    containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { marginBottom: 30 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    brand: { fontSize: 18, color: '#666', marginTop: 5 },
    barcode: { fontSize: 14, color: '#999', marginTop: 10 },
    card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 15, textAlign: 'center' },
    qtdContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    btnCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
    btnCircleText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    qtdText: { fontSize: 28, fontWeight: 'bold', marginHorizontal: 30 },
    infoText: { fontSize: 16, color: '#444', marginVertical: 5 },
    footer: { marginTop: 'auto', paddingBottom: 20 }
});