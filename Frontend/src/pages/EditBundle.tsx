import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'

import { useSelection } from '../hooks/useSelection'
import { useUpdatedBundleMutation } from '../features/bundles/bundlesSlice'

const EditBundle = () => {

    const { selectedBundle } = useSelection()
    const { bundleId } = useParams()
    const navigate = useNavigate()

    const [ updateBundle, {isLoading} ] = useUpdatedBundleMutation()

    const [ title, setTitle ] = useState(selectedBundle?.title)
    const [ description, setDescription ] = useState(selectedBundle?.description)

    //Could have a parent bundle selector - just wondering how I woudl insert that data... err closer to implement a useContext??

    const onTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
    const onDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
            
    const canSave = [title, description].every(Boolean) && !isLoading
 
        
    const HandleUpdateBundle = async() => {
        if(canSave && bundleId) {
            const bundle = {title, description}

            try{
                await updateBundle({bundle, _id:bundleId}).unwrap() //change slice to string | undefined - don't know if best??
        
                setTitle('')
                setDescription('')
                navigate('/') //Will need to change this!
                    } catch(err) {
                        console.log('Failed to post :', err)
                    }
                }
            }
        return(
              <>
                <section className="Section-Single">
                    <h2>Edit Bundle</h2>
                
                    <form>
                        <label htmlFor="title">Title</label>
                        <textarea 
                            rows={3}
                            cols={35}
                            id="title"
                            name="title"
                            value={title}
                            onChange={onTitleChange} 
                            required
                            />

                        <label htmlFor="description">Desription:</label>
                        <textarea
                            rows={3}
                            cols={35}
                            id='description'
                            name='description'
                            value={description}
                            onChange={onDescriptionChange}
                            required/>

                        <button type='button' 
                        className='Save-Button'
                        onClick={HandleUpdateBundle}
                        disabled={!canSave}
                        >Save</button>
                    </form>

                </section> 
            </>
        ) 
        
        
}

export default EditBundle