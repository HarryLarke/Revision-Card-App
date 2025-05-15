import Bundle from "../model/Bundle"

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

export const updateBundle = async (req, res) => {
    if(!req?.body?.id) 
        return res.status(401).json({'message': 'ID parameter required.'})
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()//Make id and _id allign
    if(!bundle) 
        return res.status(204).json({'message': `No Bundle ID matches for: ${req.body.id}`})

    if(req.body?.title) { bundle.title = req.body.title}
    if(req.body?.description) { bundle.description = req.body.description}
    const result = await bundle.save()
    res.json(result)
}

//Should this be in the ID section on the router?
export const deleteBundle = async (req, res) => {
    if(!req.params?.id) 
        return res.status(400).json({'message': 'Bundle ID required.'})
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()
    if(!bundle) 
        return res.status(204).json({'message': `No Bundle ID matcges for: ${req.body.id}`})

    const result = await bundle.deleteOne({
        _id: req.body.id
    })
    res.json({result})
}

export const getBundle = async (req, res) => {
    if(!req.params?.id) 
        return res.status(400).json({'message': 'Bundle ID required.'})
    const bundle = await Bundle.findOne({_id: req.body.id}).exec()
    if(!bundle) 
        return res.status(204).json({'message': `No Bundle ID matches for: ${req.body.id}`})
    res.json(bundle)
}