import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  // Obter estilos dinâmicos baseados no tema
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  const globalStyles = getGlobalStyles(isDarkMode);

  const menuOptions = [
    {
      id: 'start',
      title: 'Iniciar Duelo',
      subtitle: 'Comece um novo jogo',
      icon: '🎯',
      onPress: () => navigation.navigate('ModeSelection'),
    },
    {
      id: 'howto',
      title: 'Como Jogar',
      subtitle: 'Aprenda as regras',
      icon: '📚',
      onPress: () => navigation.navigate('HowToPlay'),
    },
    {
      id: 'settings',
      title: 'Configurações',
      subtitle: 'Personalize sua experiência',
      icon: '⚙️',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'credits',
      title: 'Créditos',
      subtitle: 'Sobre o projeto',
      icon: '👥',
      onPress: () => navigation.navigate('Credits'),
    },
  ];

  // Criar estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      paddingTop: spacing.xxl,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    logoIcon: {
      fontSize: 64,
      marginBottom: spacing.sm,
    },
    logoTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    logoSubtitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.secondary,
    },
    tagline: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
    },

    menuContainer: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.medium,
    },
    menuIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    menuIcon: {
      fontSize: 28,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      ...typography.subtitle,
      marginBottom: spacing.xs,
    },
    menuSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    menuArrow: {
      fontSize: 24,
      color: colors.primary,
      fontWeight: 'bold',
    },
    footer: {
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },
    footerText: {
      ...typography.small,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={dynamicStyles.container}>

        {/* Header */}
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.logoContainer}>
            <Text style={dynamicStyles.logoIcon}>🧬</Text>
            <Text style={dynamicStyles.logoTitle}>Duelo</Text>
            <Text style={dynamicStyles.logoSubtitle}>Metabólico</Text>
          </View>
          <Text style={dynamicStyles.tagline}>
            Aprenda metabolismo de forma divertida!
          </Text>
        </View>

        {/* Menu Options */}
        <View style={dynamicStyles.menuContainer}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={dynamicStyles.menuItem}
              onPress={option.onPress}
              activeOpacity={0.8}
            >
              <View style={dynamicStyles.menuIconContainer}>
                <Text style={dynamicStyles.menuIcon}>{option.icon}</Text>
              </View>
              <View style={dynamicStyles.menuTextContainer}>
                <Text style={dynamicStyles.menuTitle}>{option.title}</Text>
                <Text style={dynamicStyles.menuSubtitle}>{option.subtitle}</Text>
              </View>
              <Text style={dynamicStyles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={[dynamicStyles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <Text style={dynamicStyles.footerText}>
            Versão 1.0.0 • Desenvolvido para estudantes de saúde
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;