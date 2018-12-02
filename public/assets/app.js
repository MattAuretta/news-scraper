$('.carousel').carousel({
  interval: 2500
})

$(".save-btn").click(function () {
  // Save the id from the button
  var thisId = $(this).attr("data-id");
  console.log(this)

  // Make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
})