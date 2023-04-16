import { useState } from "react"
import Button from './Button'

export default function Calculator() {
// STATE
const [isOn, setIsOn] = useState(true)
const [total, setTotal] = useState(0)
const [current, setCurrent] = useState([])
const [operation, setOperation] = useState(null)

// BEHAVIOR
const refreshCalculator = () => {
  setCurrent([])
  setOperation(null)
  setTotal(0)
}

const toggleIsOn = () => {
  if (isOn) {
    setCurrent([])
    setOperation(null)
    setTotal(0)
  }
  setIsOn(prevMode => !prevMode)
}

const removeLastDigit = () => {
  const currentCopy = [...current]
  currentCopy.pop()
  setCurrent(currentCopy)
}

const addDigit = (value) => {
  if (isOn === false) {
    return
  }

  const currentCopy = [...current]
  const hasDecimal = currentCopy.toString().includes('.')

  if (value === '.' && hasDecimal) {
    return
  }

  currentCopy.push(value)
  setCurrent(currentCopy)
}

const performOperation = (op) => {
  if (operation === null) {
    setTotal(current)
    setCurrent([])
    setCurrent((current) => {
      if (current.length !== 0) {
        setTotal(Number(current))
        return []
      } else {
        return current
      }
    })
  } else if (operation !== null) {
    if (operation === "+") {
      setTotal([Number(total.join('')) + Number(current.join(''))])
    } else if (operation === "-") {
      setTotal([Number(total.join('')) - Number(current.join(''))])
    } else if (operation === "X") {
      setTotal(Number(total.join('')) === 0 ? [Number(current.join(''))] : [Number(total.join('')) * Number(current.join(''))])
    } else if (operation === "/") {
      setTotal(Number(total.join('')) === 0 ? [Number(current.join(''))] : [Number(total.join('')) / Number(current.join(''))])
    } else if (operation === "%") {
      setTotal([Number(total.join('')) / 100])
    } else if (operation === "√") {
      setTotal([Math.sqrt(Number(current.join('')))])
    }
  }
  setOperation(op)
  setCurrent([])
}

const calculateResult = () => {
  const totalNumber = Number(total.join(''))
  const currentNumber = Number(current.join(''))

  if (operation === "+") {
    setCurrent([totalNumber + currentNumber])
    setTotal([totalNumber + currentNumber])
    setOperation(null)
  } else if (operation === "-") {
    setCurrent([totalNumber - currentNumber])
    setTotal([totalNumber - currentNumber])
    setOperation(null)
  } else if (operation === "X") {
    setCurrent([totalNumber * currentNumber])
    setTotal([totalNumber * currentNumber])
    setOperation(null)
  } else if (operation === "/") {
    setCurrent([totalNumber / currentNumber])
    setTotal([totalNumber / currentNumber])
    setOperation(null)
  } else if (operation === "%") {
    setCurrent([totalNumber / 100])
    setTotal([totalNumber / 100])
    setOperation(null)
  } else if (operation === "√") {
    setCurrent([Math.sqrt(currentNumber)])
    setTotal([Math.sqrt(currentNumber)])
    setOperation(null)
  }
}

const screen = <h2 className="result">{current.length === 0 ? 0 : current}</h2>
const screenOff = <h2 className="result"> </h2>

// RENDERING
  return (
    <div className="calculator">
      <div className={isOn ? "screen" : "screen off"}>
        {isOn ? screen : screenOff}
      </div>
      <div className="row">
        <div className="toggler">
          {/* <p>ON</p> */}
          <div className={isOn ? "toggler-slider" : "toggler-slider is-off"} onClick={toggleIsOn}>
            <div className="toggler-slider-circle"></div>
          </div>
          <p>I/O</p>
        </div>
      </div>
      <div className="row">
        <Button
          name='CE'
          type="calcbutton"
          onClick={() => removeLastDigit()}
        />
        <Button
          name='7'
          type="digit"
          onClick={() => addDigit(7)}
        />
        <Button
          name='8'
          type="digit"
          onClick={() => addDigit(8)}
        />
        <Button
          name='9'
          type="digit"
          onClick={() => addDigit(9)}
        />
        <Button
          name='/'
          type="calcbutton"
          onClick={() => performOperation("/")}
        />
      </div>
      <div className="row">
        <Button
          name='%'
          type="calcbutton"
          onClick={() => performOperation("%")}
        />
        <Button
          name='4'
          type="digit"
          onClick={() => addDigit(4)}
        />
        <Button
          name='5'
          type="digit"
          onClick={() => addDigit(5)}
        />
        <Button
          name='6'
          type="digit"
          onClick={() => addDigit(6)}
        />
        <Button
          name='X'
          type="calcbutton"
          onClick={() => performOperation("X")}
        />
      </div>
      <div className="row">
        <Button
          name='√'
          type="calcbutton"
          onClick={() => performOperation("√")}
        />
        <Button
          name='1'
          type="digit"
          onClick={() => addDigit(1)}
        />
        <Button
          name='2'
          type="digit"
          onClick={() => addDigit(2)}
        />
        <Button
          name='3'
          type="digit"
          onClick={() => addDigit(3)}
        />
        <Button
          name='-'
          type="calcbutton"
          onClick={() => performOperation("-")}
        />
      </div>
      <div className="row">
        <Button
          name='AC'
          type="calcbutton"
          onClick={() => refreshCalculator()}
        />
        <Button
          name='0'
          type="digit"
          onClick={() => addDigit(0)}
        />
        <Button
          name='.'
          type="calcbutton"
          onClick={() => addDigit(".")}
        />
        <Button
          name='='
          type="equal"
          onClick={() => calculateResult()}
        />
        <Button
          name='+'
          type="calcbutton"
          onClick={() => performOperation("+")}
        />
      </div>
    </div>
  )
}
