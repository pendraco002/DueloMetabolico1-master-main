import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';
import { getCategories } from '../data/cardsDatabase.js';

const ModeSelectionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { dispatch, actions } = useGame();
  const { isDarkMode } = useTheme();
  
  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);
  
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const categories = getCategories();

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setSelectedType(null);
    setSelectedCategory(null);
    dispatch({ type: actions.SET_GAME_MODE, payload: mode });
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedCategory(null);
    dispatch({ type: actions.SET_GAME_TYPE, payload: type });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch({ type: actions.SET_SELECTED_CATEGORY, payload: category });
  };

  const handleStartGame = () => {
    // Validações
    if (!selectedMode || !selectedType) {
      Alert.alert('Atenção', 'Selecione o modo e tipo de jogo.');
      return;
    }

    if (selectedType === 'focado' && !selectedCategory) {
      Alert.alert('Atenção', 'Selecione uma categoria para a prática focada.');
      return;
    }

    if (selectedMode === 'dupla') {
      if (!player1Name.trim() || !player2Name.trim()) {
        Alert.alert('Atenção', 'Digite os nomes dos dois jogadores.');
        return;
      }
      if (player1Name.trim() === player2Name.trim()) {
        Alert.alert('Atenção', 'Os nomes dos jogadores devem ser diferentes.');
        return;
      }
      dispatch({
        type: actions.SET_PLAYERS,
        payload: [player1Name.trim(), player2Name.trim()]
      });
    } else if (selectedMode === 'individual') {
      dispatch({
        type: actions.SET_PLAYERS,
        payload: ['Jogador']
      });
    }

    navigation.navigate('Game');
  };

  // Criar estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      alignItems: 'center',
    },
    title: {
      ...typography.title,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    section: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.subtitle,
      color: colors.text,
      marginBottom: spacing.md,
    },
    optionsContainer: {
      gap: spacing.md,
    },
    optionCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
      ...shadows.small,
    },
    selectedOption: {
      borderColor: colors.primary,
      backgroundColor: isDarkMode ? colors.background : colors.backgroundAlt,
    },
    optionIcon: {
      fontSize: 32,
      marginBottom: spacing.sm,
    },
    optionTitle: {
      ...typography.subtitle,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    optionDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    categoryChip: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.round,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectedCategory: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryText: {
      ...typography.caption,
      color: colors.text,
      fontWeight: '500',
    },
    selectedCategoryText: {
      color: colors.textLight,
    },
    playersContainer: {
      gap: spacing.md,
    },
    playerInput: {
      marginBottom: spacing.sm,
    },
    playerLabel: {
      ...typography.body,
      fontWeight: '600',
      marginBottom: spacing.xs,
      color: colors.text,
    },
    nameInput: {
      ...globalStyles.input,
      backgroundColor: colors.backgroundAlt,
      color: colors.text,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    startButton: {
      ...globalStyles.button,
      opacity: (!selectedMode || !selectedType || (selectedType === 'focado' && !selectedCategory)) ? 0.5 : 1,
    },
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={dynamicStyles.header}>
            <Text style={dynamicStyles.title}>Configurar Jogo</Text>
            <Text style={dynamicStyles.subtitle}>
              Escolha como você quer jogar
            </Text>
          </View>

          {/* Mode Selection */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>🎮 Modo de Jogo</Text>
            <View style={dynamicStyles.optionsContainer}>
              <TouchableOpacity
                style={[
                  dynamicStyles.optionCard,
                  selectedMode === 'individual' && dynamicStyles.selectedCard,
                ]}
                onPress={() => handleModeSelect('individual')}
              >
                <Text style={dynamicStyles.optionIcon}>👤</Text>
                <Text style={[
                  dynamicStyles.optionTitle,
                  selectedMode === 'individual' && dynamicStyles.selectedText,
                ]}>
                  Individual
                </Text>
                <Text style={[
                  dynamicStyles.optionDescription,
                  selectedMode === 'individual' && dynamicStyles.selectedDescription,
                ]}>
                  Jogue sozinho e teste seus conhecimentos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  dynamicStyles.optionCard,
                  selectedMode === 'dupla' && dynamicStyles.selectedCard,
                ]}
                onPress={() => handleModeSelect('dupla')}
              >
                <Text style={dynamicStyles.optionIcon}>👥</Text>
                <Text style={[
                  dynamicStyles.optionTitle,
                  selectedMode === 'dupla' && dynamicStyles.selectedText,
                ]}>
                  Dupla
                </Text>
                <Text style={[
                  dynamicStyles.optionDescription,
                  selectedMode === 'dupla' && dynamicStyles.selectedDescription,
                ]}>
                  Desafie um amigo em um duelo de conhecimento
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Game Type Selection */}
          {selectedMode && (
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>⚡ Tipo de Partida</Text>
              <View style={dynamicStyles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    dynamicStyles.optionCard,
                    selectedType === 'rapido' && dynamicStyles.selectedCard,
                  ]}
                  onPress={() => handleTypeSelect('rapido')}
                >
                  <Text style={dynamicStyles.optionIcon}>🚀</Text>
                  <Text style={[
                    dynamicStyles.optionTitle,
                    selectedType === 'rapido' && dynamicStyles.selectedText,
                  ]}>
                    Duelo Rápido
                  </Text>
                  <Text style={[
                    dynamicStyles.optionDescription,
                    selectedType === 'rapido' && dynamicStyles.selectedDescription,
                  ]}>
                    10 cartas aleatórias para uma partida rápida
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    dynamicStyles.optionCard,
                    selectedType === 'focado' && dynamicStyles.selectedCard,
                  ]}
                  onPress={() => handleTypeSelect('focado')}
                >
                  <Text style={dynamicStyles.optionIcon}>🎯</Text>
                  <Text style={[
                    dynamicStyles.optionTitle,
                    selectedType === 'focado' && dynamicStyles.selectedText,
                  ]}>
                    Prática Focada
                  </Text>
                  <Text style={[
                    dynamicStyles.optionDescription,
                    selectedType === 'focado' && dynamicStyles.selectedDescription,
                  ]}>
                    Estude uma categoria específica
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Category Selection (for focused practice) */}
          {selectedType === 'focado' && (
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>📚 Categoria</Text>
              <View style={dynamicStyles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      dynamicStyles.categoryCard,
                      selectedCategory === category && dynamicStyles.selectedCategoryCard,
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text style={[
                      dynamicStyles.categoryText,
                      selectedCategory === category && dynamicStyles.selectedCategoryText,
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Player Names (for dupla mode) */}
          {selectedMode === 'dupla' && (
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>✏️ Nomes dos Jogadores</Text>
              <View style={dynamicStyles.playersContainer}>
                <View style={dynamicStyles.playerInput}>
                  <Text style={dynamicStyles.playerLabel}>Jogador 1</Text>
                  <TextInput
                    style={dynamicStyles.nameInput}
                    placeholder="Digite o nome do jogador 1"
                    placeholderTextColor={colors.textSecondary}
                    value={player1Name}
                    onChangeText={setPlayer1Name}
                    maxLength={20}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={dynamicStyles.playerInput}>
                  <Text style={dynamicStyles.playerLabel}>Jogador 2</Text>
                  <TextInput
                    style={dynamicStyles.nameInput}
                    placeholder="Digite o nome do jogador 2"
                    placeholderTextColor={colors.textSecondary}
                    value={player2Name}
                    onChangeText={setPlayer2Name}
                    maxLength={20}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer Button */}
        <View style={[dynamicStyles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <TouchableOpacity
            style={dynamicStyles.startButton}
            onPress={handleStartGame}
            disabled={!selectedMode || !selectedType || (selectedType === 'focado' && !selectedCategory)}
          >
            <Text style={globalStyles.buttonText}>Iniciar Jogo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ModeSelectionScreen;