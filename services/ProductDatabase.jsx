import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let db;
if (Platform.OS !== 'web') {
    const SQLite = require('expo-sqlite');
    db = SQLite.openDatabaseSync('orgcasas.db');
}

export const ProductDatabase = {
    // 1. LER PRODUTOS
    async getAll() {
        if (Platform.OS === 'web') {
            const data = await AsyncStorage.getItem('produtos');
            return data ? JSON.parse(data) : [];
        }

        const resultado = await db.getAllAsync('SELECT * FROM Produtos');
        return resultado.map(item => ({
            ...item,
            id: item.id !== undefined ? item.id : item.ID
        }));
    },

    async add(product) {
        if (Platform.OS === 'web') {
            const current = await this.getAll();
            const productWithId = { ...product, id: Date.now().toString() };
            await AsyncStorage.setItem('produtos', JSON.stringify([...current, productWithId]));
            return;
        }

        // No Mobile, executa o insert
        return await db.runAsync(
            'INSERT INTO Produtos (nome, marca, codigoBarras, quantidade) VALUES (?, ?, ?, ?)',
            [product.nome, product.marca, product.codigoBarras, product.quantidade]
        );
    },

    // 3. ATUALIZAR QUANTIDADE
    async updateQuantidade(id, novaQuantidade) {
        if (Platform.OS === 'web') {
            const current = await this.getAll();
            // Percorre a lista e atualiza apenas o produto com o ID correspondente
            const updated = current.map(item =>
                item.id === id ? { ...item, quantidade: novaQuantidade } : item
            );
            await AsyncStorage.setItem('produtos', JSON.stringify(updated));
            return;
        }

        return db.runAsync(
            'UPDATE Produtos SET quantidade = ? WHERE id = ?',
            [novaQuantidade, id]
        );
    },

    // 4. DELETAR PRODUTO
    async delete(id) {
        if (Platform.OS === 'web') {
            const current = await this.getAll();
            // Filtra a lista, removendo o produto que tem o ID correspondente
            const filtered = current.filter(item => item.id !== id);
            await AsyncStorage.setItem('produtos', JSON.stringify(filtered));
            return;
        }

        return db.runAsync(
            'DELETE FROM Produtos WHERE id = ?',
            [id]
        );
    }
};