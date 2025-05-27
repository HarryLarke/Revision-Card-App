
const ViewCard = ({question, answer, showAnswer}) => {

    return(
        <section className="ViewCard">
            <p>Question:</p>
            <p>{question}</p>

            <br/>
            
            <p>Answer:</p>

            {showAnswer === true ? <p>{answer}</p> : <br/>}

        </section>
    )
}

export default ViewCard