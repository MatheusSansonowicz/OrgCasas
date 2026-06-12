import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { ProductService } from '../services/ProductService';
import { ProductDatabase } from '../services/ProductDatabase'; // Importação necessária

export default function AddProdutoScreen({ navigation }) { // Adicione { navigation } aqui!
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [quantidade, setQuantidade] = useState('1'); // 1. Adicionei o estado aqui

    const buscarProduto = async () => {
        if (!codigo) return;
        setLoading(true);
        try {
            const produto = await ProductService.searchByBarcode(codigo);
            setNome(produto.nome);
            setMarca(produto.marca);
        } catch (error) {
            Alert.alert("Ops!", "Não encontramos este produto. Pode cadastrar manualmente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSalvar = async () => {
        if (!nome.trim()) {
            Alert.alert("Atenção", "Por favor, digite o nome do produto.");
            return;
        }

        try {
            const novoProduto = {
                nome: nome,
                marca: marca || 'Sem marca',
                codigoBarras: codigo || null,
                quantidade: parseInt(quantidade) || 1, // Agora 'quantidade' existe!
            };

            await ProductDatabase.add(novoProduto);

            Alert.alert("Sucesso", "Produto adicionado ao estoque!");
            navigation.goBack();

        } catch (error) {
            console.error("Erro ao salvar:", error);
            Alert.alert("Erro", "Não foi possível salvar o produto no banco.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Código de Barras"
                value={codigo}
                onChangeText={setCodigo}
                keyboardType="numeric"
                style={styles.input}
            />

            <Button title="Buscar Produto Online" onPress={buscarProduto} />

            {loading && <ActivityIndicator size="large" />}

            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />

            {/* 2. Adicionei o campo de quantidade abaixo */}
            <TextInput
                placeholder="Quantidade"
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
                style={styles.input}
            />

            <Button title="Salvar no Estoque" onPress={handleSalvar} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
});