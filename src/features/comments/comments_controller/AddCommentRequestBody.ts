import {IsString} from "class-validator";

export class AddCommentRequestBody {
	@IsString()
	public readonly text!: string;

	@IsString()
	public readonly authorId!: string;
}
