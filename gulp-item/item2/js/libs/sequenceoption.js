$(document).ready(function(){
    var options = {
        nextButton: true,
        prevButton: true,
        pagination: true,
        animateStartingFrameIn: true,
        autoPlay: true,
        autoPlayDelay: 3000,
        preloader: true,
        preloadTheseFrames: [1],
        preloadTheseImages: [
            "images/tn-phone1.png",
            "images/tn-phone2.png",
            "images/tn-phone3.png"
        ]
    };
    
    var mySequence = $("#sequence").sequence(options).data("sequence");
});