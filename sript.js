var album = document.querySelectorAll(".album")
var hover = document.querySelectorAll(".play-hover-button")

// album.addEventListener("mouseenter",function(){
//     hover.style.opacity = "1"
// })
// album.addEventListener("mouseleave",function(){
//     hover.style.opacity = "0"
// })






album.forEach(function(album) {
    album.addEventListener('mouseenter', function() {
      album.style.opacity = "1"
    });
  });

  hover.forEach(function(hover) {
    hover.addEventListener('mouseenter', function() {
      hover.style.opacity = "1"
    });
  });

  hover.forEach(function(hover) {
    hover.addEventListener('mouseleave', function() {
      hover.style.opacity = "0"
    });
  });





// for social-media-links-------------------------------

// var insta = document.querySelector(".instagram")
// var twit = document.querySelector(".twitter")
// var fb = document.querySelector(".facebook")

// insta.addEventListener("click",function(){
//   insta.style.textdecoration = "underline"
// })

// ============================================================
// Toast notification helper
// ============================================================
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("toast-hide");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2500);
}

// ============================================================
// Create Playlist button — opens a small modal, adds the new
// playlist to the sidebar list
// ============================================================
var createPlaylistBtn = document.querySelector("#left-playlist-button");
var playlistCounter = 0;

function openCreatePlaylistModal() {
  var overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  var modal = document.createElement("div");
  modal.className = "modal-box";
  modal.innerHTML =
    '<h3>Create your playlist</h3>' +
    '<p>Give your playlist a name.</p>' +
    '<input type="text" id="new-playlist-name" placeholder="My Playlist #' + (playlistCounter + 1) + '" maxlength="40">' +
    '<div class="modal-actions">' +
    '<button type="button" class="modal-cancel">Cancel</button>' +
    '<button type="button" class="modal-create">Create</button>' +
    "</div>";

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  var input = modal.querySelector("#new-playlist-name");
  input.focus();

  function closeModal() {
    overlay.remove();
  }

  modal.querySelector(".modal-cancel").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  function createPlaylist() {
    playlistCounter++;
    var name = input.value.trim() || "My Playlist #" + playlistCounter;
    addPlaylistToSidebar(name);
    showToast('Playlist "' + name + '" created!');
    closeModal();
  }

  modal.querySelector(".modal-create").addEventListener("click", createPlaylist);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") createPlaylist();
  });
}

function addPlaylistToSidebar(name) {
  var listContainer = document.querySelector(".user-playlists");
  if (!listContainer) {
    listContainer = document.createElement("div");
    listContainer.className = "user-playlists";
    var playlistWrapper = document.querySelector(".left-card-playlist");
    playlistWrapper.appendChild(listContainer);
  }

  var item = document.createElement("div");
  item.className = "user-playlist-item";
  item.innerHTML =
    '<div class="playlist-icon"><i class="ri-play-fill"></i></div>' +
    '<div class="playlist-info"><h6>' + escapeHtml(name) + '</h6><p>Playlist &middot; 0 songs</p></div>';
  listContainer.prepend(item);
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

if (createPlaylistBtn) {
  createPlaylistBtn.addEventListener("click", openCreatePlaylistModal);
}

// ============================================================
// Browse Podcasts button — scrolls to the playlist grid and
// gives a quick visual highlight
// ============================================================
var browsePodcastsBtn = document.querySelector("#left-playlist-button2");

if (browsePodcastsBtn) {
  browsePodcastsBtn.addEventListener("click", function () {
    var target = document.querySelector(".bigcards") || document.querySelector(".album");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("highlight-flash");
      setTimeout(function () {
        target.classList.remove("highlight-flash");
      }, 900);
    }
    showToast("Here are playlists you can browse");
  });
}
