import {Module} from "@nestjs/common";
import PostsController from "../posts_controller/PostsController.js";
import PostsService from "../posts_service/PostsService.js";
import postEntity from "../posts_service/PostEntity.js";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([postEntity])],
	controllers: [PostsController],
	providers: [PostsService],
})
export default class PostsModule {
	public constructor() {}
}
