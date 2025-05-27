import { useGetCardByIdQuery } from "../features/cards/cardsSlice"
import { useParams, Link } from "react-router"
import { useState } from "react"

import ViewCard from "../components/ViewCard"

const Card = () => {
    const [ showAnswer, setShowAnswer ] = useState(false)
    const { cardId } = useParams()

    const {
         data: card,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCardByIdQuery(cardId)


    const handleShow = (showAnswer) => {
    if(showAnswer === true) {
      return 'Hide'
    } return 'Show'
  }

  //Would be cool to have this as two columns 
  //Need to probablly have the loading and error stuff on display?

  //May not need a link to return to the parent bundle?
  //Cool to have a feature like practice to potentially move onto the next card?

    return(
        <>
        <section>
            <h2>View Card</h2>
            <button onClick={() => setShowAnswer(prev => !prev)}
            >
            {handleShow(showAnswer)} Answer</button>
            <Link to={`/card/edit/${card?._id}`}>Edit Card</Link>
            <Link to={`/bundle/${card?.parentBundle}`}>Back to Bundle</Link>
        
        </section>
        
        <ViewCard
            question={card?.question}
            answer={card?.answer}
            showAnswer={showAnswer}
        />
        </>
    )
}

export default Card
//Probably a more streamline way to have and get the card data - probably mess with my cardSlice later !