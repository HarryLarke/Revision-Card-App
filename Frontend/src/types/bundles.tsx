export interface Bundle {
    _id: string, //ObjectId
    title: string, 
    description: string,
    createdAt: Date,
    updatedAt: Date
}

export interface NewBundle {
    title: string, 
    description: string, 
}

export interface UpdatedBundle {
    title: string, 
    descrption: string
}