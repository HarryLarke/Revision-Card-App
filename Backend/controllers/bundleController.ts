import Bundle from "../model/Card"

export const getAllBundles = async (req, res) => {
    const bundles = await Bundle.find()
    if(!bundles) return res.status(204).json({'message': 'No Bundles Found'})
    res.json({bundles})
}

export const createNewBundle  = async (req, res) => {
    if(!req?.body.title || !req?.body.description )
        return res.status(400).json({'message': 'Bundle title and description required.'})
    //Still figuring where I will put ID 
    else if(!req?.body.id) 
        return res.status(400).json({'message': 'A number id was NOT assigned to the bundle'})

    try{
        const result = await Bundle.create({
            title : req.body.title,
            description : req.body.description,
            id: req.body.id
        })
        res.status(201).json(result)
    }catch(err) {
        console.error(err)
    }
}

