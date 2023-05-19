import {IsNotEmpty, IsString, IsUUID, IsUrl} from "class-validator";

export default class CreatePostRequestBody {
	@IsNotEmpty()
	@IsString()
	public readonly contentMd!: string;
	@IsUUID("4")
	public readonly authorId!: string;
	@IsNotEmpty()
	@IsString()
	public readonly title!: string;
	@IsUrl()
	public readonly imageUrl!: string;
}
