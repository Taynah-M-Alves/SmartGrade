import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type MenuItem = 'painel' | 'trabalhos' | 'analise' | 'perfil';

export default function BottomMenu() {
  const [selected, setSelected] = useState<MenuItem>('trabalhos');

  const renderItem = (
    key: MenuItem,
    label: string,
    image: any
  ) => {
    const isActive = selected === key;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setSelected(key)}
        activeOpacity={0.8}
      >
        {isActive ? (
          <LinearGradient
            colors={['#3B82F6', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.activeItem}
          >
            <Image source={image} style={styles.activeIcon} />
            <Text style={styles.activeLabel}>{label}</Text>
          </LinearGradient>
        ) : (
          <>
            <Image source={image} style={styles.icon} />
            <Text style={styles.label}>{label}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      {renderItem(
        'painel',
        'PAINEL',
        require('../../assets/Painel_logo.png')
      )}

      {renderItem(
        'trabalhos',
        'TRABALHOS',
        require('../../assets/Trabalhos_logo.png')
      )}

      {renderItem(
        'analise',
        'ANÁLISE',
        require('../../assets/Analise_logo.png')
      )}

      {renderItem(
        'perfil',
        'PERFIL',
        require('../../assets/Perfil_logo.png')
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    right: 22,
    height: 92,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },

  item: {
    width: 82,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeItem: {
    width: 112,
    height: 68,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 4,
  },

  activeIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 4,
    tintColor: '#FFFFFF',
  },

  label: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },

  activeLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});