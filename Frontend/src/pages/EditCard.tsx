import { useParams, useNavigate, Link } from 'react-router'
import { useState } from 'react'

import { useSelection } from '../hooks/useSelection'
import { useUpdatedCardMutation, useDeleteCardMutation } from '../features/cards/cardsSlice'

const EditCard = () => {

    const { selectedCard } = useSelection()
    const [ updateCard, {isLoading} ] = useUpdatedCardMutation()
    const [ deleteCard ] = useDeleteCardMutation()
    const { cardId } = useParams()

    const navigate = useNavigate()

    const [ question, setQuestion ] = useState(selectedCard?.question)
    const [ answer, setAnswer ] = useState(selectedCard?.answer)

    //Could have a parent bundle selector - just wondering how I woudl insert that data... err closer to implement a useContext??
    //Will need the Bundle ID to send back to the bundle!
   
    const onQuestionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)
    const onAnswerChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)
            
    const canSave = [question, answer].every(Boolean) && !isLoading
    
    //Mayb require loading he data - if state is empty!
        
    const HandleUpdateCard = async() => {
        if(canSave && cardId) {
            try{
                await updateCard({question, answer, _id: cardId}).unwrap() //change slice to string | undefined - don't know if best??
                setQuestion('')
                setAnswer('')
                navigate(`/`) //Will need to change this! Will contain /bundle/${bundleId}
                    } catch(err) {
                        console.log('Failed to post :', err)
                    }}}
    
    const HandleDeleteCard = async() => {
        if(cardId) try{
            const _id = cardId
            await deleteCard(_id).unwrap()
            setQuestion('')
            setAnswer('')
            if(isLoading === false) {
                navigate(`/bundle/${selectedCard?.parentBundle}`)
            }
        } catch(err) {
            console.log('Failed to delete:', err)
        }}

        return(
              <>
              <h2>Edit Card</h2>
                <section className="Section-Multiple-Columns">
                    
                
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

                    </form>

                    <div className='Button-Container-Column'>
                        <Link className='Link-Button'
                        to={`/card/${cardId}`}>
                        To Card</Link>

                        <Link className='Link-Button'
                        to={`/bundle/${selectedCard?.parentBundle}`}
                        >To Bundle</Link>

                         <button type='button' 
                        className='Save-Button'
                        onClick={HandleUpdateCard}
                        disabled={!canSave}
                        >Save</button>

                        <button type='button'
                        className='Delete-Button'
                        onClick={HandleDeleteCard}
                        >Delete Card</button>
                    </div>

                </section> 
            </>
        ) 
        
        
}

export default EditCard