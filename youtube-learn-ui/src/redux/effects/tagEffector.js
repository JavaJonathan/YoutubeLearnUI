import * as tagService from "../../services/tagService";
import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
} from "../actionTypes";

export async function tagEffector(action, dispatch) {
  const payload = action?.payload;

  switch (action.type) {
    case GET_TAGS: {
      try {
        const tags = await tagService.getTags();
        dispatch({ type: GET_TAGS_SUCCESS, payload: tags });
      } catch (error) {
        dispatch({ type: GET_TAGS_FAILURE, payload: error });
      }
      break;
    }

    case CREATE_TAG: {
      try {
        const tagName = typeof payload === "string" ? payload : payload?.name;

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
