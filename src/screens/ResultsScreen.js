
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGame, gameSelectors } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const ResultsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { state, dispatch, actions } = useGame();
  const { isDarkMode } = useTheme();

  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);

  // Criar estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },
    title: {
      ...typography.title,
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.subtitle,
      color: colors.primary,
      marginBottom: spacing.md,
    },
    statCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.medium,
    },
    winnerCard: {
      borderWidth: 2,
      borderColor: colors.success,
      backgroundColor: isDarkMode ? colors.backgroundAlt : colors.success + '10',
    },
    winnerBadge: {
      position: 'absolute',
      top: -spacing.xs,
      right: spacing.md,
      backgroundColor: colors.success,
      borderRadius: borderRadius.full,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    winnerText: {
      ...typography.small,
      color: colors.textLight,
      fontWeight: 'bold',
    },
    statHeader: {
      marginBottom: spacing.md,
    },
    playerName: {
      ...typography.subtitle,
      color: colors.text,
      fontWeight: 'bold',
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    statLabel: {
      ...typography.body,
      color: colors.textSecondary,
    },
    statValue: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    scoreValue: {
      ...typography.subtitle,
      color: colors.primary,
      fontWeight: 'bold',
    },
    summaryCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    summaryLabel: {
      ...typography.body,
      color: colors.textSecondary,
      flex: 1,
    },
    summaryValue: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      textAlign: 'right',
    },
    historyItem: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderLeftWidth: 4,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    correctItem: {
      borderLeftColor: colors.success,
    },
    incorrectItem: {
      borderLeftColor: colors.error,
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    historyQuestion: {
      ...typography.body,
      color: colors.text,
      flex: 1,
      marginRight: spacing.sm,
    },
    historyScore: {
      ...typography.small,
      fontWeight: 'bold',
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: borderRadius.sm,
    },
    correctScore: {
      backgroundColor: colors.success,
      color: colors.textLight,
    },
    incorrectScore: {
      backgroundColor: colors.error,
      color: colors.textLight,
    },
    historyAnswer: {
      ...typography.small,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
    historyPlayer: {
      ...typography.small,
      color: colors.primary,
      fontWeight: '600',
      marginTop: spacing.xs,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    actionButton: {
      marginBottom: spacing.sm,
    },
  });

  // Usar dynamicStyles como styles para compatibilidade
  const styles = dynamicStyles;

  const currentPlayer = gameSelectors.getCurrentPlayer(state);
  const totalScore = gameSelectors.getTotalScore(state, currentPlayer);
  const correctAnswers = gameSelectors.getCorrectAnswersCount(state);
  const totalCards = gameSelectors.getTotalCards(state);
  const accuracyRate = gameSelectors.getAccuracyRate(state);

  // Calcular estatísticas para modo dupla
  const getPlayerStats = () => {
    if (state.gameMode === 'individual') {
      return [{
        name: currentPlayer || 'Jogador',
        score: totalScore || 0,
        correct: correctAnswers || 0,
        total: totalCards || 0,
        accuracy: accuracyRate || 0,
      }];
    }

    if (!state.players || !Array.isArray(state.players) || state.players.length === 0) {
      return [];
    }

    return state.players.map(player => {
      const playerHistory = (state.gameHistory || []).filter(h => h.player === player);
      const playerCorrect = playerHistory.filter(h => h.isCorrect).length;
      const playerTotal = playerHistory.length;
      const playerAccuracy = playerTotal > 0 ? Math.round((playerCorrect / playerTotal) * 100) : 0;

      return {
        name: player,
        score: (state.scores && state.scores[player]) || 0,
        correct: playerCorrect,
        total: playerTotal,
        accuracy: playerAccuracy,
      };
    });
  };

  const playerStats = getPlayerStats();
  const winner = playerStats.length > 0 ? playerStats.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  ) : null;

  const handlePlayAgain = () => {
    dispatch({ type: actions.RESET_GAME });
    navigation.navigate('ModeSelection');
  };

  const handleGoHome = () => {
    dispatch({ type: actions.RESET_GAME });
    navigation.navigate('Home');
  };

  const renderStatCard = ({ item: player }) => {
    const isWinner = winner && player.name === winner.name;

    return (
      <View style={[
        dynamicStyles.statCard,
        isWinner && dynamicStyles.winnerCard
      ]}>
        {isWinner && state.gameMode === 'dupla' && (
          <View style={dynamicStyles.winnerBadge}>
            <Text style={dynamicStyles.winnerText}>🏆 Vencedor</Text>
          </View>
        )}

        <View style={dynamicStyles.statHeader}>
          <Text style={dynamicStyles.playerName}>{player.name}</Text>
        </View>

        <View style={dynamicStyles.statRow}>
          <Text style={dynamicStyles.statLabel}>Pontuação:</Text>
          <Text style={dynamicStyles.scoreValue}>{player.score}</Text>
        </View>

        <View style={dynamicStyles.statRow}>
          <Text style={dynamicStyles.statLabel}>Acertos:</Text>
          <Text style={dynamicStyles.statValue}>{player.correct}/{player.total}</Text>
        </View>

        <View style={dynamicStyles.statRow}>
          <Text style={dynamicStyles.statLabel}>Precisão:</Text>
          <Text style={dynamicStyles.statValue}>{player.accuracy}%</Text>
        </View>
      </View>
    );
  };

  const renderGameHistoryItem = ({ item, index }) => (
    <View style={[
      dynamicStyles.historyItem,
      item.isCorrect ? dynamicStyles.correctItem : dynamicStyles.incorrectItem
    ]}>
      <View style={dynamicStyles.historyHeader}>
        <Text style={dynamicStyles.historyQuestion}>
          {index + 1}. {item.question || 'Pergunta não disponível'}
        </Text>
        <Text style={[
          dynamicStyles.historyScore,
          item.isCorrect ? dynamicStyles.correctScore : dynamicStyles.incorrectScore
        ]}>
          {item.isCorrect ? '✓' : '✗'} {item.points || 0} pts
        </Text>
      </View>

      <Text style={dynamicStyles.historyAnswer}>
        Sua resposta: {item.userAnswer || 'Não respondido'}
      </Text>

      {state.gameMode === 'dupla' && item.player && (
        <Text style={dynamicStyles.historyPlayer}>
          Jogador: {item.player}
        </Text>
      )}
    </View>
  );

  // Safety check - if no game data, show error message
  if (!state.gameStarted && !state.gameFinished) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={[globalStyles.centerContent, { padding: spacing.lg }]}>
          <Text style={globalStyles.title}>Erro</Text>
          <Text style={[globalStyles.body, { textAlign: 'center', marginVertical: spacing.md }]}>
            Não há dados de jogo disponíveis. Por favor, inicie um novo jogo.
          </Text>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={handleGoHome}
          >
            <Text style={globalStyles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {state.gameMode === 'dupla' ? 'Resultado do Duelo' : 'Seus Resultados'}
          </Text>
          <Text style={styles.subtitle}>
            Parabéns! Você completou o desafio
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Player Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
            <FlatList
              data={playerStats}
              renderItem={renderStatCard}
              keyExtractor={(item) => item.name}
              scrollEnabled={false}
            />
          </View>

          {/* Performance Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Resumo da Performance</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total de Cartas:</Text>
                <Text style={styles.summaryValue}>{totalCards}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Cartas Completadas:</Text>
                <Text style={styles.summaryValue}>{(state.gameHistory || []).length}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Modo de Jogo:</Text>
                <Text style={styles.summaryValue}>
                  {state.gameMode === 'individual' ? 'Individual' : 'Dupla'} - {' '}
                  {state.gameType === 'rapido' ? 'Duelo Rápido' : 'Prática Focada'}
                </Text>
              </View>
              {state.selectedCategory && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Categoria:</Text>
                  <Text style={styles.summaryValue}>{state.selectedCategory}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Game History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Histórico de Respostas</Text>
            <FlatList
              data={state.gameHistory || []}
              renderItem={renderGameHistoryItem}
              keyExtractor={(item, index) => `${item.cardId || index}-${index}`}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <TouchableOpacity
            style={[globalStyles.button, styles.actionButton]}
            onPress={handlePlayAgain}
          >
            <Text style={globalStyles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, globalStyles.secondaryButton, styles.actionButton]}
            onPress={handleGoHome}
          >
            <Text style={globalStyles.secondaryButtonText}>Menu Principal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

  export default ResultsScreen;