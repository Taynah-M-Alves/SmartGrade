import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from 'hooks/useAuth';

export default function SubmitScreen() {
  const params = useLocalSearchParams();
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token, user } = useAuth();

  const atividade = params.atividade
    ? JSON.parse(params.atividade as string)
    : null;

  const titulo = atividade?.title || "Entrega documentação";
  const disciplina = atividade?.createdBy?.name
    ? `Professor: ${atividade.createdBy.name}`
    : "Projeto Integrador";
  const dataEntrega = atividade?.deadline
    ? new Date(atividade.deadline).toLocaleString("pt-BR")
    : "26/06/2026 às 23:59";
  const descricao = atividade?.description || "Nesta atividade, você deve entregar toda a documentação solicitada. Certifique-se de seguir o modelo disponibilizado.";

  const [arquivoSelecionado, setArquivoSelecionado] = useState<{ nome: string, uri: string } | null>(null);
  const [atividadeEnviada, setAtividadeEnviada] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!resultado.canceled && resultado.assets.length > 0) {
        const arquivo = resultado.assets[0];
        setArquivoSelecionado({
          nome: arquivo.name,
          uri: arquivo.uri
        });
      }
    } catch (error) {
      console.log("Erro ao selecionar o arquivo:", error);
    }
  };

  const enviarAtividade = async () => {
    if (!arquivoSelecionado || !atividade?.id || !user?.id) {
      return;
    }

    setEnviando(true);

    try {
      const formData = new FormData();

      formData.append('file', {
        uri: arquivoSelecionado.uri,
        name: arquivoSelecionado.nome,
        type: 'application/pdf',
      } as any);

      formData.append('taskId', String(atividade.id));
      formData.append('userId', String(user.id));

      const response = await fetch(`${api}submissions/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar atividade');
      }

      setAtividadeEnviada(true);

      router.push({
        pathname: "/(protected)/aluno/feedback",
        params: { id: String(data.id) },
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* CABEÇALHO AZUL */}
      <View style={styles.headerCard}>
        <View style={styles.headerInfo}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerTitle}>{titulo}</Text>
            <Text style={styles.headerSubtitle}>{disciplina}</Text>
          </View>
        </View>
        <View style={styles.headerFooter}>
          <Text style={styles.headerDate}>Entrega até {dataEntrega}</Text>
          <View style={[styles.badge, atividadeEnviada ? styles.badgeSuccess : styles.badgePending]}>
            <Text style={styles.badgeText}>{atividadeEnviada ? "Entregue" : "Pendente"}</Text>
          </View>
        </View>
      </View>

      {/* CARD SOBRE A ATIVIDADE */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre a atividade</Text>
        <Text style={styles.descriptionText}>{descricao}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Código</Text>
          <Text style={styles.infoValue}>{atividade?.code ?? '-'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Professor</Text>
          <Text style={styles.infoValue}>{atividade?.createdBy?.name ?? '-'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data de entrega</Text>
          <Text style={styles.infoValue}>{dataEntrega}</Text>
        </View>

        {/* ÁREA DE DOWNLOAD (Aparece após o envio) */}
        {atividadeEnviada && arquivoSelecionado && (
          <View style={styles.attachmentArea}>
            <Text style={styles.infoLabel}>Arquivo enviado:</Text>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>{arquivoSelecionado.nome}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* CARD DE UPLOAD (Desaparece após o envio) */}
      {!atividadeEnviada && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Enviar arquivo</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={selecionarArquivo}>
            <Text style={styles.uploadTextTitle}>
              {arquivoSelecionado ? "Arquivo Selecionado:" : "Toque aqui para escolher o arquivo"}
            </Text>
            {arquivoSelecionado ? (
              <Text style={styles.uploadFileName}>{arquivoSelecionado.nome}</Text>
            ) : (
              <>
                <Text style={styles.uploadTextOr}>ou</Text>
                <View style={styles.uploadFakeButton}>
                  <Text style={styles.uploadFakeButtonText}>Procurar no celular</Text>
                </View>
                <Text style={styles.uploadHint}>Apenas PDF</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, (!arquivoSelecionado || enviando) && styles.submitButtonDisabled]}
            disabled={!arquivoSelecionado || enviando}
            onPress={enviarAtividade}
          >
            {enviando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar atividade</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
    marginVertical: 60
  },
  headerCard: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E0E7FF',
    fontSize: 14,
    marginTop: 4,
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    color: '#FFF',
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgePending: {
    backgroundColor: '#FFEDD5',
  },
  badgeSuccess: {
    backgroundColor: '#D1FAE5',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
  },
  attachmentArea: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  downloadText: {
    flex: 1,
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  uploadTextTitle: {
    color: '#333',
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  uploadFileName: {
    color: '#3b82f6',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadTextOr: {
    color: '#9CA3AF',
    marginVertical: 8,
  },
  uploadFakeButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadFakeButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  uploadHint: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
