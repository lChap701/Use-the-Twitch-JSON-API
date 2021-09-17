// URL of the API
const URL = "https://twitch-proxy.freecodecamp.rocks";

// Twitch Users
const USERS = [
  "cretetion",
  "OgamingSC2",
  "ESL_SC2",
  "RobotCaleb",
  "habathcx",
  "noobs2ninjas",
  "storbeck",
  "freecodecamp",
];

(function () {
  // Adds parameters to the API URL
  USERS.forEach((u) => {
    // Creates a row
    const row = document.createElement("a");
    row.className = "row";
    row.id = u;

    // Adds a parameter to the API URL
    let url = URL + "/twitch-api/channels/" + u;

    // Gets channel JSON data using the API URL
    $.getJSON(url, function (channels) {
      // Adds another parameter to the API URL
      url = URL + "/twitch-api/streams/" + u;

      // Updates the row
      row.href = channels.url;
      row.target = "_blank";

      // Displays the logo
      const img = document.createElement("img");
      img.src = channels.logo;
      img.alt = channels.name + " avatar";
      row.append(img);

      // Displays the username
      const p = document.createElement("p");
      p.innerHTML = channels.display_name;
      row.append(p);

      // Gets stream JSON data using the API URL
      $.getJSON(url, function (streams) {
        const i = document.createElement("i");
        const span = document.createElement("span");
        span.className = "hideable";

        if (streams.stream === null) {
          // Adds a tooltip to the row
          row.title = channels.display_name + " | Offline";

          // Displays "Offline"
          i.innerHTML = "Offline";

          // Adds the row to the offline section
          $("#offline").append(row);
        } else {
          // Adds the first part of the text
          i.innerHTML = channels.game;

          // Displays the status
          span.innerHTML =
            channels.status.length > 49
              ? ": " + channels.status.substring(0, 49) + ".".repeat(3)
              : ": " + channels.status;
          i.append(span);

          // Adds a tooltip to row
          row.title =
            channels.display_name +
            " | " +
            channels.game +
            ": " +
            channels.status;

          // Adds the row to the online section
          $("#online").append(row);
        }

        // Displays the status
        row.append(i);

        // Hides loader (loading animation)
        $("#loader").hide();
      });
    });
  });
})();

// Displays or hides options
$("#icon").on("click", function optToggle() {
  const options = $("#options");

  if ($(options).css("opacity") === "1") {
    $(options).css("opacity", "0");
  } else {
    $(options).css("opacity", "1");
  }
});

// Adds active classes
$("#options div").each(function (i) {
  $(this).on("click", function activeToggle() {
    const id = $(this).attr("id");
    const online = $("[data-filter='online']");
    const offline = $("[data-filter='offline']");

    // Adds active class (if needed)
    if (!$(this).hasClass("active")) {
      $(".active").each(function (i) {
        $(this).removeClass("active");
      });

      $(this).addClass("active");
    }

    // Filters data by the id of the filter
    if (id === "all-filter") {
      if ($(online).hasClass("hide")) {
        $(online).removeClass("hide");
      }

      if ($(offline).hasClass("hide")) {
        $(offline).removeClass("hide");
      }
    } else if (id === "online-filter") {
      if (!$(offline).hasClass("hide")) {
        $(offline).addClass("hide");
      }

      if ($(online).hasClass("hide")) {
        $(online).removeClass("hide");
      }
    } else if (id === "offline-filter") {
      if (!$(online).hasClass("hide")) {
        $(online).addClass("hide");
      }

      if ($(offline).hasClass("hide")) {
        $(offline).removeClass("hide");
      }
    }
  });
});
