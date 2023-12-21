
const EnterAmountModal = ({ amount, setAmount, handleJoinedWithAmount, handleCloseModal }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinedWithAmount();
    }

    // handle suggestion selection
    const handleSuggestion = (value) => {
      setAmount(value);
    }

  return (
    <div className='modal'>
        <div className="modal-content">
        <form onSubmit={handleSubmit}>
            <h3 className='modal-text'>Enter Money</h3>
            <input type="number" placeholder='Enter Amount' value={amount}
              onChange={(e) => setAmount(e.target.value)} className='login-form-input' min={5} step={5} required />

            <div className="modal-suggestions">
              <div className="modal-suggestion" onClick={() => handleSuggestion('10')}>10</div>
              <div className="modal-suggestion" onClick={() => handleSuggestion('15')}>15</div>
              <div className="modal-suggestion" onClick={() => handleSuggestion('20')}>20</div>
              <div className="modal-suggestion" onClick={() => handleSuggestion('35')}>35</div>
            </div>
            <button type="submit" className='modal-button'>Submit</button>
            <button type="button" className="modal-close-button" onClick={handleCloseModal}>Close</button>
          </form>
        </div>
    </div>
  )
}

export default EnterAmountModal