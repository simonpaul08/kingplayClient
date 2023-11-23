import React from 'react'

const EnterAmountModal = ({ amount, setAmount, handleJoinedWithAmount }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinedWithAmount();
    }

  return (
    <div className='modal'>
        <div className="modal-content">
        <form onSubmit={handleSubmit}>
            <h3 className='modal-text'>Enter Amount</h3>
            <input type="number" placeholder='Enter Amount' value={amount}
              onChange={(e) => setAmount(e.target.value)} className='login-form-input' min={5} step={5} required />
            <button className='modal-button'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default EnterAmountModal