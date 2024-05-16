function replaceThumbnails() {
  if (chrome.runtime.lastError) {
      console.error('Runtime error:', chrome.runtime.lastError);
      return; // Exit if there is a runtime error
  }

  chrome.storage.local.get('isEnabled', (data) => {
      if (chrome.runtime.lastError) {
          console.error('Storage error:', chrome.runtime.lastError);
          return; // Handle storage errors gracefully
      }

      if (data.isEnabled !== false) {
          const thumbnails = document.querySelectorAll('img#img, img[src*="ytimg.com"]');
          thumbnails.forEach((img) => {
              const src = img.src;
              const matches = src.match(/\/vi\/([a-zA-Z0-9_-]{11})\//);
              if (matches) {
                  const videoId = matches[1];
                  const randomNumber = Math.floor(Math.random() * 3) + 1;
                  img.src=" "
                  img.src = `https://img.youtube.com/vi/${videoId}/maxres${randomNumber}.jpg`;
                  // img.src = `https://dearrow-thumb.ajay.app/api/v1/getThumbnail?videoID=${videoId}`;
              }
          });
      }
  });
}

document.addEventListener('DOMContentLoaded', replaceThumbnails);
window.addEventListener('scroll', replaceThumbnails);
let observer = new MutationObserver(mutations => {
  replaceThumbnails();
});
observer.observe(document.body, { childList: true, subtree: true });

