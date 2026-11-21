/* ============================================================
   SKILLDNA FRONTEND ENGINE
   ------------------------------------------------------------
   IMPORTANT:
   This is currently a FRONTEND DEMO.

   The calculations/data here are temporary.

   Later we will replace these demo functions with:
   Python Flask API
          ↓
   SQLite database
          ↓
   Real matching engine
          ↓
   AI service

   The UI itself can remain almost exactly the same.
============================================================ */


/* ============================================================
   1. PAGE NAVIGATION
============================================================ */

/*
    Every sidebar button contains:
    data-section="overview"

    We use that value to determine which section should be visible.
*/

const navItems = document.querySelectorAll(".nav-item");

const pageSections = document.querySelectorAll(".page-section");


navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const targetSection = item.dataset.section;

        navigateTo(targetSection);

    });

});


function navigateTo(sectionName) {

    /*
        Hide every section first.
    */

    pageSections.forEach((section) => {

        section.classList.remove("active-section");

    });


    /*
        Show the requested section.
    */

    const target = document.getElementById(sectionName);

    if (target) {

        target.classList.add("active-section");

    }


    /*
        Update active sidebar item.
    */

    navItems.forEach((item) => {

        item.classList.remove("active");

        if (item.dataset.section === sectionName) {

            item.classList.add("active");

        }

    });


    /*
        Scroll back to the top.
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ============================================================
   2. OPPORTUNITY MODAL
============================================================ */

const opportunityModal =
    document.getElementById("opportunityModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalScore =
    document.getElementById("modalScore");


/*
    Demo opportunity scores.

    LATER:
    These values will come from the backend matching engine.
*/

const opportunityScores = {

    "AI / ML Intern": 82,

    "Google AI / ML Intern": 82,

    "Microsoft Data Analyst": 76,

    "Amazon SDE Intern": 71,

    "Data Analyst Intern": 76,

    "Software Engineering Intern": 71

};


function openOpportunity(name) {

    /*
        Put the selected opportunity name inside the modal.
    */

    modalTitle.textContent = name;


    /*
        Find its demo score.
    */

    const score = opportunityScores[name] || 67;

    modalScore.textContent = score + "%";


    /*
        Show the modal.
    */

    opportunityModal.classList.add("show");

}


function closeModal() {

    opportunityModal.classList.remove("show");

}


/*
    Clicking outside the modal closes it.
*/

opportunityModal.addEventListener("click", (event) => {

    if (event.target === opportunityModal) {

        closeModal();

    }

});


/* ============================================================
   3. SKILL SIMULATOR
============================================================ */

/*
    Current opportunity count.

    Later this number will be calculated from the database.
*/

const CURRENT_OPPORTUNITIES = 12;


const selectedSkillElement =
    document.getElementById("selectedSkill");

const projectedCountElement =
    document.getElementById("projectedCount");

const simulationText =
    document.getElementById("simulationText");


function selectSkill(button, skillName, impact) {

    /*
        Remove selected state from all skill buttons.
    */

    document
        .querySelectorAll(".skill-choice")
        .forEach((skill) => {

            skill.classList.remove("selected");

        });


    /*
        Highlight the selected skill.
    */

    button.classList.add("selected");


    /*
        Update skill name.
    */

    selectedSkillElement.textContent = skillName;


    /*
        Calculate projected opportunities.

        This is intentionally simple for the frontend.

        Later:
        backend will calculate the actual number based on
        opportunity requirements and skill graph.
    */

    const projected =
        CURRENT_OPPORTUNITIES + impact;


    projectedCountElement.textContent =
        projected;


    /*
        Update the explanation.
    */

    simulationText.textContent =
        `${skillName} could unlock approximately ${impact} additional opportunities based on your current skill profile.`;

}


/* ============================================================
   4. AI COPILOT — DEMO MODE
============================================================ */

/*
    For now the AI assistant is a simulated frontend response.

    This is NOT pretending to be a real AI backend.

    Later:
        send message
             ↓
        Flask /api/chat
             ↓
        SkillDNA calculations
             ↓
        LLM API
             ↓
        response
*/


const aiInput =
    document.getElementById("aiInput");

const chatArea =
    document.getElementById("chatArea");


function askAI(question) {

    /*
        Put the question into the input.
    */

    aiInput.value = question;


    /*
        Send it.
    */

    sendAIMessage();

}


function sendAIMessage() {

    const message =
        aiInput.value.trim();


    /*
        Don't send empty messages.
    */

    if (!message) {

        return;

    }


    /*
        Add the user's message.
    */

    addUserMessage(message);


    /*
        Clear input.
    */

    aiInput.value = "";


    /*
        Generate a temporary demo response.

        Later this will be replaced with the actual AI service.
    */

    setTimeout(() => {

        const response =
            generateDemoAIResponse(message);

        addAIMessage(response);

    }, 500);

}


function addUserMessage(message) {

    const messageWrapper =
        document.createElement("div");


    messageWrapper.className =
        "ai-message";


    messageWrapper.style.justifyContent =
        "flex-end";


    messageWrapper.innerHTML = `

        <div class="message-bubble">

            <strong style="color:#d8b46a;">
                You
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;


    chatArea.appendChild(messageWrapper);


    scrollChatToBottom();

}


function addAIMessage(message) {

    const messageWrapper =
        document.createElement("div");


    messageWrapper.className =
        "ai-message";


    messageWrapper.innerHTML = `

        <div class="chat-avatar">
            ✦
        </div>

        <div class="message-bubble">

            <strong>
                SkillDNA Copilot
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;


    chatArea.appendChild(messageWrapper);


    scrollChatToBottom();

}


function generateDemoAIResponse(message) {

    const lower =
        message.toLowerCase();


    if (
        lower.includes("next") ||
        lower.includes("learn")
    ) {

        return `
            Your strongest next move is <strong>Pandas</strong>.
            It currently has the highest opportunity impact in your
            profile and could expand your reachable opportunities
            from <strong>12 to 26</strong>.
        `;

    }


    if (
        lower.includes("missing") ||
        lower.includes("gap")
    ) {

        return `
            Your biggest current gaps are
            <strong>Pandas</strong>,
            <strong>Machine Learning</strong> and
            <strong>DSA</strong>.
            Pandas has the highest immediate opportunity impact.
        `;

    }


    if (
        lower.includes("career") ||
        lower.includes("path")
    ) {

        return `
            Your current skill combination points toward
            <strong>Data / AI / ML</strong> and
            <strong>Software Engineering</strong> paths.
            Strengthening Pandas, ML and DSA would widen both paths.
        `;

    }


    return `
        Based on your current Skill DNA, you have a strong
        programming foundation. The biggest opportunity now is
        converting those foundations into deeper, opportunity-ready
        skills.
    `;

}


/*
    Prevent basic HTML injection when displaying user text.
*/

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function scrollChatToBottom() {

    chatArea.scrollTop =
        chatArea.scrollHeight;

}


/*
    Pressing ENTER in the AI input sends the message.
*/

aiInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendAIMessage();

    }

});


/* ============================================================
   5. OPPORTUNITY SEARCH
============================================================ */

function filterOpportunities() {

    const searchInput =
        document.getElementById("opportunitySearch");

    const search =
        searchInput.value.toLowerCase();


    const cards =
        document.querySelectorAll(".big-opportunity-card");


    cards.forEach((card) => {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ============================================================
   6. FILTER BUTTONS
============================================================ */

const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((item) => {

            item.classList.remove("active");

        });


        button.classList.add("active");

    });

});


/* ============================================================
   7. INITIALIZATION
============================================================ */

/*
    This runs when the page loads.

    We intentionally start on the Overview page.
*/

document.addEventListener("DOMContentLoaded", () => {

    navigateTo("overview");

    function openCopilot() {
    // First show the Overview page
    navigateTo("overview");

    // Then scroll down to the Copilot
    setTimeout(() => {
        const copilot = document.getElementById("copilotPanel");

        if (copilot) {
            copilot.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, 100);
}
});