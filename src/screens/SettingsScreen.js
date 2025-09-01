import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getColors, getTypography, spacing, borderRadius, getShadows, getGlobalStyles } from '../styles/theme';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

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
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      alignItems: 'center',
    },
    title: {
      ...typography.title,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    settingItem: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.small,
    },
    settingLeft: {
      flex: 1,
    },
    settingTitle: {
      ...typography.subtitle,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    settingDescription: {
      ...typography.small,
      color: colors.textSecondary,
    },
    themeToggle: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.full,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.small,
    },
    themeToggleIcon: {
      fontSize: 24,
    },
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={dynamicStyles.container}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>Configurações</Text>
          <Text style={dynamicStyles.subtitle}>
            Personalize sua experiência
          </Text>
        </View>

        {/* Content */}
        <View style={dynamicStyles.content}>
          {/* Theme Setting */}
          <View style={dynamicStyles.settingItem}>
            <View style={dynamicStyles.settingLeft}>
              <Text style={dynamicStyles.settingTitle}>Tema</Text>
              <Text style={dynamicStyles.settingDescription}>
                {isDarkMode ? 'Modo escuro ativo' : 'Modo claro ativo'}
              </Text>
            </View>
            <TouchableOpacity
              style={dynamicStyles.themeToggle}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={dynamicStyles.themeToggleIcon}>
                {isDarkMode ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;