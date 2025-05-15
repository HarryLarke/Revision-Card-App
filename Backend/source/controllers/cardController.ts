import { Request, Response } from 'express'

import Card from "../model/Card"
import Bundle from "../model/Bundle"

//Need Promises here?
export const getAllCards = async (req: Request, res: Response): Promise<void> => {
    const card = await Card.find()
    if(!card) {
        res.status(204).json({'message': 'No Card Found'})
        return
    }
    res.json({card})
}

export const createNewCard  = async (req: Request, res: Response): Promise<void> => {
    if(!req?.body.question || !req?.body.answer ) {
        res.status(400).json({'message': 'Card quesion and answer required.'})
        return 
    }
    //Still figuring where I will put ID 
    else if(!req?.body.id) {
        res.status(400).json({'message': 'A number id was NOT assigned to the card'})
        return 
    }
    //Will need to find out how to check parent bundle matching!
    try{
        const result = await Card.create({
            parentBundle: req.body.parentBundle, //Needs to type of ID
            question : req.body.question,
            answer : req.body.answer
        })
        res.status(201).json(result)
    }catch(err) {
        console.error(err)
    }
}

export const updateCard = async (req: Request, res: Response): Promise<void> => {
    if(!req?.body?.id) {
        res.status(401).json({'message': 'ID parameter required.'})
        return 
    }
    const card = await Card.findOne({_id: req.body.id}).exec()//Make id and _id allign
    if(!card) {
        res.status(204).json({'message': `No card ID matches for: ${req.body.id}`})
        return
    }
    if(req.body?.question) { card.question = req.body.question}
    if(req.body?.answer) { card.answer = req.body.description} //Maybe implement a re-assign parent bundle??
    const result = await card.save()
    res.json(result)
}

//Should this be in the ID section on the router?
export const deleteCard = async (req: Request, res:Response): Promise<void> => {
    if(!req.params?.id) {
        res.status(400).json({'message': 'Card ID required.'})
        return
    }
    const card = await Card.findOne({_id: req.body.id}).exec()
    if(!card) {
        res.status(204).json({'message': `No card ID matcges for: ${req.body.id}`})
        return 
    }
    const result = await card.deleteOne({
        _id: req.body.id
    })
    res.json({result})
}

export const getCard = async (req: Request, res: Response): Promise<void> => {
    if(!req.params?.id) {
        res.status(400).json({'message': 'Card ID required.'})
        return 
    }
    const card = await Card.findOne({_id: req.body.id}).exec()
    if(!card) {
        res.status(204).json({'message': `No card ID matches for: ${req.body.id}`})
        return 
    }
    res.json(card)
}