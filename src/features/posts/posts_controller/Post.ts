export default class Post {
	public readonly id!: string;
	public readonly contentMd!: string;
	public readonly authorId!: string;
	public readonly title!: string;
	public readonly imageUrl!: string;
	public readonly type!: "news" | "tips";
}
