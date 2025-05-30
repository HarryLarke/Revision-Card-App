import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { useGetCardByIdQuery, useUpdatedCardMutation } from '../features/cards/cardsSlice'

const EditCard = () => {

    const [ updateCard, {isLoading} ] = useUpdatedCardMutation()
    const { cardId } = useParams()

    const navigate = useNavigate()

    const [ question, setQuestion ] = useState('')
    const [ answer, setAnswer ] = useState('')

    //Could have a parent bundle selector - just wondering how I woudl insert that data... err closer to implement a useContext??

   
    const onQuestionChange = e => setQuestion(e.target.value)
    const onAnswerChange = e => setAnswer(e.target.value)
            
    const canSave = [question, answer].every(Boolean) && !isLoading
 
        
    const HandleUpdateCard = async() => {
        if(canSave && cardId) {
            console.log(question)
            console.log(answer)
            console.log(cardId)

            try{
                await updateCard({question, answer, _id: cardId}).unwrap()
        
                setQuestion('')
                setAnswer('')
                navigate('/') //Will need to change this!
                    } catch(err) {
                        console.log('Failed to post :', err)
                    }
                }
            }
        return(
              <>
                <section className="Section-Single">
                    <h2>Edit Card</h2>
                
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
                        onClick={HandleUpdateCard}
                        disabled={!canSave}
                        >Save</button>
                    </form>

                </section> 
            </>
        ) 
        
        
}

export default EditCard