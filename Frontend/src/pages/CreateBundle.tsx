import { useState } from "react"
import { useNavigate } from "react-router"
import { useAddBundleMutation } from "../features/bundles/bundlesSlice"

const CreateBundle = () => {
    const [ newBundle, {isLoading} ] = useAddBundleMutation()
    const navigate = useNavigate()

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    //maybe later put userID in - however this might be handled on the backend?


    //Maybe add more accessibilty elements to the page??? 
    const onTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
    const onDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
    
    const canSave = [title, description].every(Boolean) && !isLoading

    const HandleSaveBundle = async() => {
        if(canSave) {
            try{
                await newBundle({title, description}).unwrap()

                setTitle('')
                setDescription('')
                navigate('/')
            } catch(err) {
                console.log('Failed to post buncle:', err)
            }
        }
    }

    return(
        <>
        <section className="Section-Single">
            <h2>Create New Bundle</h2>
        
            <form>
                <label htmlFor="bundleTitle">Bundle Title:</label>
                <textarea 
                    rows={3}
                    cols={35}
                    id="bundleTitle"
                    name="bundleTitle"
                    value={title}
                    onChange={onTitleChange} 
                    required
                    />

                <label htmlFor="bundleDescription">Bundle Description:</label>
                <textarea
                    rows={3}
                    cols={35}
                    id='bundleDescription'
                    name='bundleDecsription'
                    value={description}
                    onChange={onDescriptionChange}
                    required/>

                <button type='button' 
                className='Save-Button'
                onClick={HandleSaveBundle}
                disabled={!canSave}
                >Save</button>
            </form>

        </section> 
        </>
    )
}

export default CreateBundle