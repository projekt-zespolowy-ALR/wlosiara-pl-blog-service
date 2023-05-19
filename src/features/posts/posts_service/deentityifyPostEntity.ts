import {plainToClass} from "class-transformer";
import Post from "../posts_controller/Post.js";
import type PostEntity from "./PostEntity.js";

export default function deentityifyPostEntity(postEntity: PostEntity): Post {
	return plainToClass(Post, postEntity);
}
