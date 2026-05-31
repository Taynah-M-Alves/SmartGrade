import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f4f7ff;
  justify-content: center;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 25px;
  padding: 25px;
  elevation: 5;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #2d5bff;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #2d3436;
  text-align: center;
  margin-top: 10px;
`;

export const Label = styled.Text`
  font-size: 13px;
  color: #636e72;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f1f3f6;
  border-radius: 12px;
  padding: 10px 15px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #2d3436;
`;

export const Button = styled.TouchableOpacity`
  background-color: #3b5bff;
  padding: 15px;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const DividerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const Divider = styled.View`
  flex: 1;
  height: 1px;
  background-color: #dfe6e9;
`;

export const DividerText = styled.Text`
  margin: 0 10px;
  font-size: 10px;
  color: #636e72;
`;

export const SocialButton = styled.TouchableOpacity`
  border: 1px solid #dfe6e9;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 10px;
`;

export const SocialText = styled.Text`
  font-weight: bold;
  color: #2d3436;
`;

export const FooterText = styled.Text`
  text-align: center;
  margin-top: 15px;
  color: #636e72;
`;

export const FooterLink = styled.Text`
  color: #6c5ce7;
  font-weight: bold;
`;