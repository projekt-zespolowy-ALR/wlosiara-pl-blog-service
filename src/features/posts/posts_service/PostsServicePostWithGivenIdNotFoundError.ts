export default class PostsServicePostWithGivenIdNotFoundError extends Error {
	public readonly postId: string;

	public constructor(postId: string) {
		super(`Post with id ${postId} not found`);
		this.postId = postId;
	}
}
