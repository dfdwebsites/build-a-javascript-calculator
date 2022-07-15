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
  { id: 'decimal', value: '.' },
  {
    id: 'zero',
    value: '0'
  }
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
          setDisplay(n.value);
        } else setDisplay((prev) => prev + n.value);
        break;
    }
  };

  const actionHandler = (e, s) => {
    if (isOpperator.test(display)) {
      if (s.value === display) {
        return;
      } else {
        setDisplay(s.value);
        actions[actions.length - 1] = s.value;
        console.log(actions);
        return;
      }
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
    actions.push(Number(display));
    let result = 0;
    let letCurrentOpperator = '+';
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

  const clear = () => {
    setDisplay('');
    setActions([]);
  };

  return (
    <>
      <div>
        <p className="button__text">{actions.join('')}</p>
        <p id="display">{display ? display : 0}</p>
      </div>

      <div className="d-flex">
        <div className="d-flex flex-wrap" style={{ maxWidth: '500px' }}>
          {numbers.map((n) => (
            <button
              style={{ flex: '0 0 32.5%', margin: '2px' }}
              key={n.id}
              className="button"
              onClick={(e) => clickHandler(e, n)}
              id={n.id}
            >
              <div className="button__content">
                <p className="button__text">{n.value}</p>
              </div>
            </button>
          ))}
          <button
            className="button"
            id="equals"
            onClick={getFinallResult}
            style={{ flex: '0 0 32.5%', margin: '2px' }}
          >
            <div className="button__content">
              <p className="button__text">=</p>
            </div>
          </button>
        </div>
        <div>
          <button className="button" id="clear" onClick={clear}>
            <div className="button__content">
              <p className="button__text">C</p>
            </div>
          </button>
          {sings.map((s) => (
            <button
              key={s.id}
              className="button"
              onClick={(e) => actionHandler(e, s)}
              id={s.id}
            >
              <div className="button__content">
                <p className="button__text">{s.value}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
