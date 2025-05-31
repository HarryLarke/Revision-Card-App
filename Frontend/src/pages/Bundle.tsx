import { useGetCardsByBundleIdQuery } from '../features/cards/cardsSlice'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelection } from '../hooks/useSelection'
import AddCard from '../components/AddCard'
import Card from '../components/Card'


const Bundle = () => {

  const { selectedBundle } = useSelection()
  const { bundleId } = useParams()
  const [ showAnswers, setShowAnswers ] = useState(false)

  const handleShow = (showAnswers: boolean) => {
    if(showAnswers === true) {
      return 'Hide'
    } return 'Show'
  }

  const {
    data: cards,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCardsByBundleIdQuery({bundleId}) //Could be going wrong here??

  let content 

  console.log(isLoading)

  //could have it so it selected and get bundle by id?

  if(isLoading) {
    content = <p>Loading Bundles...</p>
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  } else if (isSuccess) {
    content = <section className='Section-Multiple'>
      {cards.map((card) => 
      <Card 
      key={card._id} 
      _id={card._id}
      question={card.question} 
      answer={card.answer}
      showAnswers={showAnswers}
      /> )}

      <AddCard bundleId={bundleId}/>
    </section>
  }

  return (
  <>
        <section className='Header-Two'>
            <h2>{selectedBundle?.title}</h2>
            <button
            onClick={() => {setShowAnswers(prev => !prev)}}
            >{handleShow(showAnswers)} Answers</button>
            <Link to={`/practice/${bundleId}`}
            >Practice</Link>
            <Link to={`/bundle/edit/${bundleId}`}>Edit</Link>

        </section>

    {content}
  </>
  
  )
}

export default Bundle
