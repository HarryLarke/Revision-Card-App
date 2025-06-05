import { useState } from "react"
import { useNavigate, Link } from "react-router"
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
        <h2>Create New Bundle</h2>
        <section className="Section-Multiple-Columns">
            
        
            <form>
                <label htmlFor="bundleTitle">Bundle Title:</label>
                <textarea 
                    rows={4}
                    cols={40}
                    id="bundleTitle"
                    name="bundleTitle"
                    value={title}
                    onChange={onTitleChange} 
                    required
                    />

                <label htmlFor="bundleDescription">Bundle Description:</label>
                <textarea
                    rows={4}
                    cols={40}
                    id='bundleDescription'
                    name='bundleDecsription'
                    value={description}
                    onChange={onDescriptionChange}
                    required/>

                
            </form>

               <div className='Button-Container-Column'>
                    <Link className='Link-Button'
                    to={'/'}
                    >Home</Link>

                    <button type='button' 
                    className='Save-Button'
                    onClick={HandleSaveBundle}
                    disabled={!canSave}
                    >Save</button>

                </div>

        </section> 
        </>
    )
}

export default CreateBundle