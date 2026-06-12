import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../configsExports/firebaseconfig';
import { signOut } from 'firebase/auth';
import { ProductDatabase } from '../services/ProductDatabase';

export default function DashboardScreen({ navigation }) {
    const user = auth.currentUser;
    const [produtos, setProdutos] = useState([]);

    useFocusEffect(
        useCallback(() => {
            let ativo = true;

            const carregarProdutos = async () => {
                try {
                    const lista = await ProductDatabase.getAll();
                    if (ativo) {
                        setProdutos([]); // Limpa a lista antiga por um milissegundo
                        setProdutos(lista); // Define a nova lista atualizada
                    }
                } catch (error) {
                    console.error("Erro ao carregar produtos:", error);
                }
            };

            carregarProdutos();

            return () => {
                ativo = false; // Evita vazamento de memória se o usuário sair rápido da tela
            };
        }, [])
    );

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    const renderProduto = ({ item }) => (
        <TouchableOpacity
            style={styles.cardProduto}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.marcaProduto}>{item.marca}</Text>
            </View>
            <Text style={styles.qtdProduto}>{item.quantidade} un</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                {user?.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder} />
                )}
                <View>
                    <Text style={styles.greeting}>Olá, {user?.displayName?.split(' ')[0]}!</Text>
                    <Text style={styles.subtitle}>Sua casa organizada.</Text>
                </View>
            </View>

            {/* AÇÕES RÁPIDAS */}
            <Text style={styles.sectionTitle}>O que deseja fazer?</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card} onPress={() => console.log('Câmera')}>
                    <Text style={styles.cardIcon}>📷</Text>
                    <Text style={styles.cardText}>Escanear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddProduct')}>
                    <Text style={styles.cardIcon}>➕</Text>
                    <Text style={styles.cardText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            {/* LISTA DE PRODUTOS */}
            <Text style={styles.sectionTitle}>Seu Estoque</Text>
            <FlatList
                data={produtos}
                renderItem={renderProduto}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                // Adicionado para melhorar a UX quando a lista estiver vazia
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhum produto cadastrado ainda.</Text>
                )}
            />

            {/* BOTÃO DE SAIR */}
            <View style={styles.footer}>
                <Button title="Sair da Conta" color="#FF3B30" onPress={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 20 },
    avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc', marginRight: 15 },
    greeting: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 14, color: '#666' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    card: {
        backgroundColor: '#FFF', padding: 20, borderRadius: 12, width: '48%',
        alignItems: 'center', elevation: 3, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
    },
    cardIcon: { fontSize: 32, marginBottom: 10 },
    cardText: { fontSize: 14, fontWeight: '600', color: '#333' },
    cardProduto: {
        backgroundColor: '#FFF', padding: 15, borderRadius: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 10, elevation: 2
    },
    nomeProduto: { fontSize: 16, fontWeight: '600' },
    marcaProduto: { fontSize: 12, color: '#777' },
    qtdProduto: { fontSize: 16, fontWeight: 'bold', color: '#4285F4' },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
    footer: { marginTop: 'auto', paddingTop: 20 }
});