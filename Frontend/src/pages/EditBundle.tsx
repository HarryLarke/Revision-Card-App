import { useParams, useNavigate, Link } from 'react-router'
import { useState } from 'react'

import { useSelection } from '../hooks/useSelection'
import { useUpdatedBundleMutation, useDeleteBundleMutation } from '../features/bundles/bundlesSlice'
import { useDeleteCardsByBundleIdMutation } from '../features/cards/cardsSlice'

const EditBundle = () => {

    const { selectedBundle } = useSelection()
    const { bundleId } = useParams()
    const navigate = useNavigate()

    const [ updateBundle, {isLoading: isUpdating} ] = useUpdatedBundleMutation()
    const [ deleteBundle, {isLoading: isDeletingBundle } ] = useDeleteBundleMutation()
    const [ deleteCards, {isLoading: isDeletingCards } ] = useDeleteCardsByBundleIdMutation()
    //Will need to find a method to which we can delete the cards too!
    
    const [ title, setTitle ] = useState(selectedBundle?.title)
    const [ description, setDescription ] = useState(selectedBundle?.description)
    const [ showConfirmDelete, setShowConfirmDelete ] = useState(false)

    //Could have a parent bundle selector - just wondering how I woudl insert that data... err closer to implement a useContext??
    //May also add  a type in title to delete component to improve security!

    const onTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
    const onDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
            
    const canSave = [title, description].every(Boolean) && !isUpdating
    
    const handleDeleteClicker = () => {
        setShowConfirmDelete(prev => !prev)
    }

    const handleMakePublicClicker = () => {
        console.log('Feature coming soon!')
    }

    const handleDeleteBundle = async () => {
        if(bundleId && !isDeletingBundle && !isDeletingCards) {
            try{
                await Promise.all([
                    deleteBundle(bundleId).unwrap(),
                    deleteCards(bundleId).unwrap()
                    ])
                setTitle('')
                setDescription('')
                navigate('/')
            } catch(err) {
                console.log(`Failed to delete bundle data: ${err}`)
            } 
        }
    }
        
    const handleUpdateBundle = async() => {
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
                {showConfirmDelete ? 

                <section className='Overlay'>

                    <div className='Popup-Delete'>
                        <h3>Are you sure you want to delete: {selectedBundle?.title}</h3>
                        <button className='Delete-Button'
                        onClick={handleDeleteBundle}
                        >Yes</button> 
                    
                        <button className='Link-Button'
                        onClick={handleDeleteClicker}
                        >No</button>
                    </div>

                </section> : <></>} 
        
              <h2>Edit {selectedBundle?.title}</h2>

               <section className="Section-Multiple-Columns">

                
                    <form>
                        <label htmlFor="title">Title</label>
                        <textarea 
                            rows={4}
                            cols={40}
                            id="title"
                            name="title"
                            value={title}
                            onChange={onTitleChange} 
                            required
                            />

                        <label htmlFor="description">Desription:</label>
                        <textarea
                            rows={4}
                            cols={40}
                            id='description'
                            name='description'
                            value={description}
                            onChange={onDescriptionChange}
                            required/>
                    </form>

                    <div className='Button-Container-Column'>
                        <button type='button' 
                        className='Save-Button'
                        onClick={handleUpdateBundle}
                        disabled={!canSave}
                        >Save</button>

                        <Link className='Link-Button'
                        to={`/bundle/${bundleId}`}
                        >Back</Link>

                        <button className='Delete-Button'
                        onClick={handleDeleteClicker}
                        >Delete Bundle</button>

                        <button className='Link-Button'
                        onClick={handleMakePublicClicker}
                        >Make Public</button>
                        
                    </div>
                    

                </section> 
        </>
        ) 
        
        
}

export default EditBundle