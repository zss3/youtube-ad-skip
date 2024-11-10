document.addEventListener("yt-navigate-finish", function(event) {
 // Main callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        let skipButton = document.getElementsByClassName("ytp-skip-ad-button")[0];
        let previewSlot = document.getElementsByClassName("ytp-preview-ad")[0];
        let skipSlot = document.getElementsByClassName("ytp-skip-ad")[0];
        let overlayCloseBtn = document.getElementsByClassName("ytp-ad-overlay-close-button")[0];

        // if there's a video ad, skip it. 
        if(skipSlot && skipButton){
            // An additional attempt to skip an ad using a different approach. 
            // YT is changing their design which can impact the ability to automate the clicking of the skip button.
            const video = document.getElementsByClassName("video-stream html5-main-video")[0];
            video.currentTime = video.duration;
            console.log("Fast-Forwarding to end of ad.");

            previewSlot.style.display = "none"
            skipButton.style.display = "block"
            skipSlot.click();
            skipButton.click();
            console.log("Ad skipped.")
        }

        // if there's an overlay ad, close it.
        if(overlayCloseBtn){
            overlayCloseBtn.click()
            console.log("Overlay ad closed.")
        }
    };

    // Create an observer instance linked to the callback function
    const adObserver = new MutationObserver(callback);
    const config = {attributes: false, subtree: true, childList: true};

    // video pages always have a ytp-ad-module. 
    let targetNode = document.getElementsByClassName("ytp-ad-module")[0];
    
    // Start observing the target node for configured mutations
    if(targetNode){
        adObserver.observe(targetNode, config);
    } 
})