import {Injectable} from "@nestjs/common";
import {CommentEntity} from "./CommentEntity.js";
import {plainToInstance} from "class-transformer";
import {Repository} from "typeorm";
import type {AddCommentRequestBody} from "../comments_controller/AddCommentRequestBody.js";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CommentsService {
	private readonly commentsRepository: Repository<CommentEntity>;
	public constructor(
		@InjectRepository(CommentEntity) commentsRepository: Repository<CommentEntity>
	) {
		this.commentsRepository = commentsRepository;
	}

	public async getCommentsByPostId(postId: string): Promise<Comment> {
		return plainToInstance(Comment, this.commentsRepository.find({where: {postId}}));
	}
	public async addComment(
		postId: string,
		createCommentRequestBody: AddCommentRequestBody
	): Promise<Comment> {
		return plainToInstance(
			Comment,
			await this.commentsRepository.save({
				...createCommentRequestBody,
				postId,
			})
		);
	}
}
