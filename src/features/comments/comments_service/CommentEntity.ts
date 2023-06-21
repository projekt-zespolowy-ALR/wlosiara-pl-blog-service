import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	type Relation,
	JoinColumn,
} from "typeorm";
import PostEntity from "../../posts/posts_service/PostEntity.js";

@Entity({name: "comments"})
export class CommentEntity {
	@PrimaryGeneratedColumn("uuid")
	public id!: string;

	@Column({name: "author_id"})
	public authorId!: string;

	@Column({name: "post_id"})
	public postId!: string;

	@Column({name: "text"})
	public text!: string;

	@ManyToOne(() => PostEntity, (post) => post.comments)
	@JoinColumn({name: "post_id", referencedColumnName: "id"})
	public post!: Relation<PostEntity>;
}
