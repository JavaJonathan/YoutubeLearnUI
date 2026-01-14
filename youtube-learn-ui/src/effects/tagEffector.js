import * as tagService from '../services/tagService';
import { CREATE_TAG, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE } from '../redux/actionTypes';

export async function tagEffector(action, dispatch) {
  const payload = action?.payload;

  switch (action.type) {
    case CREATE_TAG: {
      try {
        const tagName = typeof payload === 'string' ? payload : payload?.name;

        const tags = await tagService.createTag(tagName);

        dispatch({ type: CREATE_TAG_SUCCESS, payload: tags });
      } catch (error) {
        dispatch({ type: CREATE_TAG_FAILURE, payload: error });
      }
      break;
    }

    default:
      break;
  }
}
