
import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { evaluate, format } from 'mathjs';

const BUTTONS = [
  ['7', '8', '9', 'C', 'AC'],
  ['4', '5', '6', '+', '-'],
  ['1', '2', '3', '*', '/'],
  ['0', '.', '00', '='],
];

const OPERATORS = ['+', '-', '*', '/'];
const MAX_LENGTH = 100;

function calculate(expression: string): string | null {
  if (!expression || expression.length > MAX_LENGTH) {
    return null;
  }

  try {
    const value = evaluate(expression);

    if (!Number.isFinite(value)) {
      return null;
    }
      return String(value);
  } catch {
    return null;
  }
}

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handlePress = (button: string) => {
    console.log(`button pressed :${button}`);

    if (button === 'AC') {
      setExpression('');
      setResult('0');
      setHasCalculated(false);
      return;
    }

  if (button === 'C') {
    if (hasCalculated) {
      setExpression('');
      setResult('0');
      setHasCalculated(false);
      return;
    }

    setExpression(expression.slice(0, -1));
    setHasCalculated(false);
    return;
}

  if (button === '=') {
  const value = calculate(expression);

  if (value !== null) {
    setResult(value);
    setHasCalculated(true);
  } else {
    setResult('Error');
    setHasCalculated(false);
  }

  return;
}

    let next = expression;
    setHasCalculated(false);

    if (next.length >= MAX_LENGTH) {
      return;
    }

    if (OPERATORS.includes(button)) {
      if (!next) {
        if (button !== '-') return;
      } else {
        const last = next.slice(-1);
        const previous = next.slice(-2, -1);

        if (OPERATORS.includes(last)) {
          if (button === '-' && last !== '-') {
            // Allow negative numbers, e.g. 5 * -2.
            next += '-';
          } else if (
            last === '-' &&
            OPERATORS.includes(previous)
          ) {
            // Replace the operator and its unary minus.
            next = next.slice(0, -2) + button;
          } else {
            // Replace the last operator.
            next = next.slice(0, -1) + button;
          }

          setExpression(next);
          setResult(calculate(next) ?? '0');
          return;
        }
      }
    }

    if (button === '.') {
      const currentNumber = next.split(/[+*/-]/).pop() ?? '';

      if (currentNumber.includes('.')) return;

      if (!currentNumber) {
        next += '0';
      }
    }

 if (button === '00') {
  next += '00';
} else {
  next += button;
}


    if (next.length > MAX_LENGTH) return;

   setExpression(next);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#607D8B"
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
            {expression || '0'}
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.result}
          >
            {result}
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
                const isOperator =
                  OPERATORS.includes(button) || button === '=';

                return (
                  <Pressable
                    key={button}
                    onPress={() => handlePress(button)}
                    style={({ pressed }) => [
                      styles.button,
                      isClear && styles.clearButton,
                      isOperator && styles.operatorButton,
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
                      {button === '*' ? '×' : button === '/' ? '÷' : button}
                    </Text>
                  </Pressable>
                );
              })}
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
    height: 40,
    backgroundColor: '#ec960b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  landscapeDisplay: {
    flex: 1.5,
    paddingVertical: 8,
  },
  expression: {
    color: '#dce6ec',
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'right',
  },
  result: {
    color: '#778c96',
    fontSize: 22,
    textAlign: 'right',
  },
  keyboard: {
    height: '30%',
    minHeight: 150,
    backgroundColor: '#444141',
  },
  landscapeKeyboard: {
    height: undefined,
    minHeight: 0,
    flex: 1,
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
    color: '#e1e1e1',
    fontSize: 16,
    fontWeight: '400',
  },
  clearButton: {
    // Flat red clear buttons like the reference.
  },
  clearText: {
    color: '#ec960b',
  },
  operatorButton: {
    // Operators remain on the same flat keyboard background.
  },
  operatorText: {
    color: '#ec960b',
  },
  pressedButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
