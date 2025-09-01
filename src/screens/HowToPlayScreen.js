import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const HowToPlayScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  
  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);
  
  const sections = [
    {
      title: '🎯 Objetivo do Jogo',
      content: 'Teste seus conhecimentos sobre metabolismo e sistemas biológicos através de um quiz com dicas progressivas. Quanto menos dicas usar, mais pontos você ganha!',
    },
    {
      title: '🎮 Modos de Jogo',
      content: [
        '• Modo Individual: Jogue sozinho e teste seus conhecimentos',
        '• Duelo Rápido: 10 cartas aleatórias para uma partida rápida',
        '• Prática Focada: Escolha um sistema específico para estudar',
        '• Modo Dupla: Jogue com um amigo no sistema "Passa e Joga"',
      ],
    },
    {
      title: '💡 Sistema de Dicas',
      content: [
        'Cada carta possui 3 dicas progressivas:',
        '• Dica 1: Mais difícil - 15 pontos',
        '• Dica 2: Média dificuldade - 10 pontos',
        '• Dica 3: Mais fácil - 5 pontos',
        '',
        'Você tem 3 tentativas por dica antes de passar para a próxima.',
      ],
    },
    {
      title: '🎯 Como Jogar',
      content: [
        '1. Leia a primeira dica com atenção',
        '2. Digite sua resposta no campo de texto',
        '3. Pressione "Adivinhar" para verificar',
        '4. Se errar, tente novamente ou solicite uma nova dica',
        '5. Após acertar ou esgotar as dicas, leia a explicação educacional',
        '6. Continue para a próxima carta',
      ],
    },
    {
      title: '📊 Pontuação',
      content: [
        'Sua pontuação depende de quantas dicas você usou:',
        '• Acertou na 1ª dica: 15 pontos',
        '• Acertou na 2ª dica: 10 pontos',
        '• Acertou na 3ª dica: 5 pontos',
        '• Não acertou: 0 pontos',
        '',
        'No modo dupla, os jogadores alternam turnos e competem pela maior pontuação.',
      ],
    },
    {
      title: '🏆 Dicas de Estudo',
      content: [
        '• Leia cada dica com calma e pense antes de responder',
        '• Use o modo Prática Focada para estudar temas específicos',
        '• Preste atenção nas explicações para aprender mais',
        '• Revise suas respostas na tela de resultados',
        '• Jogue regularmente para fixar o conhecimento',
      ],
    },
  ];

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
      marginBottom: spacing.sm,
    },
    sectionContent: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    sectionText: {
      ...typography.body,
      lineHeight: 22,
      marginBottom: spacing.xs,
      color: colors.text,
    },
    tipsBox: {
      backgroundColor: colors.secondary,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginTop: spacing.md,
      ...shadows.small,
    },
    tipsTitle: {
      ...typography.subtitle,
      color: colors.textLight,
      marginBottom: spacing.sm,
    },
    tipsText: {
      ...typography.body,
      color: colors.textLight,
      lineHeight: 22,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={dynamicStyles.container}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>Como Jogar</Text>
          <Text style={dynamicStyles.subtitle}>
            Guia completo do Duelo Metabólico
          </Text>
        </View>

        {/* Content */}
        <ScrollView 
          style={dynamicStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={dynamicStyles.scrollContent}
        >
          {sections.map((section, index) => (
            <View key={index} style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
              <View style={dynamicStyles.sectionContent}>
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <Text key={itemIndex} style={dynamicStyles.sectionText}>
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text style={dynamicStyles.sectionText}>{section.content}</Text>
                )}
              </View>
            </View>
          ))}

          {/* Tips Box */}
          <View style={dynamicStyles.tipsBox}>
            <Text style={dynamicStyles.tipsTitle}>💡 Dica Especial</Text>
            <Text style={dynamicStyles.tipsText}>
              As respostas não diferenciam maiúsculas de minúsculas e ignoram acentos. 
              Você pode digitar "glicose" ou "Glicose" que ambas serão aceitas!
            </Text>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={[dynamicStyles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('ModeSelection')}
          >
            <Text style={globalStyles.buttonText}>Entendi, Vamos Jogar!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HowToPlayScreen;