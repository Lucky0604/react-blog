import createCRUD from '../../helpers/createCRUD';

const INSERT_COMMENT = 'article/INSERT_COMMENT';
const {methods: {load}, createReducer} = createCRUD('article', 'R');

export default function reducer(state = {}, action = {}) {
    let stateCRUB = createReducer(state, action);
    if (stateCRUB) {
        return stateCRUB;
    } else {
        switch (action.type) {
            case INSERT_COMMENT:
                let state = {...state};
                state.data.data.comments.unshift(action.comment);
                return state;
            default:
                return state;
        }
    }
}

export {load};

export function insertComment(comment) {
    return {
        type: INSERT_COMMENT,
        comment: comment
    }
}
