import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "posts"})
export default class postEntity {
	@PrimaryGeneratedColumn("uuid", {name: "id"})
	public readonly id!: string;
	@Column({name: "content_md", type: "text"})
	public contentMd!: string;
	@Column({name: "author_id", type: "uuid"})
	public authorId!: string;
	@Column({name: "title", type: "text"})
	public title!: string;
	@Column({name: "image_url", type: "text"})
	public imageUrl!: string;
}
