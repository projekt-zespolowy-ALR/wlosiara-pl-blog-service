import {
	Body,
	Controller,
	Get,
	Delete,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post as NestJsPost,
	Query,
	ValidationPipe,
} from "@nestjs/common";
import PostsService from "../posts_service/PostsService.js";
import PagingOptions from "../../../paging/PagingOptions.js";
import type Page from "../../../paging/Page.js";
import type WlosiaraPlBlogPost from "./Post.js";
import PostsServicePostWithGivenIdNotFoundError from "../posts_service/PostsServicePostWithGivenIdNotFoundError.js";
import CreatePostRequestBody from "./CreatePostRequestBody.js";
import payloadifyCreatePostRequestBody from "./payloadifyCreatePostRequestBody.js";

@Controller("/")
export default class PostsController {
	private readonly postsService: PostsService;
	public constructor(postsService: PostsService) {
		this.postsService = postsService;
	}
	@Get("/posts")
	public async getPosts(
		@Query(
			new ValidationPipe({
				transform: true, // Transform to instance of PagingOptions
				whitelist: true, // Do not put other query parameters into the object
			})
		)
		pagingOptions: PagingOptions
	): Promise<Page<WlosiaraPlBlogPost>> {
		return await this.postsService.getPosts(pagingOptions);
	}

	@Get("/posts/:postId")
	public async getPostById(
		@Param(
			"postId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		postId: string
	): Promise<WlosiaraPlBlogPost> {
		try {
			const targetPost = await this.postsService.getPostById(postId);
			return targetPost;
		} catch (error) {
			if (error instanceof PostsServicePostWithGivenIdNotFoundError) {
				throw new NotFoundException(`Post with id "${postId}" not found`);
			}
			throw error;
		}
	}

	@NestJsPost("/posts")
	public async createPost(
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody
				whitelist: true, // Do not allow other properties than those defined in CreateCatRequestBody
				forbidNonWhitelisted: true, // Throw an error if other properties than those defined in CreateCatRequestBody are present
			})
		)
		createPostRequestBody: CreatePostRequestBody
	): Promise<WlosiaraPlBlogPost> {
		return await this.postsService.createPost(
			payloadifyCreatePostRequestBody(createPostRequestBody)
		);
	}

	@Delete("/posts/:postId")
	public async deletePostById(
		@Param(
			"postId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		postId: string
	): Promise<boolean> {
		try {
			const targetPost = await this.postsService.deletePostById(postId);
			return targetPost;
		} catch (error) {
			if (error instanceof PostsServicePostWithGivenIdNotFoundError) {
				throw new NotFoundException(`Post with id "${postId}" not found`);
			}
			throw error;
		}
	}
}
