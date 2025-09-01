import { Dimensions, PixelRatio, Platform } from 'react-native';

// Obter dimensões da tela
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensões base para design (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Detectar tipo de dispositivo
const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      (SCREEN_WIDTH >= 768 && SCREEN_HEIGHT >= 1024) ||
      (SCREEN_WIDTH >= 1024 && SCREEN_HEIGHT >= 768)
    );
  }
};

const isSmallScreen = () => SCREEN_WIDTH < 350;
const isLargeScreen = () => SCREEN_WIDTH > 414;

// Função para escalar largura
export const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Função para escalar altura
export const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Função para escalar fonte baseada na largura da tela
export const normalize = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    if (isTablet()) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize * 1.2));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    if (isTablet()) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize * 1.3));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize * 0.95));
  }
};

// Função para espaçamento responsivo
export const spacing = {
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(16),
  lg: normalize(24),
  xl: normalize(32),
  xxl: normalize(48),
};

// Função para obter padding horizontal baseado no tipo de tela
export const getHorizontalPadding = () => {
  if (isTablet()) {
    return wp(8); // 8% nas laterais para tablets
  } else if (isLargeScreen()) {
    return wp(6); // 6% para telas grandes
  } else if (isSmallScreen()) {
    return wp(4); // 4% para telas pequenas
  }
  return wp(5); // 5% padrão
};

// Função para obter padding vertical baseado no tipo de tela
export const getVerticalPadding = () => {
  if (isTablet()) {
    return hp(3);
  }
  return hp(2);
};

// Função para obter tamanho de botão responsivo
export const getButtonSize = () => {
  if (isTablet()) {
    return {
      height: hp(7),
      minHeight: 60,
      paddingHorizontal: wp(8),
    };
  } else if (isSmallScreen()) {
    return {
      height: hp(6),
      minHeight: 44,
      paddingHorizontal: wp(6),
    };
  }
  return {
    height: hp(6.5),
    minHeight: 48,
    paddingHorizontal: wp(7),
  };
};

// Função para obter tamanho de card responsivo
export const getCardSize = () => {
  if (isTablet()) {
    return {
      width: wp(42), // 2 cards por linha em tablets
      minHeight: hp(25),
      margin: wp(2),
    };
  }
  return {
    width: wp(90), // Card full width em mobile
    minHeight: hp(20),
    margin: wp(2.5),
  };
};

// Função para obter configurações de grid responsivo
export const getGridConfig = () => {
  if (isTablet()) {
    return {
      numColumns: 2,
      itemWidth: wp(45),
      spacing: wp(2.5),
    };
  }
  return {
    numColumns: 1,
    itemWidth: wp(90),
    spacing: wp(2.5),
  };
};

// Exportar informações do dispositivo
export const deviceInfo = {
  isTablet: isTablet(),
  isSmallScreen: isSmallScreen(),
  isLargeScreen: isLargeScreen(),
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};

// Função para obter estilos de texto responsivos
export const getTextStyles = () => ({
  title: {
    fontSize: normalize(28),
    lineHeight: normalize(34),
  },
  subtitle: {
    fontSize: normalize(20),
    lineHeight: normalize(26),
  },
  body: {
    fontSize: normalize(16),
    lineHeight: normalize(22),
  },
  caption: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
  },
  small: {
    fontSize: normalize(12),
    lineHeight: normalize(16),
  },
  button: {
    fontSize: normalize(16),
    lineHeight: normalize(20),
  },
});

export default {
  wp,
  hp,
  normalize,
  spacing,
  getHorizontalPadding,
  getVerticalPadding,
  getButtonSize,
  getCardSize,
  getGridConfig,
  getTextStyles,
  deviceInfo,
};