$('.carousel').carousel({
  interval: 2500
});

$(".save-btn").click(function () {
  // Save the id from the button
  var thisId = $(this).attr("data-id");

  // Make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  });
});

// When you click the savenote button
$(".comment-btn").click(function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId)
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function (data) {
    console.log(data);
    $("#comments-section").empty();
    for (var i = 0; i < data.comment.length; i++) {
      $("#comments-section").append("<p>" + data.comment[i].body + "</p>");
    }
    // Append save comment button with article's ID saved as data-id attribute
    $("#save-comment").html("<button class='btn btn-primary' data-id='" + data._id + "' data-dismiss=modal>Save Comment</button>");
  });
  $("#comment-modal").modal("show");
});

// When you click the save comment button
$("#save-comment").click(function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).children().attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from comment textarea
        body: $("#comment-input").val()
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#comment-input").val("");
});