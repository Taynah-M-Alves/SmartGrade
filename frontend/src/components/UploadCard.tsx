import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadCard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function pickFile() {
    console.log('Botão clicado');

    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      console.log('Usuário cancelou');
      return;
    }

    const file = result.assets[0];
    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    } as any);

    try {
      const response = await fetch('http://192.168.1.53:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      console.log('Resposta do servidor:', data);
      Alert.alert('Sucesso', 'Arquivo enviado!');
    } catch (error) {
      console.log('Erro no upload:', error);
      Alert.alert('Erro', 'Falha ao enviar arquivo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Arraste e solte o arquivo</Text>

      <Text style={styles.cardText}>
        Clique para selecionar PDF ou DOCX
      </Text>

      {fileName && <Text style={styles.fileName}>📄 {fileName}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={pickFile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Enviando...' : 'Selecionar Arquivo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    marginBottom: 18,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  cardText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  fileName: {
    marginBottom: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#5B4BDB',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});