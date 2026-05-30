import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as S from './styles'; 

interface Criterio {
  id: string;
  peso: number;
  nivel: string;
}

const CriterioCard = ({ onDelete }: { onDelete: () => void }) => {
  const [peso, setPeso] = useState(8.5);
  const [nivel, setNivel] = useState('Bom');

  return (
    <S.Card>
      <S.Row>
        <View>
          <S.LabelHeader>NOME DO CRITÉRIO</S.LabelHeader>
          <S.TituloCriterio>Clareza de argumento</S.TituloCriterio>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color="#CCC" />
        </TouchableOpacity>
      </S.Row>

      <S.Row style={{ marginTop: 20 }}>
        <S.Label>PESO</S.Label>
        <S.ValorPeso>{peso.toFixed(1)}</S.ValorPeso>
      </S.Row>
      
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={0.1}
        value={peso}
        onValueChange={(valor) => setPeso(valor)}
        minimumTrackTintColor="#5B58AD"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#5B58AD"
      />

      <S.Label style={{ marginTop: 10 }}>NÍVEIS DE DESEMPENHO</S.Label>
      <S.ContainerNiveis>
        {['Excelente', 'Bom', 'Precisa melhorar'].map((item) => (
          <S.BotaoNivel 
            key={item}
            onPress={() => setNivel(item)}
            style={nivel === item ? S.BotaoAtivo : {}}
          >
            <S.TextoNivel style={nivel === item ? S.TextoAtivo : {}}>
              {item}
            </S.TextoNivel>
          </S.BotaoNivel>
        ))}
      </S.ContainerNiveis>
    </S.Card>
  );
};

export default function CriarRubrica() {
  const [listaCriterios, setListaCriterios] = useState<Criterio[]>([
    { id: Math.random().toString(), peso: 8.5, nivel: 'Bom' } 
  ]);

  const adicionarCriterio = () => {
    const novoCriterio = { id: Math.random().toString(), peso: 0, nivel: 'Bom' };
    setListaCriterios([...listaCriterios, novoCriterio]);
  };

  const removerCriterio = (id: string) => {
    setListaCriterios(listaCriterios.filter(item => item.id !== id));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFF' }}>
      <S.HeaderContainer>
        <S.TituloPrincipal>Criar Rubrica</S.TituloPrincipal>
        <S.Subtitulo>DESIGN DE AVALIAÇÃO DIGITAL</S.Subtitulo>

        <S.CardInput>
          <S.LabelInput>TÍTULO DA RUBRICA</S.LabelInput>
          <S.InputBackground>
            <TextInput 
              placeholder="ex: Análise de Escrita Criativa - Semestre 1"
              placeholderTextColor="#A0A0B0"
            />
          </S.InputBackground>
        </S.CardInput>
      </S.HeaderContainer>

      {listaCriterios.map((item) => (
        <CriterioCard 
          key={item.id} 
          onDelete={() => removerCriterio(item.id)} 
        />
      ))}

      <S.BotaoAdicionar onPress={adicionarCriterio}>
        <Ionicons name="add-circle-outline" size={24} color="#A0A0B0" />
        <S.TextoAdicionar>Adicionar Critério</S.TextoAdicionar>
      </S.BotaoAdicionar>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}