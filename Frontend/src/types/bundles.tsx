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
    title: string | undefined, 
    description: string | undefined
}

export interface DisplayBundle {
    _id: string, 
    title: string, 
    description: string 
}