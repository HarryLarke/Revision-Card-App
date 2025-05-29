import { useState } from "react"
import { useParams, Link } from "react-router"
import { useGetCardsByBundleIdQuery } from "../features/cards/cardsSlice"

import useKeys from "../hooks/useKeys"

import  ViewCard from "../components/ViewCard"

const Practice = () => {
    
    const [ showAnswer, setShowAnswer] = useState(false)
    const [ count, setCount ] = useState(0)

    const { bundleId } = useParams()

     const {
        data: cards,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetCardsByBundleIdQuery({bundleId})

      //May have some sort guard on these instead of using ?
      const cardlength: number | undefined = cards?.length
      const canNext: boolean = count >= cardlength
      const canPrev: boolean = count <= 0
      //Still abit buggy!

      const handleCount = (method: string) => {
        const card = cards?.[count]
        if(method === 'question') return card?.question 
        else if(method === 'answer') return card?.answer 
        return 
      }

    const handleShow = (showAnswer: boolean) => {
        if(showAnswer === true) {
        return 'Hide'
        } return 'Show'
    }

    useKeys("ArrowLeft", () => {if(!canPrev) {setCount(count - 1)
                setShowAnswer(false)
        }})

    useKeys("ArrowRight", () => {if(!canNext) {setCount(count + 1)
                setShowAnswer(false)
    }})

    
    useKeys("Space", () => {setShowAnswer(prev => !prev)})

    //Will a system of disabiling the buttons
    return (
        <>   
        {count >= cardlength ? 
        <section className="ViewCard">
            <h2>Bundle Completed</h2>
            <Link to={`/bundle/${bundleId}`}>Back</Link>
        </section> 

        : <ViewCard 
        question={handleCount('question')}
        answer={handleCount('answer')}
        showAnswer={showAnswer}
        />}
        <section className='Box'>

            <button
            disabled={canPrev}
            onClick={() => {setCount(count - 1)
                setShowAnswer(false)
            }}
            >Prev</button>

            <button
            onClick={() => {setShowAnswer(prev => !prev)}}
            >{handleShow(showAnswer)} Anwser</button>

            <button 
            disabled={canNext}
            onClick={() => {setCount(count + 1)
                setShowAnswer(false)
            }}
            >Next</button>
        
        </section>
        </>
    )
}

export default Practice