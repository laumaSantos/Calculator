import React, {Component} from "react";
import './Calculator.css'
import Button from '../components/button/Button'
import Display from "../components/display/Display";

const initialState = {
    displayValue: '0', 
    clearDisplay: false,
    oparation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation) {
       if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
       } else{
        const equals = operation === '=' 
        const currentOperation = this.state.operation
        const values = [...this.state.values]
        try{ 
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
        }catch(e){
            values[0] = this.state.values[0]
        }
        values[1] = 0

        this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals,
            values
        })
       }
    }

    addDigit(n){
       if(n === '.' && this.state.displayValue.includes('.')){
        return
       }
       //limpar  acalculadora caso clearDisplay = 0 ou for true
        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        //se o valor for clearValue seta vazio se não seta displayValue
        const currentValue = clearDisplay ? '' : this.state.displayValue
       // n = número digitado pelo usuário
        const displayValue = currentValue + n
        //muda o estado inicial de displayValue, após digitar o valor, clearDisplay fica falso
        this.setState({displayValue, clearDisplay : false})
         
        //armazena numeros no array values
        if (n !== '.') {
            //armazena no i o indice dentro do array que se está manipulando
            const i = this.state.current
            //converte para float e amazena em newvalue
            const newValue = parseFloat(displayValue)
            //Clona o array e recebe  em values
            const values = [... this.state.values]
            //altera o valor atual 
            values[i] = newValue
            //adiciona o array no estado do objeto
            this.setState({ values })
            console.log(values)
        }


    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4"click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-"click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}