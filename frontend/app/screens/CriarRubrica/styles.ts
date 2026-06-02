import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  padding: 50px 20px 20px;
`;

export const TituloPrincipal = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #2D3436;
`;

export const Subtitulo = styled.Text`
  font-size: 12px;
  color: #636E72;
  letter-spacing: 1.5px;
  margin-bottom: 30px;
`;

export const CardInput = styled.View`
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
`;

export const LabelInput = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: #3F51B5;
  margin-bottom: 10px;
`;

export const InputBackground = styled.View`
  background-color: #F0F2F8;
  border-radius: 12px;
  padding: 12px;
`;

export const Card = styled.View`
  background-color: #FFF;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 20px;
  elevation: 4;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LabelHeader = styled.Text`
  font-size: 10px;
  color: #A0A0B0;
  font-weight: bold;
`;

export const TituloCriterio = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2D3436;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #2D3436;
`;

export const ValorPeso = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #5B58AD;
`;

export const ContainerNiveis = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

// Mudança aqui: de .View para .TouchableOpacity para aceitar onPress
export const BotaoNivel = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  background-color: #F0F2F8;
  flex: 1;
  margin: 0 5px;
  align-items: center;
`;

export const BotaoAtivo = {
  backgroundColor: '#5B58AD',
};

export const TextoNivel = styled.Text`
  font-size: 10px;
  color: #636E72;
`;

export const TextoAtivo = {
  color: '#FFF',
};

export const BotaoAdicionar = styled.TouchableOpacity`
  margin: 20px;
  height: 60px;
  border: 2px dashed #D1D8E0;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextoAdicionar = styled.Text`
  margin-left: 10px;
  color: #A0A0B0;
  font-weight: bold;
`;