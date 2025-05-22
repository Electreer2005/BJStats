// Configura Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyD...TU_API_KEY_REAL",
    authDomain: "bocajuniorsstats-12345.firebaseapp.com",
    projectId: "bocajuniorsstats-12345",
    storageBucket: "bocajuniorsstats-12345.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcd1234efgh5678"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar comentario
function postComment() {
    const commentText = document.getElementById('comment-text').value;
    db.collection("comments").add({
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: "Anónimo"
    }).then(() => {
        alert("¡Comentario publicado!");
        loadComments();
    });
}

// Cargar comentarios
function loadComments() {
    db.collection("comments")
        .orderBy("timestamp", "desc")
        .limit(10)
        .onSnapshot((snapshot) => {
            let commentsHTML = "";
            snapshot.forEach(doc => {
                commentsHTML += `<div class="comment">
                    <p><strong>${doc.data().user}:</strong> ${doc.data().text}</p>
                </div>`;
            });
            document.getElementById('comments-container').innerHTML = commentsHTML;
        });
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', loadComments);
