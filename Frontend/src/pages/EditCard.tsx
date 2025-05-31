import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'

import { useSelection } from '../hooks/useSelection'
import { useUpdatedCardMutation } from '../features/cards/cardsSlice'

const EditCard = () => {

    const { selectedCard } = useSelection()
    const [ updateCard, {isLoading} ] = useUpdatedCardMutation()
    const { cardId } = useParams()

    const navigate = useNavigate()

    const [ question, setQuestion ] = useState(selectedCard?.question)
    const [ answer, setAnswer ] = useState(selectedCard?.answer)

    //Could have a parent bundle selector - just wondering how I woudl insert that data... err closer to implement a useContext??

   
    const onQuestionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)
    const onAnswerChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)
            
    const canSave = [question, answer].every(Boolean) && !isLoading
 
        
    const HandleUpdateCard = async() => {
        if(canSave && cardId) {

            try{
                await updateCard({question, answer, _id: cardId}).unwrap() //change slice to string | undefined - don't know if best??
        
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