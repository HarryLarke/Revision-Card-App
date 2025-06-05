import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAddCardMutation } from "../features/cards/cardsSlice"
import { useParams } from "react-router"

import { useSelection } from "../hooks/useSelection"

const CreateCard = () => {
    const [ newCard, {isLoading} ] = useAddCardMutation()
    const navigate = useNavigate()

    const { bundleId } = useParams()
    const { selectedBundle } = useSelection()
    const [ question, setQuestion ] = useState('')
    const [ answer, setAnswer ] = useState('')

    //maybe later put userID in - however this might be handled on the backend?
    //Find the best method in sourcing parent bundle ID!

    //Maybe add more accessibilty elements to the page??? 
    const onQuestionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)
    const onAnswerChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)
    
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
        <h2>Add New Card for: {selectedBundle?.title}</h2>
        <section className="Section-Multiple-Columns">
            
            <form>
                <label htmlFor="question">Question:</label>
                <textarea 
                    rows={4}
                    cols={40}
                    id="bundleQuestion"
                    name="bundleQuestion"
                    value={question}
                    onChange={onQuestionChange} 
                    required
                    />

                <label htmlFor="answer">Answer:</label>
                <textarea
                    rows={4}
                    cols={40}
                    id='bundleanswer'
                    name='bundleDecsription'
                    value={answer}
                    onChange={onAnswerChange}
                    required/>

               
            </form>

            <div className='Button-Container-Column'>

                <Link className="Link-Button"
                to={`/bundle/${bundleId}`}
                >To Bundle
                </Link>

                 <button type='button' 
                className='Save-Button'
                onClick={HandleSaveCard}
                disabled={!canSave}
                >Save</button>
            </div>


        </section> 
        </>
    )
}

export default CreateCard