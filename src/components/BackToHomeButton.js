import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BackToHomeButton() {
    const navigation = useNavigation();

    function handleGoHome() {
        navigation.navigate('Home');
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handleGoHome}
        >
            <Text style={styles.text}>
                Voltar à tela inicial
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#000',
        borderRadius: 8,
        alignItems: 'center',
    },

    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
