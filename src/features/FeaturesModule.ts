import {Module} from "@nestjs/common";
import PostsModule from "./posts/posts_module/PostsModule.js";

@Module({
	imports: [PostsModule],
	controllers: [],
	providers: [],
})
class FeaturesModule {
	public constructor() {}
}

export default FeaturesModule;
