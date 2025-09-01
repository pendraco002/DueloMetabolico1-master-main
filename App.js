import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { getColors } from './src/styles/theme';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import HowToPlayScreen from './src/screens/HowToPlayScreen';
import ModeSelectionScreen from './src/screens/ModeSelectionScreen';
import GameScreen from './src/screens/GameScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import CreditsScreen from './src/screens/CreditsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

// Componente interno que usa o tema
const AppNavigator = () => {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  return (
    <>
      <StatusBar 
        style={isDarkMode ? "light" : "dark"} 
        backgroundColor={colors.background} 
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: colors.textLight,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
            cardStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HowToPlay"
            component={HowToPlayScreen}
            options={{
              title: 'Como Jogar',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Configurações',
            }}
          />
          <Stack.Screen
            name="ModeSelection"
            component={ModeSelectionScreen}
            options={{
              title: 'Configurar Jogo',
            }}
          />
          <Stack.Screen 
            name="Game" 
            component={GameScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen}
            options={{
              title: 'Resultados',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Credits" 
            component={CreditsScreen}
            options={{
              title: 'Créditos',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GameProvider>
          <AppNavigator />
        </GameProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}