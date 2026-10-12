
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

const BUTTONS = [
  ['7', '8', '9', 'C', 'AC'],
  ['4', '5', '6', '+', '-'],
  ['1', '2', '3', '*', '/'],
  ['0', '.', '00', '='],
];

const OPERATORS = ['+', '-', '*', '/', '='];

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handlePress = (button: string) => {
    console.log(`Button pressed: ${button}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#37474F"
      />

      <View style={styles.container}>
        {/* AppBar */}
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle}>Calculator</Text>
        </View>

        {/* Display */}
        <View
          style={[
            styles.display,
            isLandscape && styles.landscapeDisplay,
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.expression}
          >
            0
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.result}
          >
            0
          </Text>
        </View>

        {/* Keyboard */}
        <View
          style={[
            styles.keyboard,
            isLandscape && styles.landscapeKeyboard,
          ]}
        >
          {BUTTONS.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((button) => {
                const isClear = button === 'C' || button === 'AC';
                const isOperator = OPERATORS.includes(button);

                return (
                  <Pressable
                    key={button}
                    onPress={() => handlePress(button)}
                    style={({ pressed }) => [
                      styles.button,
                      pressed && styles.pressedButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        isClear && styles.clearText,
                        isOperator && styles.operatorText,
                      ]}
                    >
                      {button === '*' ? '×' :
                       button === '/' ? '÷' : button}
                    </Text>
                  </Pressable>
                );
              })}

              {/* Keep the last row aligned with the other rows */}
              {row.length < 5 && (
                <View style={styles.emptyButton} />
              )}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#37474F',
  },

  container: {
    flex: 1,
    backgroundColor: '#090606',
  },

  appBar: {
    height: 56,
    backgroundColor: '#F39A08',
    alignItems: 'center',
    justifyContent: 'center',
  },

  appBarTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },

  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  landscapeDisplay: {
    flex: 1,
    paddingVertical: 6,
  },

  expression: {
    color: '#DCE6EC',
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'right',
  },

  result: {
    color: '#78909C',
    fontSize: 26,
    textAlign: 'right',
  },

  keyboard: {
    flex: 1,
    minHeight: 220,
    backgroundColor: '#444141',
  },

  landscapeKeyboard: {
    flex: 2,
    minHeight: 0,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(14, 17, 19, 0.18)',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyButton: {
    flex: 1,
  },

  buttonText: {
    color: '#E1E1E1',
    fontSize: 22,
    fontWeight: '400',
  },

  clearText: {
    color: '#F39A08',
  },

  operatorText: {
    color: '#F39A08',
  },

  pressedButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
