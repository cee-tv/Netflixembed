const playerInstance = jwplayer("player").setup({
  controls: true,
  sharing: true,
  displaytitle: true,
  displaydescription: true,
  abouttext: "Join Telegram ⭐",
  aboutlink: "https://t.me/kannad_OTTPLAY",

  skin: {
    name: "netflix"
  },

  logo: {
    file:
      "https://img1.imageride.net/images/2024/04/14/1bf1277d-a940-473f-ae65-f0cbbf9c33a7_OTTplay_horizontal_logo.png",
    link: ""
  },

  captions: {
    color: "#FFF",
    fontSize: 14,
    backgroundOpacity: 0,
    edgeStyle: "raised"
  },

  playlist: [
    {
      title: "",
      description: "",
      image: "",
      sources: [
        {
          file:
            "https://m3u8.justchill.workers.dev/?url=https%3A%2F%2Fs06.nfmirrorcdn.top%2Ffiles%2F81697002%2F480p%2F-480p.m3u8&referer=https://iosmirror.cc&origin=https://iosmirror.cc",
          label: "1080p",
          default: true
        },
        {
          file:
            "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.720p.vp9.webm",
          label: "720p"
        },
        {
          file:
            "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.480p.vp9.webm",
          label: "480p"
        },
        {
          file:
            "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.360p.vp9.webm",
          label: "360p"
        },
        {
          file:
            "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.240p.vp9.webm",
          label: "240p"
        },
        {
          file:
            "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm/Sprite_Fright_-_Open_Movie_by_Blender_Studio.webm.160p.webm",
          label: "160p"
        }
      ],
      captions: [
        {
          file:
            "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BBengali%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "English",
          kind: "captions"
        },
        {},
        {},
        {}
      ],
      tracks: [
        {
          file: "https://cdn.jwplayer.com/strips/iYfADWO1-120.vtt",
          kind: "thumbnails"
        }
      ]
    }
  ],
  advertising: {
    client: "vast",
    schedule: [
      {
        offset: "pre",
        tag:
          "https://www.videosprofitnetwork.com/watch.xml?key=d904b92c1f6cc769c59d030320a66f69"
      }
    ]
  }
});

playerInstance.on("ready", function () {
  const buttonId = "";
  const iconPath = "";
  const tooltipText = "Download Video";

  // Call the player's `addButton` API method to add the custom button
  playerInstance.addButton(iconPath, tooltipText, buttonClickAction, buttonId);

  // This function is executed when the button is clicked
  function buttonClickAction() {
    const playlistItem = playerInstance.getPlaylistItem();
    const anchor = document.createElement("a");
    const fileUrl = playlistItem.file;
    anchor.setAttribute("href");
    const downloadName = playlistItem.file.split("/").pop();
    anchor.setAttribute("download", downloadName);
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // Move the timeslider in-line with other controls
  const playerContainer = playerInstance.getContainer();
  const buttonContainer = playerContainer.querySelector(".jw-button-container");
  const spacer = buttonContainer.querySelector(".jw-spacer");
  const timeSlider = playerContainer.querySelector(".jw-slider-time");
  buttonContainer.replaceChild(timeSlider, spacer);

  // Detect adblock
  playerInstance.on("adBlock", () => {
    const modal = document.querySelector("div.modal");
    modal.style.display = "flex";

    document
      .getElementById("close")
      .addEventListener("click", () => location.reload());
  });

  // Forward 10 seconds
  const rewindContainer = playerContainer.querySelector(
    ".jw-display-icon-rewind"
  );
  const forwardContainer = rewindContainer.cloneNode(true);
  const forwardDisplayButton = forwardContainer.querySelector(
    ".jw-icon-rewind"
  );
  forwardDisplayButton.style.transform = "scaleX(-1)";
  forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
  const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
  nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

  // control bar icon
  playerContainer.querySelector(".jw-display-icon-next").style.display = "none"; // hide next button
  const rewindControlBarButton = buttonContainer.querySelector(
    ".jw-icon-rewind"
  );
  const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
  forwardControlBarButton.style.transform = "scaleX(-1)";
  forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
  rewindControlBarButton.parentNode.insertBefore(
    forwardControlBarButton,
    rewindControlBarButton.nextElementSibling
  );

  // add onclick handlers
  [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
    button.onclick = () => {
      playerInstance.seek(playerInstance.getPosition() + 20);
    };
  });
});
