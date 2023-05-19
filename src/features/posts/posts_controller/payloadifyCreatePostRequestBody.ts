import type CreatePostRequestBody from "./CreatePostRequestBody.js";
import CreatePostPayload from "../posts_service/CreatePostPayload.js";
import {plainToClass} from "class-transformer";

export default function payloadifyCreatePostRequestBody(
	createPostRequestBody: CreatePostRequestBody
): CreatePostPayload {
	return plainToClass(CreatePostPayload, createPostRequestBody);
}
