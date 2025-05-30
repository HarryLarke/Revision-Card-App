
const EditBundle = () => {
    //Do Change parent Bundle? 

        const [ question, setQuestion ] = useState('')
            const [ answer, setAnswer ] = useState('')
            //maybe later put userID in - however this might be handled on the backend?
            //Find the best method in sourcing parent bundle ID!
        
            //Maybe add more accessibilty elements to the page??? 
            const onQuestionChange = e => setQuestion(e.target.value)
            const onAnswerChange = e => setAnswer(e.target.value)
            
            const canSave = [question, answer].every(Boolean) && !isLoading
        
            const HandleSaveCard = async() => {
                if(canSave) {
                    try{
                        await newCard({question, answer, parentBundle: bundleId}).unwrap()
        
                        setQuestion('')
                        setAnswer('')
                        navigate('/') //Will need to change this!
                    } catch(err) {
                        console.log('Failed to post bundle:', err)
                    }
                }
            }
        
    return (
                <>
                <section className="Section-Single">
                    <h2>Add New Card</h2>
                
                    <form>
                        <label htmlFor="question">Question:</label>
                        <textarea 
                            rows={3}
                            cols={35}
                            id="question"
                            name="question"
                            value={question}
                            onChange={onQuestionChange} 
                            required
                            />
        
                        <label htmlFor="answer">Answer:</label>
                        <textarea
                            rows={3}
                            cols={35}
                            id='answer'
                            name='answer'
                            value={answer}
                            onChange={onAnswerChange}
                            required/>
        
                        <button type='button' 
                        className='Save-Button'
                        onClick={HandleSaveCard}
                        disabled={!canSave}
                        >Save</button>
                    </form>
        
                </section> 
                </>
            )
        }
        



export default EditBundle 