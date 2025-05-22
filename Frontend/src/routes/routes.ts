export const ROUTES = {
    HOME: '/',
    BUNDLE: (id: string) => `/bundle/${id}`,
    BUNDLE_CREATE: '/bundle/create',
    EDIT_BUNDLE: (id: string) => `/bundle/edit/${id}`,
    CARD: (id: string) => `/card/${id}`,
    CARD_CREATE: '/card/create',
    EDIT_CARD: (id: string) => `/card/edit/${id}`,
    PRACTICE: (id: string) => `/practice/${id}`

}