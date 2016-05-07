import createCRUD from '../../../helpers/createCRUD';

const {methods: {create, update, load}, createReducer} = createCRUD('admin/blogInfo', 'CRU');

export default function reducer(state = {loaded: false}, action = {}) {
    return createReducer(state, action) || state;
}

export {create, update, load};

export function isLoaded(globalState) {
    return globalState.adminBlogInfo && globalState.adminBlogInfo.loaded;
}
