"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

async function getAndShowFavorites() {
  storyList = await StoryList.getFavorites();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

async function getAndShowOwnStories() {
  storyList = await StoryList.getOwnStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let favCheck = "";
  if (currentUser.favorites.indexOf(story.storyId) !== -1) {
    favCheck = "checked";
  }
  return $(`
      <li id="${story.storyId}">
      <input type="checkbox" id="favorite-checkbox" ${favCheck}>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function newStorySubmit(evt){
  evt.preventDefault();

  console.log("new story submitted");

  const storyTitle = $("#article-title").val();
  const storyAuthor = $("#article-author").val();
  const storyURL = $("#article-url").val();
  const storyObj = {title: storyTitle, author: storyAuthor, url: storyURL}
  console.log("storyObj: ", storyObj);

  await storyList.addStory(currentUser, storyObj);

  hidePageComponents();
  getAndShowStoriesOnStart()
}

$newStoryButton.on("click", newStorySubmit);

async function addFavoriteStory(evt){
  const favStoryId =  evt.target.parentElement.id;
  // const targetStory = evt.target;
  // let hasFavClass = targetStory.classList.contains("fav-yes");

  // console.log("hasFavClass (before if): ", hasFavClass);

  // if(hasFavClass === true) {
  //   console.log("true, if statment ran");
  //   targetStory.classList.remove("fav-yes");
  //   targetStory.classList.add("fav-no");
  // } else {
  //   console.log("not true, else statement ran");
  //   targetStory.classList.remove("fav-no");
  //   targetStory.classList.add("fav-yes");
  // }
  // hasFavClass = targetStory.classList.contains("fav-yes");
  // console.log("hasFavClass (after if): ", hasFavClass);

  await currentUser.addFavorite(favStoryId);
  // getAndShowFavorites()
}
$body.on("click", "#favorite-checkbox", addFavoriteStory);