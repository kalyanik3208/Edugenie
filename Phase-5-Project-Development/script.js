async function askQuestion() {
    const questionInput = document.getElementById("question");
    const chatBox = document.getElementById("chatBox");

    const question = questionInput.value.trim();

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    // Show user's question
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerHTML = "<strong>You:</strong> " + question;
    chatBox.appendChild(userMessage);

    questionInput.value = "";

    // Show loading message
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "ai-message";
    loadingMessage.innerHTML = "<strong>Edugenie:</strong> Thinking...";
    chatBox.appendChild(loadingMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        loadingMessage.innerHTML =
            "<strong>Edugenie:</strong><br>" + data.answer;

    } catch (error) {
        loadingMessage.innerHTML =
            "<strong>Edugenie:</strong> Something went wrong. Please try again.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}


function clearChat() {
    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML = `
        <div class="welcome">
            <h2>Welcome to Edugenie 👋</h2>
            <p>
                Ask any educational question and
                Edugenie will help you understand it.
            </p>
        </div>
    `;
}