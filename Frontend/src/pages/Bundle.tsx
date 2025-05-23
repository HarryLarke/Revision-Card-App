import { useGetCardsByBundleIdQuery } from '../features/cards/cardsSlice'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import AddBundle from '../components/AddBundle'
import Card from '../components/Card'


const Bundle = () => {

  const { bundleId } = useParams()
  const [ showAnswers, setShowAnswers ] = useState(false)

  const handleTitle = (showAnswers) => {
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

      <AddBundle/>
    </section>
  }

  return (
  <>
        <section>
            <h2>Insert Bundle Name here...</h2>
            <button
            onClick={() => {setShowAnswers(prev => !prev)}}
            >{handleTitle(showAnswers)} Answers</button>

        </section>

    {content}
  </>
  
  )
}

export default Bundle
