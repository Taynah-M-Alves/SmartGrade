import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import styles from '../../../../../styles/criarAtividade.styles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  nome: string;
  descricao: string;
  prazo: string;
}

interface RubricaForm {
  titulo: string;
  peso: string;
  descricao: string;
}

interface Rubrica extends RubricaForm {
  id: string;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CriarAtividadeScreen() {
  const [etapa, setEtapa] = useState<1 | 2>(1);

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    prazo: '',
  });

  const [rubricaForm, setRubricaForm] = useState<RubricaForm>({
    titulo: '',
    peso: '',
    descricao: '',
  });

  const [rubricas, setRubricas] = useState<Rubrica[]>([]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleContinuar = () => {
    if (!formData.nome.trim()) {
      Alert.alert('Campo obrigatório', 'Preencha o nome da atividade.');
      return;
    }
    if (!formData.descricao.trim()) {
      Alert.alert('Campo obrigatório', 'Preencha a descrição da atividade.');
      return;
    }
    if (!formData.prazo.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o prazo de entrega.');
      return;
    }
    setEtapa(2);
  };

  const handleAdicionarRubrica = () => {
    if (!rubricaForm.titulo.trim()) {
      Alert.alert('Campo obrigatório', 'Preencha o título da rubrica.');
      return;
    }
    if (!rubricaForm.peso.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o peso (%).');
      return;
    }
    if (!rubricaForm.descricao.trim()) {
      Alert.alert('Campo obrigatório', 'Preencha a descrição da rubrica.');
      return;
    }

    setRubricas(prev => [
      ...prev,
      { id: Date.now().toString(), ...rubricaForm },
    ]);
    setRubricaForm({ titulo: '', peso: '', descricao: '' });
  };

  const handleRemoverRubrica = (id: string) => {
    setRubricas(prev => prev.filter(r => r.id !== id));
  };

  const handleCriarAtividade = () => {
    if (rubricas.length === 0) {
      Alert.alert('Atenção', 'Adicione pelo menos uma rubrica antes de criar a atividade.');
      return;
    }
    Alert.alert('Sucesso! 🎉', 'Atividade criada com sucesso!');
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Page Title ── */}
          <View style={styles.pageTitleBlock}>
            <Text style={styles.pageTitle}>Criar Atividade</Text>
            <Text style={styles.pageSubtitle}>
              Configure os dados e critérios de avaliação
            </Text>
          </View>

          {/* ── Progress Card ── */}
          <View style={styles.card}>
            <View style={styles.stepsRow}>
              {/* Step 1 */}
              <View style={styles.stepItem}>
                {etapa > 1 ? (
                  <LinearGradient
                    colors={['#2563EB', '#9333EA']}
                    style={styles.stepCircleActive}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="checkmark" size={13} color="#fff" />
                  </LinearGradient>
                ) : etapa === 1 ? (
                  <LinearGradient
                    colors={['#2563EB', '#9333EA']}
                    style={styles.stepCircleActive}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.stepNumberActive}>1</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.stepCircleInactive}>
                    <Text style={styles.stepNumberInactive}>1</Text>
                  </View>
                )}
                <Text style={[styles.stepLabel, etapa === 1 && styles.stepLabelActive]}>
                  Dados da atividade
                </Text>
              </View>

              <View style={styles.stepConnector} />

              {/* Step 2 */}
              <View style={styles.stepItem}>
                {etapa === 2 ? (
                  <LinearGradient
                    colors={['#2563EB', '#9333EA']}
                    style={styles.stepCircleActive}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.stepNumberActive}>2</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.stepCircleInactive}>
                    <Text style={styles.stepNumberInactive}>2</Text>
                  </View>
                )}
                <Text style={[styles.stepLabel, etapa === 2 && styles.stepLabelActive]}>
                  Rubricas
                </Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={['#2563EB', '#9333EA']}
                style={[styles.progressBarFill, { width: etapa === 1 ? '50%' : '100%' }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </View>

          {/* ══════════════════ ETAPA 1 ══════════════════ */}
          {etapa === 1 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Dados da atividade</Text>

              {/* Nome */}
              <View style={styles.fieldBlock}>
                <Text style={styles.label}>
                  Nome da atividade <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: Trabalho de Macroeconomia"
                  placeholderTextColor="#9CA3AF"
                  value={formData.nome}
                  onChangeText={t => setFormData(p => ({ ...p, nome: t }))}
                />
              </View>

              {/* Descrição */}
              <View style={styles.fieldBlock}>
                <Text style={styles.label}>
                  Descrição <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Descreva os objetivos e detalhes da atividade..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  maxLength={500}
                  value={formData.descricao}
                  onChangeText={t => setFormData(p => ({ ...p, descricao: t }))}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>{formData.descricao.length}/500</Text>
              </View>

              {/* Prazo */}
              <View style={styles.fieldBlock}>
                <Text style={styles.label}>
                  Prazo de entrega <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputIconWrapper}>
                  <Feather
                    name="calendar"
                    size={16}
                    color="#9CA3AF"
                    style={styles.inputIconLeft}
                  />
                  <TextInput
                    style={[styles.input, styles.inputWithIcon]}
                    placeholder="Selecione a data e hora"
                    placeholderTextColor="#9CA3AF"
                    value={formData.prazo}
                    onChangeText={t => setFormData(p => ({ ...p, prazo: t }))}
                  />
                </View>
              </View>

              {/* CTA */}
              <TouchableOpacity onPress={handleContinuar} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#2563EB', '#9333EA']}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnGradientText}>Continuar para Rubricas</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* ══════════════════ ETAPA 2 ══════════════════ */}
          {etapa === 2 && (
            <>
              {/* Formulário de rubrica */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Rubricas de avaliação</Text>
                <Text style={styles.sectionSubtitle}>
                  Adicione critérios e pesos para avaliar esta atividade.
                </Text>

                {/* Título da rubrica */}
                <View style={styles.fieldBlock}>
                  <Text style={styles.label}>
                    Título da rubrica <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: Clareza dos argumentos"
                    placeholderTextColor="#9CA3AF"
                    value={rubricaForm.titulo}
                    onChangeText={t => setRubricaForm(p => ({ ...p, titulo: t }))}
                  />
                </View>

                {/* Peso + Descrição */}
                <View style={styles.rowFields}>
                  <View style={[styles.fieldBlock, styles.fieldPeso]}>
                    <Text style={styles.label}>
                      Peso (%) <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Ex.: 25"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      value={rubricaForm.peso}
                      onChangeText={t => setRubricaForm(p => ({ ...p, peso: t }))}
                    />
                  </View>

                  <View style={[styles.fieldBlock, styles.fieldDescRubrica]}>
                    <Text style={styles.label}>
                      Descrição da rubrica <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { minHeight: 48 }]}
                      placeholder="Descreva o que será avaliado..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      value={rubricaForm.descricao}
                      onChangeText={t => setRubricaForm(p => ({ ...p, descricao: t }))}
                      textAlignVertical="top"
                    />
                  </View>
                </View>

                {/* Adicionar rubrica */}
                <TouchableOpacity onPress={handleAdicionarRubrica} activeOpacity={0.85}>
                  <LinearGradient
                    colors={['#2563EB', '#9333EA']}
                    style={styles.btnGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.btnGradientText}>Adicionar Rubrica</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Lista de rubricas */}
              {rubricas.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>
                    Rubricas adicionadas ({rubricas.length})
                  </Text>

                  {rubricas.map((rubrica, index) => (
                    <View key={rubrica.id} style={styles.rubricaCard}>
                      <LinearGradient
                        colors={['#2563EB', '#9333EA']}
                        style={styles.rubricaNumCircle}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.rubricaNumText}>{index + 1}</Text>
                      </LinearGradient>

                      <View style={styles.rubricaInfo}>
                        <Text style={styles.rubricaTitulo}>{rubrica.titulo}</Text>
                        <Text style={styles.rubricaPeso}>Peso: {rubrica.peso}%</Text>
                        <Text style={styles.rubricaDescricao}>{rubrica.descricao}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => handleRemoverRubrica(rubrica.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <MaterialIcons name="delete-outline" size={22} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Criar Atividade */}
              <TouchableOpacity onPress={handleCriarAtividade} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#2563EB', '#9333EA']}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnGradientText}>Criar Atividade</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Voltar */}
              <TouchableOpacity
                onPress={() => setEtapa(1)}
                style={styles.btnBack}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back-outline" size={15} color="#6B7280" />
                <Text style={styles.btnBackText}>Voltar para Dados da atividade</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
}
