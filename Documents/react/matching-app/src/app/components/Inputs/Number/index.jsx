import "./index.css"

export default function NumberInput({increaseInput, decreaseInput, value}) {
    return (
        <div className="input-container">
            <span className="input-number-decrement" onClick={decreaseInput}>–</span>
            <input className="input-number" type="text" value={value} min="0" max="10" />
            <span className="input-number-increment" onClick={increaseInput} >+</span>
        </div>
    )
}