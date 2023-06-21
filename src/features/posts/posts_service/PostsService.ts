import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import PostEntity from "./PostEntity.js";
import {InjectRepository} from "@nestjs/typeorm";
import type Page from "../../../paging/Page.js";
import type PagingOptions from "../../../paging/PagingOptions.js";
import paginatedFindAndCount from "../../../paging/paginatedFindAndCount.js";
import type Post from "../posts_controller/Post.js";
import deentityifyPostEntity from "./deentityifyPostEntity.js";
import type CreatePostPayload from "./CreatePostPayload.js";
import PostsServicePostWithGivenIdNotFoundError from "./PostsServicePostWithGivenIdNotFoundError.js";
@Injectable()
export default class PostsService {
	private readonly postsRepository: Repository<PostEntity>;
	public constructor(@InjectRepository(PostEntity) postsRepository: Repository<PostEntity>) {
		this.postsRepository = postsRepository;
	}
	public async getPosts(pagingOptions: PagingOptions): Promise<Page<Post>> {
		return (await paginatedFindAndCount(this.postsRepository, pagingOptions)).map(
			deentityifyPostEntity
		);
	}
	public async getPostById(id: string): Promise<Post> {
		try {
			return deentityifyPostEntity(await this.postsRepository.findOneByOrFail({id}));
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new PostsServicePostWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
	public async createPost(createPostPayload: CreatePostPayload): Promise<Post> {
		return deentityifyPostEntity(await this.postsRepository.save(createPostPayload));
	}

	public async deletePostById(id: string): Promise<boolean> {
		try {
			await this.postsRepository.delete({id});
			return true;
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new PostsServicePostWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
}
