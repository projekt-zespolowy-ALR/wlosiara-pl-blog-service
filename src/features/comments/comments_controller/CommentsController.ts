import {Body, Controller, Get, Param, Post, ValidationPipe} from "@nestjs/common";
import {CommentsService} from "../comments_service/CommentsService.js";
import type {AddCommentRequestBody} from "./AddCommentRequestBody.js";

@Controller("/posts/:postId/comments")
export class CommentsController {
	private readonly commentsService: CommentsService;
	public constructor(commentsService: CommentsService) {
		this.commentsService = commentsService;
	}

	@Get("/")
	public async getCommentsByPostId(@Param("postId") postId: string): Promise<Comment> {
		return this.commentsService.getCommentsByPostId(postId);
	}

	@Post("/")
	public async addComment(
		@Param("postId") postId: string,
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody
				whitelist: true, // Do not allow other properties than those defined in CreateCatRequestBody
				forbidNonWhitelisted: true, // Throw an error if other properties than those defined in CreateCatRequestBody are present
			})
		)
		createCommentRequestBody: AddCommentRequestBody
	): Promise<Comment> {
		return this.commentsService.addComment(postId, createCommentRequestBody);
	}
}
