document.addEventListener("yt-navigate-finish", function(event) {
 // Main callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        let skipButton = document.getElementsByClassName("ytp-ad-skip-button-container")[0];
        let previewSlot = document.getElementsByClassName("ytp-ad-preview-slot")[0];
        let skipSlot = document.getElementsByClassName("ytp-ad-skip-button-slot")[0];
        let overlayCloseBtn = document.getElementsByClassName("ytp-ad-overlay-close-button")[0];

        // if there's a video ad, skip it. 
        if(skipSlot){
        previewSlot.style.display = "none"
        skipSlot.style.display = "inherit"
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