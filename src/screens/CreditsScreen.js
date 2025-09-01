import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const CreditsScreen = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);

  const teamMembers = [
    {
      name: 'Equipe de Desenvolvimento',
      role: 'Gabriel,Rennan, Thiago e Vitoria',
      description: 'Responsáveis pela criação e implementação do aplicativo',
    },
    {
      name: 'Consultores Acadêmicos',
      role: 'Especialistas em Metabolismo',
      description: 'Validação do conteúdo científico e educacional',
    },
    {
      name: 'Designers UX/UI',
      role: 'Design de Interface',
      description: 'Criação da experiência visual e interativa',
    },
  ];

  const acknowledgments = [
    {
      title: '📚 Conteúdo Educacional',
      description: 'Baseado em literatura científica reconhecida e diretrizes acadêmicas atuais.',
    },
    {
      title: '🎨 Design e Usabilidade',
      description: 'Interface desenvolvida seguindo princípios de acessibilidade e experiência do usuário.',
    },
    {
      title: '🔬 Validação Científica',
      description: 'Todo conteúdo foi revisado por especialistas em bioquímica e metabolismo.',
    },
    {
      title: '🎯 Metodologia Educacional',
      description: 'Sistema de dicas progressivas baseado em técnicas de aprendizagem ativa.',
    },
  ];

  const handleRateApp = () => {
    alert('Funcionalidade de avaliação será implementada na versão da loja');
  };

  // Criar estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    appIcon: {
      fontSize: 64,
      marginBottom: spacing.sm,
    },
    appName: {
      ...typography.title,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    version: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    tagline: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
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
    missionCard: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      ...shadows.medium,
    },
    missionText: {
      ...typography.body,
      color: colors.textLight,
      lineHeight: 24,
      textAlign: 'center',
    },
    memberCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.small,
    },
    memberName: {
      ...typography.subtitle,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    memberRole: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    memberDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    acknowledgmentCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderLeftWidth: 4,
      borderLeftColor: colors.secondary,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    acknowledgmentTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    acknowledgmentDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    techCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.small,
    },
    techTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    techList: {
      gap: spacing.xs,
    },
    techItem: {
      ...typography.caption,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    contactCard: {
      backgroundColor: colors.secondary,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      alignItems: 'center',
      ...shadows.medium,
    },
    contactTitle: {
      ...typography.subtitle,
      color: colors.textLight,
      marginBottom: spacing.sm,
    },
    contactText: {
      ...typography.body,
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing.md,
    },
    contactButton: {
      backgroundColor: colors.textLight,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
    },
    contactButtonText: {
      ...typography.button,
      color: colors.secondary,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'center',
    },
    footerText: {
      ...typography.small,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.appIcon}>🧬</Text>
          <Text style={dynamicStyles.appName}>Duelo Metabólico</Text>
          <Text style={dynamicStyles.version}>Versão 1.0.0</Text>
          <Text style={dynamicStyles.tagline}>
            Aprendizado gamificado de metabolismo
          </Text>
        </View>

        {/* Mission */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>🎯 Nossa Missão</Text>
          <View style={dynamicStyles.missionCard}>
            <Text style={dynamicStyles.missionText}>
              Tornar o aprendizado de metabolismo e sistemas biológicos mais
              acessível, divertido e eficaz através de uma experiência gamificada
              que promove o raciocínio dedutivo e a retenção de conhecimento.
            </Text>
          </View>
        </View>

        {/* Team */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>👥 Equipe</Text>
          {teamMembers.map((member, index) => (
            <View key={index} style={dynamicStyles.memberCard}>
              <Text style={dynamicStyles.memberName}>{member.name}</Text>
              <Text style={dynamicStyles.memberRole}>{member.role}</Text>
              <Text style={dynamicStyles.memberDescription}>{member.description}</Text>
            </View>
          ))}
        </View>

        {/* Acknowledgments */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>🙏 Reconhecimentos</Text>
          {acknowledgments.map((item, index) => (
            <View key={index} style={dynamicStyles.acknowledgmentCard}>
              <Text style={dynamicStyles.acknowledgmentTitle}>{item.title}</Text>
              <Text style={dynamicStyles.acknowledgmentDescription}>{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Technical Info */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>⚙️ Informações Técnicas</Text>
          <View style={dynamicStyles.techCard}>
            <Text style={dynamicStyles.techTitle}>Tecnologias Utilizadas:</Text>
            <View style={dynamicStyles.techList}>
              <Text style={dynamicStyles.techItem}>• React Native + Expo</Text>
              <Text style={dynamicStyles.techItem}>• JavaScript ES6+</Text>
              <Text style={dynamicStyles.techItem}>• React Navigation</Text>
              <Text style={dynamicStyles.techItem}>• Context API</Text>
              <Text style={dynamicStyles.techItem}>• AsyncStorage</Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>📞 Contato</Text>
          <View style={dynamicStyles.contactCard}>
            <Text style={dynamicStyles.contactTitle}>Gostou do projeto?</Text>
            <Text style={dynamicStyles.contactText}>
              Deixe sua avaliação e ajude outros estudantes a descobrir esta ferramenta!
            </Text>
            <TouchableOpacity
              style={dynamicStyles.contactButton}
              onPress={handleRateApp}
            >
              <Text style={dynamicStyles.contactButtonText}>Avaliar App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[dynamicStyles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <Text style={dynamicStyles.footerText}>
          Desenvolvido com ❤️ para a comunidade acadêmica{'\n'}
          © 2024 Duelo Metabólico. Todos os direitos reservados.
        </Text>
      </View>
    </SafeAreaView>
  );
};



export default CreditsScreen;