import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "../comments_service/CommentEntity.js";
import {CommentsService} from "../comments_service/CommentsService.js";
import {CommentsController} from "../comments_controller/CommentsController.js";

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity])],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export default class CommentsModule {
	public constructor() {}
}
