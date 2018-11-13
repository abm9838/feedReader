/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * also URL is not empty.
         */
         it("urls are defined",function () {
           allFeeds.forEach(feed =>{
             expect(feed.url).toBeDefined();
             expect(feed.url.length).toBeGreaterThan(0);
           });
         });


        /* has a name defined & name is not empty. */
         it("names are defined",function () {
           allFeeds.forEach(feed =>{
             expect(feed.name).toBeDefined();
             expect(feed.name.length).toBeGreaterThan(0);
           });
         });
    });


    /* A new test suite named "The menu" */
    describe("The Menu",function () {
      /* Ensure that the menu element is hidden by default. Analyze the HTML and
       */
       it("menu element is hidden bny default",function () {
         expect($("body").hasClass("menu-hidden")).toEqual(true);
       });
       /* Menu changes visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it("menu on click changes visibility(toggles)",function () {
          $(".menu-icon-link").trigger("click");
          expect($("body").hasClass("menu-hidden")).toEqual(false);
          $(".menu-icon-link").trigger("click");
          expect($("body").hasClass("menu-hidden")).toEqual(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe("Initial Entries",function () {
      beforeEach(function (done) {
        $(".feed").empty();
        loadFeed(0,function () {
          done();
        });
      });
        /* LoadFeed function is called and completes its work, there is at least
         * a single entry element within the feed container.
        */
         it("there is atleast one entry",function () {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });
    /* A new test suite named "New Feed Selection" */
    describe("New Feed Selection",function () {
      beforeEach(function (done) {
        loadFeed(0,function () {
          oldFeed=$('.feed').html(); //older feed
          loadFeed(1,function () {
            newFeed=$('.feed').html(); //newer feed
            done();
          });
        });
      });
      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       it("new feed is loaded",function () {
         expect(newFeed).not.toBe(oldFeed);
       });
    });
}());
