window.onload = function(){

let chatBox = document.getElementById("chatBox");

document.getElementById("userInput").addEventListener("keydown",function(event){

if(event.key === "Enter"){
event.preventDefault();
sendMessage();
}

});

}

/* load old chat */

let history = localStorage.getItem("chatHistory");

if(history){
chatBox.innerHTML = history;
}
else{
chatBox.innerHTML =
"<div class='message bot'><img src='https://cdn-icons-png.flaticon.com/512/4712/4712035.png'><div class='text'>Hello 👋 I'm your Health Assistant. Ask me about fever, cold, headache or cough.</div></div>";
}


/* send message */

function sendMessage(){

let message = document.getElementById("userInput").value;

if(message.trim()===""){
return;
}

let chatBox = document.getElementById("chatBox");
let time = new Date().toLocaleTimeString();

chatBox.innerHTML +=
"<div class='message user'><div class='text'>"+message+"<br><small>"+time+"</small></div></div>";


chatBox.innerHTML +=
"<div id='typing' class='message bot'><div class='text'>...</div></div>";

chatBox.scrollTop = chatBox.scrollHeight;

/* send to django backend */

fetch("/chat/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({message:message})

})

.then(response => response.json())

.then(data =>{

/* remove typing message */

let typing = document.getElementById("typing");
if(typing){
typing.remove();
}

/* show bot reply */
let time = new Date().toLocaleTimeString();
chatBox.innerHTML +=
"<div class='message bot'><img src='https://cdn-icons-png.flaticon.com/512/4712/4712035.png'><div class='text'>"+data.reply+"<br><small>"+time+"</small></div></div>";

chatBox.scrollTop = chatBox.scrollHeight;

/* save chat history */

localStorage.setItem("chatHistory",chatBox.innerHTML);

})

.catch(error =>{

let typing = document.getElementById("typing");
if(typing){
typing.remove();
}

chatBox.innerHTML +=
"<div class='message bot'><div class='text'>Error connecting to server.</div></div>";

});

/* clear input */

document.getElementById("userInput").value="";

}


/* quick buttons */

function quickQuestion(symptom){

document.getElementById("userInput").value = symptom;

sendMessage();

}


/* clear chat */

function clearChat(){

document.getElementById("chatBox").innerHTML = "";

localStorage.removeItem("chatHistory");

}

function downloadChat() {

    let chat = document.getElementById("chatBox").innerText;
    let blob = new Blob([chat], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_report.txt";
    link.click();
}

const symptoms = [
"fever",
"cold",
"headache",
"cough",
"stomach pain",
"sore throat",
"dizziness",
"vomiting",
"body pain",
"fatigue"
];

function showSuggestions(){

let input = document.getElementById("userInput").value.toLowerCase();

let suggestionBox = document.getElementById("suggestions");

suggestionBox.innerHTML = "";

if(input.length === 0){
return;
}

let matches = symptoms.filter(symptom => symptom.includes(input));

matches.forEach(item => {

let div = document.createElement("div");

div.innerText = item;

div.onclick = function(){
document.getElementById("userInput").value = item;
suggestionBox.innerHTML = "";
};

suggestionBox.appendChild(div);

});

}

function startVoice(){

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-US";

recognition.start();

recognition.onresult = function(event){

let voiceText = event.results[0][0].transcript;

document.getElementById("userInput").value = voiceText;

};

}

function handleEnter(event){

if(event.key === "Enter"){
event.preventDefault();
sendMessage();
}
}

function autoGrow(element) {
element.style.height = "auto";
element.style.height = (element.scrollHeight) + "px";
}