import React, { useState } from 'react';

const numbers = [
  {
    id: 'nine',
    value: '9'
  },
  { id: 'eight', value: '8' },
  {
    id: 'seven',
    value: '7'
  },
  {
    id: 'six',
    value: '6'
  },
  {
    id: 'five',
    value: '5'
  },
  {
    id: 'four',
    value: '4'
  },
  {
    id: 'three',
    value: '3'
  },
  {
    id: 'two',
    value: '2'
  },
  {
    id: 'one',
    value: '1'
  },
  { id: 'power', value: 'On/Off' },
  {
    id: 'zero',
    value: '0'
  },
  { id: 'decimal', value: '.' }
];

const sings = [
  {
    id: 'add',
    value: '+'
  },
  {
    id: 'subtract',
    value: '-'
  },
  {
    id: 'multiply',
    value: 'x'
  },
  {
    id: 'divide',
    value: '/'
  }
];

function App() {
  const endingDecimal = /[.]$/;
  const containDecimal = /\./g;
  const startingZero = /^0$/;
  const isOpperator = /[x/+-]/;
  const isNumber = /\d/;

  const clickHandler = (e, n) => {
    if (actions[actions.length - 2] === '=') {
      setActions([]);
      setDisplay('');
    }

    switch (n.value) {
      case '.':
        if (!endingDecimal.test(display) && !display.match(containDecimal)) {
          if (isOpperator.test(display)) {
            setDisplay('0.');
          } else setDisplay((prev) => `${prev}.`);
        } else return;
        break;

      case '0':
        if (isOpperator.test(display)) {
          setDisplay('0');
        } else
          !startingZero.test(display) && setDisplay((prev) => prev + n.value);
        break;

      default:
        if (isOpperator.test(display) || startingZero.test(display)) {
          if (isNegative()) {
            actions.pop();
            setDisplay('-' + n.value);
          } else {
            setDisplay(n.value);
          }
        } else setDisplay((prev) => prev + n.value);
        break;
    }
  };

  const isNegative = () => {
    return (
      isOpperator.test(actions[actions.length - 2]) &&
      actions[actions.length - 1] === '-'
    );
  };

  const actionHandler = (e, s) => {
    if (isOpperator.test(display) && !isNegative()) {
      if (s.value === display && s.value !== '-') {
        return;
      } else if (s.value === '-') {
        setDisplay(s.value);
        actions.push(s.value);
        console.log(actions);
      } else {
        setDisplay(s.value);
        actions[actions.length - 1] = s.value;
        console.log(actions);
        return;
      }
    } else if (isOpperator.test(display) && isNegative()) {
      if (s.value === '+') {
        actions.pop();
        actions[actions.length - 1] = s.value;
      } else return;
    } else {
      if (actions[actions.length - 2] === '=') {
        setActions([actions[actions.length - 1], s.value]);
        console.log(actions);
        setDisplay(s.value);
      } else {
        actions.push(getNumber());
        actions.push(s.value);
        console.log(actions);
        setDisplay(s.value);
      }
    }
  };

  const getNumber = () => {
    let num = Number(display);
    return num;
  };

  const getFinallResult = () => {
    if (actions[actions.length - 2] === '=') {
      return;
    }
    actions.push(getNumber());
    let result = 0;
    let letCurrentOpperator = '+';
    // eslint-disable-next-line array-callback-return
    actions.map((a) => {
      isNumber.test(a)
        ? (result = operate(result, a, letCurrentOpperator))
        : (letCurrentOpperator = a);
    });
    setDisplay(result);
    actions.push('=');
    actions.push(result);
    // setActions([result]);
    console.log(actions);
  };

  const operate = (numa, numb, operator) => {
    switch (operator) {
      case '+':
        return numa + numb;
      case '-':
        return numa - numb;
      case 'x':
        return numa * numb;
      case '/':
        return numa / numb;
      default:
        return;
    }
  };

  const [display, setDisplay] = useState('');
  const [actions, setActions] = useState([]);
  const [isOn, setIsOn] = useState(true);

  const clear = () => {
    setDisplay('');
    setActions([]);
  };

  const powerSwitch = () => {
    clear();
    if (isOn) {
      setIsOn(false);
      setDisplay('OFF');
    } else {
      setIsOn(true);
      setDisplay('');
    }
  };

  return (
    <>
      <div style={{ maxWidth: '400px' }}>
        <div className="display-container">
          <p className="display-text top">{actions.join('')}</p>
          <p className="display-text" id="display">
            {display ? display : 0}
          </p>
        </div>

        <div className="d-flex">
          <div className="d-flex flex-wrap" style={{ maxWidth: '500px' }}>
            {numbers.map((n) =>
              n.id === 'power' ? (
                <button
                  style={{ flex: '0 0 30.5%', margin: '2px' }}
                  key={n.id}
                  className="button"
                  onClick={() => powerSwitch()}
                  id={n.id}
                >
                  <p
                    style={{ fontSize: '1rem', padding: '13px' }}
                    className="button-text"
                  >
                    {n.value}
                  </p>
                </button>
              ) : (
                <button
                  disabled={!isOn}
                  style={{ flex: '0 0 30.5%', margin: '2px' }}
                  key={n.id}
                  className="button"
                  onClick={(e) => clickHandler(e, n)}
                  id={n.id}
                >
                  <p className="button-text">{n.value}</p>
                </button>
              )
            )}
          </div>
          <div className="d-flex flex-wrap">
            <button
              disabled={!isOn}
              className="button"
              id="clear"
              onClick={clear}
              style={{ flex: '0 0 100%', margin: '2px' }}
            >
              <p className="button-text">C</p>
            </button>
            {sings.map((s) => (
              <button
                disabled={!isOn}
                key={s.id}
                className="button"
                onClick={(e) => actionHandler(e, s)}
                id={s.id}
                style={{ flex: '0 0 47%', margin: '2px' }}
              >
                <p className="button-text">{s.value}</p>
              </button>
            ))}
            <button
              disabled={!isOn}
              className="button"
              id="equals"
              onClick={getFinallResult}
              style={{ flex: '0 0 100%', margin: '2px' }}
            >
              <p className="button-text">=</p>
            </button>
          </div>
        </div>
      </div>
      <a
        className="text-center w-100"
        style={{ display: 'block' }}
        href="https://github.com/dfdwebsites/build-a-javascript-calculator"
        target="_blank"
        rel="noreferrer"
      >
        By Iordanis Tselepidis
      </a>
    </>
  );
}

export default App;
