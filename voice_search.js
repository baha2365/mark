// Check for browser compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Continuous recognition
    recognition.interimResults = true; // Show interim results
    recognition.lang = 'en-US'; // Set language

    const outputDiv = document.getElementById('search_input');
    const startButton = document.getElementById('startSpeakButton');
    let microIcon = document.createElement('i');
    let stopIcon = document.createElement('i');
    microIcon.classList.add("fa-solid", "fa-microphone");
    stopIcon.classList.add("fa-solid", "fa-stop");

    // microIcon.style.color = "blue";
    // stopIcon.style.color = "red";

    startButton.appendChild(microIcon);



    let isRecording = false;

    startButton.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
            isRecording = true;
            startButton.removeChild(microIcon);
            startButton.appendChild(stopIcon);
            console.log('Voice recognition started...');
        } else {
            recognition.stop();
            isRecording = false;
            startButton.removeChild(stopIcon);
            startButton.appendChild(microIcon);
        }
    });

    recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
        } else {
            transcript += event.results[i][0].transcript;
        }
    }
    
    outputDiv.value = transcript.toLowerCase().trim();
};


    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function() {
        isRecording = false;
        startButton.appendChild(microIcon);
        startButton.appendChild(stopIcon);
        startButton.removeChild(stopIcon);
        console.log('Speech recognition ended.');
    };

} else {
    console.warn('Web Speech API not supported in this browser.');
}
