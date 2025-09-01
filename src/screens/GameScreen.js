import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGame, gameSelectors } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { cardsDatabase, validateAnswer } from '../data/cardsDatabase.js';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const GameScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { state, dispatch, actions } = useGame();
  const { isDarkMode } = useTheme();

  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);

  const [userAnswer, setUserAnswer] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);

  const currentPlayer = gameSelectors.getCurrentPlayer(state);
  const currentHint = gameSelectors.getCurrentHint(state);
  const remainingAttempts = gameSelectors.getRemainingAttempts(state);

  // Iniciar o jogo se ainda não foi iniciado
  useEffect(() => {
    if (!state.gameStarted && state.gameMode && state.gameType) {
      dispatch({
        type: actions.START_GAME,
        payload: { allCards: cardsDatabase },
      });
    }
  }, [state.gameMode, state.gameType, state.gameStarted]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // Scroll to bottom when keyboard shows
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Limpar feedback após alguns segundos
  useEffect(() => {
    if (state.feedback) {
      const timer = setTimeout(() => {
        dispatch({ type: actions.CLEAR_FEEDBACK });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.feedback]);

  // Navegar para resultados quando o jogo terminar
  useEffect(() => {
    if (state.gameFinished) {
      navigation.navigate('Results');
    }
  }, [state.gameFinished]);

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      Alert.alert('Atenção', 'Digite uma resposta antes de continuar.');
      return;
    }

    const isCorrect = validateAnswer(userAnswer, state.currentCard.resposta);

    dispatch({
      type: actions.SUBMIT_ANSWER,
      payload: {
        answer: userAnswer.trim(),
        isCorrect,
      },
    });

    setUserAnswer('');
    Keyboard.dismiss();
  };

  const handleRequestHint = () => {
    if (state.currentHintLevel >= 3) {
      Alert.alert('Atenção', 'Você já usou todas as dicas disponíveis.');
      return;
    }

    dispatch({ type: actions.REQUEST_HINT });
  };

  const handleNextCard = () => {
    dispatch({ type: actions.NEXT_CARD });
  };

  const handleExitGame = () => {
    Alert.alert(
      'Sair do Jogo',
      'Tem certeza que deseja sair? Seu progresso será perdido.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: actions.RESET_GAME });
            navigation.navigate('Home');
          }
        },
      ]
    );
  };

  // Criar estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    exitButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.error,
      alignItems: 'center',
      justifyContent: 'center',
    },
    exitButtonText: {
      color: colors.textLight,
      fontSize: 20,
      fontWeight: 'bold',
    },
    progressContainer: {
      backgroundColor: colors.backgroundAlt,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.round,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    progressText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    scoreContainer: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.round,
    },
    scoreText: {
      fontSize: 16,
      color: colors.textLight,
      fontWeight: '700',
    },
    playerInfo: {
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    currentPlayerText: {
      ...typography.subtitle,
      color: colors.primary,
      fontWeight: 'bold',
    },
    categoryBadge: {
      alignSelf: 'center',
      backgroundColor: colors.secondary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.round,
    },
    categoryText: {
      ...typography.caption,
      color: colors.textLight,
      fontWeight: '600',
    },
    content: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },
    scrollContentKeyboard: {
      paddingBottom: spacing.xxl,
    },
    hintCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.medium,
    },
    hintHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    hintLevel: {
      ...typography.subtitle,
      color: colors.primary,
      fontWeight: 'bold',
    },
    hintPoints: {
      ...typography.body,
      color: colors.secondary,
      fontWeight: 'bold',
    },
    hintText: {
      ...typography.hint,
      lineHeight: 24,
      color: colors.text,
    },
    feedbackCard: {
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderWidth: 2,
    },
    successFeedback: {
      backgroundColor: isDarkMode ? '#1B5E20' : '#E8F5E8',
      borderColor: colors.secondary,
    },
    errorFeedback: {
      backgroundColor: isDarkMode ? '#B71C1C' : '#FFEBEE',
      borderColor: colors.error,
    },
    feedbackKeyboard: {
      marginBottom: spacing.md,
    },
    feedbackText: {
      ...typography.body,
      textAlign: 'center',
      fontWeight: '600',
    },
    successText: {
      color: isDarkMode ? '#A5D6A7' : colors.secondary,
    },
    errorText: {
      color: isDarkMode ? '#EF9A9A' : colors.error,
    },
    explanationCard: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      ...shadows.medium,
    },
    explanationTitle: {
      ...typography.subtitle,
      color: colors.textLight,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    explanationText: {
      ...typography.body,
      color: colors.textLight,
      lineHeight: 24,
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputWrapper: {
      marginBottom: spacing.md,
    },
    answerInput: {
      ...globalStyles.input,
      backgroundColor: colors.backgroundAlt,
      color: colors.text,
      fontSize: 16,
      textAlign: 'center',
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    attemptsText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.xs,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    actionButton: {
      flex: 1,
    },
    nextButton: {
      width: '100%',
    },
  });

  // Se o jogo não foi iniciado ainda, mostrar loading
  if (!state.gameStarted || !state.currentCard) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={[globalStyles.centerContent, dynamicStyles.container]}>
          <Text style={[typography.title, { color: colors.text }]}>Preparando jogo...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={dynamicStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.headerTop}>
            <TouchableOpacity
              style={dynamicStyles.exitButton}
              onPress={handleExitGame}
            >
              <Text style={dynamicStyles.exitButtonText}>×</Text>
            </TouchableOpacity>

            <View style={dynamicStyles.progressContainer}>
              <Text style={dynamicStyles.progressText}>
                {state.currentCardIndex + 1}/{state.cards.length}
              </Text>
            </View>

            <View style={dynamicStyles.scoreContainer}>
              <Text style={dynamicStyles.scoreText}>
                {state.gameMode === 'dupla'
                  ? `${state.scores[currentPlayer] || 0} pts`
                  : `${Object.values(state.scores)[0] || 0} pts`
                }
              </Text>
            </View>
          </View>

          {/* Player Info (for dupla mode) */}
          {state.gameMode === 'dupla' && (
            <View style={dynamicStyles.playerInfo}>
              <Text style={dynamicStyles.currentPlayerText}>
                Vez de {currentPlayer}
              </Text>
            </View>
          )}

          {/* Category Badge */}
          {state.selectedCategory && (
            <View style={dynamicStyles.categoryBadge}>
              <Text style={dynamicStyles.categoryText}>
                {state.selectedCategory}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={dynamicStyles.content}>
          <ScrollView
            ref={scrollViewRef}
            style={dynamicStyles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              dynamicStyles.scrollContent,
              keyboardVisible && dynamicStyles.scrollContentKeyboard
            ]}
          >
            {/* Hint Card */}
            <View style={dynamicStyles.hintCard}>
              <View style={dynamicStyles.hintHeader}>
                <Text style={dynamicStyles.hintLevel}>
                  Dica {state.currentHintLevel}
                </Text>
                <Text style={dynamicStyles.hintPoints}>
                  {currentHint?.pontos}
                </Text>
              </View>
              <Text style={dynamicStyles.hintText}>
                {currentHint?.texto}
              </Text>
            </View>

            {/* Feedback */}
            {state.feedback && (
              <View style={[
                dynamicStyles.feedbackCard,
                state.feedback.type === 'success' ? dynamicStyles.successFeedback : dynamicStyles.errorFeedback,
                keyboardVisible && dynamicStyles.feedbackKeyboard
              ]}>
                <Text style={[
                  dynamicStyles.feedbackText,
                  state.feedback.type === 'success' ? dynamicStyles.successText : dynamicStyles.errorText
                ]}>
                  {state.feedback.message}
                </Text>
              </View>
            )}

            {/* Explanation (shown after answer) */}
            {state.showExplanation && (
              <View style={dynamicStyles.explanationCard}>
                <Text style={dynamicStyles.explanationTitle}>💡 Explicação</Text>
                <Text style={dynamicStyles.explanationText}>
                  {state.currentCard.explicacao}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Input and Actions */}
          <View style={[
            dynamicStyles.inputContainer,
            {
              paddingBottom: Math.max(insets.bottom, spacing.md),
              minHeight: keyboardVisible ? 120 : 100
            }
          ]}>
            {!state.showExplanation ? (
              <>
                {/* Answer Input */}
                <View style={dynamicStyles.inputWrapper}>
                  <TextInput
                    style={[
                      dynamicStyles.answerInput,
                      isInputFocused && dynamicStyles.inputFocused
                    ]}
                    placeholder="Digite sua resposta..."
                    placeholderTextColor={colors.textSecondary}
                    value={userAnswer}
                    onChangeText={setUserAnswer}
                    onFocus={() => {
                      setIsInputFocused(true);
                      // Scroll to input when focused
                      setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                      }, 300);
                    }}
                    onBlur={() => setIsInputFocused(false)}
                    onSubmitEditing={handleSubmitAnswer}
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Text style={dynamicStyles.attemptsText}>
                    {remainingAttempts} tentativas restantes
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={dynamicStyles.actionButtons}>
                  <TouchableOpacity
                    style={[globalStyles.button, dynamicStyles.actionButton]}
                    onPress={handleSubmitAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    <Text style={globalStyles.buttonText}>Adivinhar</Text>
                  </TouchableOpacity>

                  {state.currentHintLevel < 3 && (
                    <TouchableOpacity
                      style={[globalStyles.button, globalStyles.secondaryButton, dynamicStyles.actionButton]}
                      onPress={handleRequestHint}
                    >
                      <Text style={globalStyles.secondaryButtonText}>
                        Solicitar Dica
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              /* Next Card Button */
              <TouchableOpacity
                style={[globalStyles.button, dynamicStyles.nextButton]}
                onPress={handleNextCard}
              >
                <Text style={globalStyles.buttonText}>
                  {state.currentCardIndex + 1 < state.cards.length ? 'Próxima Carta' : 'Ver Resultados'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



export default GameScreen;