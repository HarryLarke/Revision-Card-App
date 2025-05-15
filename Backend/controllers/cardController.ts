import Card from "../model/Card"

export const getAllCards = async (req, res) => {
    const card = await Card.find()
    if(!card) return res.status(204).json({'message': 'No Card Found'})
    res.json({card})
}

export const createNewCard  = async (req, res) => {
    if(!req?.body.question || !req?.body.answer )
        return res.status(400).json({'message': 'Card quesion and answer required.'})
    //Still figuring where I will put ID 
    else if(!req?.body.id) 
        return res.status(400).json({'message': 'A number id was NOT assigned to the card'})

    try{
        const result = await Card.create({
            id: req.body.id, //Maybe rid?
            parentBundle: req.body.parentBundle, //Needs to type of ID
            question : req.body.question,
            answer : req.body.answer
        })
        res.status(201).json(result)
    }catch(err) {
        console.error(err)
    }
}

export const updateCard = async (req, res) => {
    if(!req?.body?.id) 
        return res.status(401).json({'message': 'ID parameter required.'})
    const card = await Card.findOne({_id: req.body.id}).exec()//Make id and _id allign
    if(!card) 
        return res.status(204).json({'message': `No card ID matches for: ${req.body.id}`})

    if(req.body?.question) { card.question = req.body.question}
    if(req.body?.answer) { card.answer = req.body.description} //Maybe implement a re-assign parent bundle??
    const result = await card.save()
    res.json(result)
}

//Should this be in the ID section on the router?
export const deleteCard = async (req, res) => {
    if(!req.params?.id) 
        return res.status(400).json({'message': 'Card ID required.'})
    const card = await Card.findOne({_id: req.body.id}).exec()
    if(!card) 
        return res.status(204).json({'message': `No card ID matcges for: ${req.body.id}`})

    const result = await card.deleteOne({
        _id: req.body.id
    })
    res.json({result})
}

export const getCard = async (req, res) => {
    if(!req.params?.id) 
        return res.status(400).json({'message': 'Card ID required.'})
    const card = await Card.findOne({_id: req.body.id}).exec()
    if(!card) 
        return res.status(204).json({'message': `No card ID matches for: ${req.body.id}`})
    res.json(card)
}