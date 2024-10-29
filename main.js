// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const tapRevealBox = document.querySelector('.tap-reveal-box'); // Reference to the tap-to-reveal box

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
tapRevealBox.addEventListener("click", revealContent); // Add event listener for the tap-to-reveal box

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;
let isAnimating = false; // Flag to prevent rapid clicks

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation && !isAnimating) {
        isAnimating = true; // Prevent further clicks during animation
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 3;  // Ensure it's on top immediately
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;  // Ensure it's on top
                paper1.style.zIndex = 1;   // Lower the previous page
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 2;  // Bring this one on top
                paper2.style.zIndex = 1;   // Lower the previous page
                closeBook(false);
                tapRevealBox.classList.add('visible'); // Show the tap-to-reveal box when on the last page
                break;
            default:
                throw new Error("unknown state");
        }
        
        currentLocation++;

        // Delay to allow animation to complete before allowing the next action
        setTimeout(() => {
            isAnimating = false; // Allow further clicks after a short delay
        }, 500); // Adjust this duration based on the animation duration
    }
}

function goPrevPage() {
    if (currentLocation > 1 && !isAnimating) {
        isAnimating = true; // Prevent further clicks during animation
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3; // Bring back the first paper on top
                tapRevealBox.classList.remove('visible'); // Hide the tap-to-reveal box when going back
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2; // Restore the second paper on top
                paper1.style.zIndex = 1;   // Lower the first paper
                tapRevealBox.classList.remove('visible'); // Hide the tap-to-reveal box when going back
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;  // Lower the third paper
                break;
            default:
                throw new Error("unknown state");
        }
        
        currentLocation--;

        // Delay to allow animation to complete before allowing the next action
        setTimeout(() => {
            isAnimating = false; // Allow further clicks after a short delay
        }, 500); // Adjust this duration based on the animation duration
    }
}

// Tap to Reveal Content Functionality
function revealContent() {
    const box = document.querySelector('.tap-reveal-box');
    const image = box.querySelector('.revealed-image'); // Reference to the hidden image

    // Toggle 'visible' class to control display
    image.classList.toggle('visible');

    // Update the box text based on visibility
    box.textContent = image.classList.contains('visible') ? '' : 'Tap to Reveal';
}
