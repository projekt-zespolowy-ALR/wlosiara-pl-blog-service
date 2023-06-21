import {Module} from "@nestjs/common";
import PostsModule from "./posts/posts_module/PostsModule.js";
import CommentsModule from "./comments/comments_module/CommentsModule.js";

@Module({
	imports: [PostsModule, CommentsModule],
	controllers: [],
	providers: [],
})
class FeaturesModule {
	public constructor() {}
}

export default FeaturesModule;
