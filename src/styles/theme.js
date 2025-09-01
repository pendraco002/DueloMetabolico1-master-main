import { StyleSheet } from 'react-native';

// Paletas de cores para tema claro e escuro
const lightColors = {
  primary: '#0077B6',      // Azul médico
  secondary: '#28A745',    // Verde sucesso
  error: '#DC3545',        // Vermelho alerta
  warning: '#FFC107',      // Amarelo aviso
  background: '#FFFFFF',   // Branco
  backgroundAlt: '#F8F9FA', // Off-white
  text: '#212529',         // Texto principal
  textSecondary: '#6C757D', // Texto secundário
  textLight: '#FFFFFF',    // Texto claro
  border: '#DEE2E6',       // Bordas
  shadow: '#00000020',     // Sombra
  disabled: '#E9ECEF',     // Desabilitado
  
  // Gradientes
  primaryGradient: ['#0077B6', '#005A8B'],
  successGradient: ['#28A745', '#1E7E34'],
  errorGradient: ['#DC3545', '#C82333'],
};

const darkColors = {
  primary: '#4FC3F7',      // Azul mais claro para contraste
  secondary: '#66BB6A',    // Verde mais claro
  error: '#EF5350',        // Vermelho mais claro
  warning: '#FFCA28',      // Amarelo mais claro
  background: '#121212',   // Preto suave
  backgroundAlt: '#1E1E1E', // Cinza escuro
  text: '#FFFFFF',         // Texto branco
  textSecondary: '#B0B0B0', // Texto secundário claro
  textLight: '#FFFFFF',    // Texto claro
  border: '#333333',       // Bordas escuras
  shadow: '#00000040',     // Sombra mais intensa
  disabled: '#2C2C2C',     // Desabilitado escuro
  
  // Gradientes
  primaryGradient: ['#4FC3F7', '#29B6F6'],
  successGradient: ['#66BB6A', '#4CAF50'],
  errorGradient: ['#EF5350', '#F44336'],
};

// Função para obter as cores baseadas no tema
export const getColors = (isDarkMode = false) => {
  return isDarkMode ? darkColors : lightColors;
};

// Função para obter tipografia dinâmica
export const getTypography = (isDarkMode = false) => {
  const colors = getColors(isDarkMode);
  
  return {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: colors.text,
    },
    hint: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textLight,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
      color: colors.textSecondary,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal',
      color: colors.textSecondary,
    },
  };
};

// Função para obter sombras dinâmicas
export const getShadows = (isDarkMode = false) => {
  const colors = getColors(isDarkMode);
  
  return {
    small: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: isDarkMode ? 0.4 : 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: isDarkMode ? 0.5 : 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  };
};

// Espaçamentos (não mudam com o tema)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordas (não mudam com o tema)
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

// Função para obter estilos globais dinâmicos
export const getGlobalStyles = (isDarkMode = false) => {
  const colors = getColors(isDarkMode);
  const typography = getTypography(isDarkMode);
  const shadows = getShadows(isDarkMode);
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 0,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
      ...shadows.medium,
    },
    button: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.small,
    },
    buttonText: {
      ...typography.button,
      color: colors.textLight,
    },
    secondaryButton: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      ...typography.button,
      color: colors.primary,
    },
    successButton: {
      backgroundColor: colors.secondary,
    },
    errorButton: {
      backgroundColor: colors.error,
    },
    disabledButton: {
      backgroundColor: colors.disabled,
    },
    disabledButtonText: {
      color: colors.textSecondary,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      fontSize: 16,
      backgroundColor: colors.backgroundAlt,
      color: colors.text,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    inputError: {
      borderColor: colors.error,
    },
    title: {
      ...typography.title,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    subtitle: {
      ...typography.subtitle,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    body: {
      ...typography.body,
      lineHeight: 24,
    },
    hint: {
      ...typography.hint,
      lineHeight: 24,
      textAlign: 'center',
    },
    caption: {
      ...typography.caption,
      textAlign: 'center',
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
      marginTop: spacing.xs,
    },
    successText: {
      ...typography.caption,
      color: colors.secondary,
      marginTop: spacing.xs,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: spacing.md,
    },
    badge: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.round,
      alignSelf: 'flex-start',
    },
    badgeText: {
      ...typography.small,
      color: colors.textLight,
      fontWeight: '600',
    },
    successBadge: {
      backgroundColor: colors.secondary,
    },
    errorBadge: {
      backgroundColor: colors.error,
    },
    warningBadge: {
      backgroundColor: colors.warning,
    },
  });
};

// Animações (não mudam com o tema)
export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
  },
};

// Breakpoints para responsividade (não mudam com o tema)
export const breakpoints = {
  small: 320,
  medium: 768,
  large: 1024,
};

// Utilitários para estilos condicionais
export const getButtonStyle = (variant = 'primary', disabled = false, isDarkMode = false) => {
  const globalStyles = getGlobalStyles(isDarkMode);
  let baseStyle = [globalStyles.button];
  
  if (disabled) {
    baseStyle.push(globalStyles.disabledButton);
  } else {
    switch (variant) {
      case 'secondary':
        baseStyle.push(globalStyles.secondaryButton);
        break;
      case 'success':
        baseStyle.push(globalStyles.successButton);
        break;
      case 'error':
        baseStyle.push(globalStyles.errorButton);
        break;
      default:
        // primary já é o padrão
        break;
    }
  }
  
  return baseStyle;
};

export const getButtonTextStyle = (variant = 'primary', disabled = false, isDarkMode = false) => {
  const globalStyles = getGlobalStyles(isDarkMode);
  
  if (disabled) {
    return [globalStyles.buttonText, globalStyles.disabledButtonText];
  }
  
  switch (variant) {
    case 'secondary':
      return [globalStyles.buttonText, globalStyles.secondaryButtonText];
    default:
      return globalStyles.buttonText;
  }
};

export const getBadgeStyle = (variant = 'primary', isDarkMode = false) => {
  const globalStyles = getGlobalStyles(isDarkMode);
  let baseStyle = [globalStyles.badge];
  
  switch (variant) {
    case 'success':
      baseStyle.push(globalStyles.successBadge);
      break;
    case 'error':
      baseStyle.push(globalStyles.errorBadge);
      break;
    case 'warning':
      baseStyle.push(globalStyles.warningBadge);
      break;
    default:
      // primary já é o padrão
      break;
  }
  
  return baseStyle;
};

// Exportações para compatibilidade com código existente
export const colors = lightColors;
export const typography = getTypography(false);
export const shadows = getShadows(false);
export const globalStyles = getGlobalStyles(false);