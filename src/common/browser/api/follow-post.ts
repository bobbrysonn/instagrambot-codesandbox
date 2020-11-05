import { FollowPost } from "src/common/interfaces";
import { logger } from "src/common/utils";

const followPost: FollowPost = async function followPost(page, post) {
  if (post.isFollowed) {
    return page;
  }

  await page.click(post.followSelector);
  logger("Followed post");
  await page.waitFor(1500);
  await page.waitForSelector(post.unfollowSelector);
  return page;
};

export { followPost };
