// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

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
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2; // Restore the second paper on top
                paper1.style.zIndex = 1;   // Lower the first paper
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
