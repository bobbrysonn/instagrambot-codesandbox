import { CommentPost } from "src/common/interfaces";
import { logger } from "src/common/utils";

const commentPost: CommentPost = async function commentPost(
  page,
  post,
  message
) {
  await page.click(post.commentButtonSelector);
  logger("Successfully clicked the comment button");
  await page.waitForSelector(post.commentSelector);
  await page.type(post.commentSelector, message, { delay: 200 });
  logger("Successfully typed in comment");
  await page.keyboard.press("Enter");
  logger("Successfully commented");
  await page.waitFor(2500);

  return page;
};

export { commentPost };
