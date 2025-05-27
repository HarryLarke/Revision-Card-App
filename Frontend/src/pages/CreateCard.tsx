import { useState } from "react"
import { useNavigate } from "react-router"
import { useAddCardMutation } from "../features/cards/cardsSlice"
import { useParams } from "react-router"

const CreateCard = () => {
    const [ newCard, {isLoading} ] = useAddCardMutation()
    const navigate = useNavigate()

    const { bundleId } = useParams()

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

    return(
        <>
        <section className="Section-Single">
            <h2>Add New Card</h2>
        
            <form>
                <label htmlFor="bundleQuestion">Question:</label>
                <textarea 
                    rows={3}
                    cols={35}
                    id="bundleQuestion"
                    name="bundleQuestion"
                    value={question}
                    onChange={onQuestionChange} 
                    required
                    />

                <label htmlFor="bundleanswer">Answer:</label>
                <textarea
                    rows={3}
                    cols={35}
                    id='bundleanswer'
                    name='bundleDecsription'
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

export default CreateCard