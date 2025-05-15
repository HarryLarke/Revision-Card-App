import { Request, Response } from 'express' 

import Bundle from "../model/Bundle"
//Need Promise here?
export const getAllBundles = async (req: Request, res: Response): Promise<void> => {
    const bundles = await Bundle.find()
    if(!bundles) {
        res.status(204).json({'message': 'No Bundles Found'})
        return 
    }
    res.json({bundles})
}

export const createNewBundle  = async (req: Request, res: Response): Promise<void> => {
    if(!req?.body.title || !req?.body.description ) {
        res.status(400).json({'message': 'Bundle title and description required.'})
        return
    }
    //Still figuring where I will put ID 
    try{
        const result = await Bundle.create({
            title : req.body.title,
            description : req.body.description,
        })
        res.status(201).json(result)
    }catch(err) {
        console.error(err)
    }
}

export const updateBundle = async (req: Request, res: Response): Promise<void> => {
    if(!req?.body?.id) {
        res.status(401).json({'message': 'ID parameter required.'})
        return
    }
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()//Make id and _id allign
    if(!bundle) {
        res.status(204).json({'message': `No Bundle ID matches for: ${req.body.id}`})
        return 
        }
    if(req.body?.title) { bundle.title = req.body.title}
    if(req.body?.description) { bundle.description = req.body.description}
    const result = await bundle.save()
    res.json(result)
}

//Should this be in the ID section on the router?
export const deleteBundle = async (req: Request, res: Response): Promise<void> => {
    if(!req.params?.id) {
        res.status(400).json({'message': 'Bundle ID required.'})
        return
        }
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()
    if(!bundle) {
        res.status(204).json({'message': `No Bundle ID matcges for: ${req.body.id}`})
        return
        }   
    const result = await bundle.deleteOne({
        _id: req.body.id
    })
    res.json({result})
}

export const getBundle = async (req: Request, res: Response): Promise<void> => {
    if(!req.params?.id) {
        res.status(400).json({'message': 'Bundle ID required.'})
        return
    }   
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()
    if(!bundle) {
        res.status(204).json({'message': `No Bundle ID matches for: ${req.body.id}`})
        return
    }
    res.json(bundle)
}