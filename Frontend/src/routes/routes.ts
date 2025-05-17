export const ROUTES = {
    HOME: '/',
    BUNDLE: (id: string) => `/bundle/${id}`,
    EDIT_BUNDLE: (id: string) => `/bundle/edit/${id}`,
    CARD: (id: string) => `/card/${id}`,
    EDIT_CARD: (id: string) => `/card/${id}/edit`,
    PRACTICE: (id: string) => `/practice/${id}`

}