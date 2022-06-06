"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart()
  // putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// function addStory(evt) {
//   console.debug("navAddStory", evt);
//   hidePageComponents();
//   $newStoryForm.show();
// }

/** Show new story form on click on "submit" */

function navNewStoryClick() {
  hidePageComponents();
  $newStoryForm.show();
}

$navNewStory.on("click", navNewStoryClick);

/** Show favorites on click on "favorites" */

function navFavoritesClick() {
  console.log("navFavorites clicked");
  // location.reload()
  hidePageComponents();
  getAndShowFavorites()
  // $fav.show();
}

$navFavorites.on("click", navFavoritesClick);

function navOwnStoriesClick() {
  console.log("navOwnStories clicked");
  hidePageComponents();
  getAndShowOwnStories()
  // $fav.show();
}

$navOwnStories.on("click", navOwnStoriesClick);