// Nr indeksu: 77550

// Zmiana motywu green / red
function toggleTheme() {
    var themeLink = document.getElementById('theme-style');
    var currentTheme = themeLink.getAttribute('href');

    if (currentTheme === 'red.css') {
        themeLink.setAttribute('href', 'green.css');
    } else {
        themeLink.setAttribute('href', 'red.css');
    }
}

// Ukrywanie i pokazywanie sekcji Projekty
function toggleSection() {
    var section = document.getElementById('projekty');
    var button = document.getElementById('toggle-btn');

    if (section.style.display === 'none') {
        section.style.display = 'block';
        button.textContent = 'Ukryj Projekty';
    } else {
        section.style.display = 'none';
        button.textContent = 'Pokaż Projekty';
    }
}

// Pobieranie danych z JSON i generowanie list
fetch('data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var umiejetnosciList = document.getElementById('umiejetnosci-list');
        for (var i = 0; i < data.umiejetnosci.length; i++) {
            var li = document.createElement('li');
            li.textContent = data.umiejetnosci[i];
            umiejetnosciList.appendChild(li);
        }

        var projektyList = document.getElementById('projekty-list');
        for (var i = 0; i < data.projekty.length; i++) {
            var li = document.createElement('li');
            li.textContent = data.projekty[i];
            projektyList.appendChild(li);
        }
    });

// Notatki - localStorage
function loadNotatki() {
    var notatki = JSON.parse(localStorage.getItem('notatki') || '[]');
    var list = document.getElementById('notatki-list');
    list.innerHTML = '';
    for (var i = 0; i < notatki.length; i++) {
        var li = document.createElement('li');
        li.textContent = notatki[i];
        var btn = document.createElement('button');
        btn.textContent = 'Usuń';
        btn.onclick = (function(index) {
            return function() { removeNotatka(index); };
        })(i);
        li.appendChild(btn);
        list.appendChild(li);
    }
}

function addNotatka() {
    var input = document.getElementById('notatka-input');
    var text = input.value.trim();
    if (text === '') return;

    var notatki = JSON.parse(localStorage.getItem('notatki') || '[]');
    notatki.push(text);
    localStorage.setItem('notatki', JSON.stringify(notatki));
    input.value = '';
    loadNotatki();
}

function removeNotatka(index) {
    var notatki = JSON.parse(localStorage.getItem('notatki') || '[]');
    notatki.splice(index, 1);
    localStorage.setItem('notatki', JSON.stringify(notatki));
    loadNotatki();
}

// Wczytanie notatek przy starcie strony
loadNotatki();

// Walidacja formularza
function validateForm() {
    var imie = document.getElementById('imie');
    var nazwisko = document.getElementById('nazwisko');
    var email = document.getElementById('email');
    var wiadomosc = document.getElementById('wiadomosc');

    var imieError = document.getElementById('imie-error');
    var nazwiskoError = document.getElementById('nazwisko-error');
    var emailError = document.getElementById('email-error');
    var wiadomoscError = document.getElementById('wiadomosc-error');
    var successMsg = document.getElementById('success-msg');

    // reset
    imieError.textContent = '';
    nazwiskoError.textContent = '';
    emailError.textContent = '';
    wiadomoscError.textContent = '';
    successMsg.textContent = '';
    imie.classList.remove('error');
    nazwisko.classList.remove('error');
    email.classList.remove('error');
    wiadomosc.classList.remove('error');

    var valid = true;
    var hasDigit = /\d/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Imie
    if (imie.value.trim() === '') {
        imieError.textContent = 'Pole imię jest wymagane.';
        imie.classList.add('error');
        valid = false;
    } else if (hasDigit.test(imie.value)) {
        imieError.textContent = 'Imię nie może zawierać cyfr.';
        imie.classList.add('error');
        valid = false;
    }

    // Nazwisko
    if (nazwisko.value.trim() === '') {
        nazwiskoError.textContent = 'Pole nazwisko jest wymagane.';
        nazwisko.classList.add('error');
        valid = false;
    } else if (hasDigit.test(nazwisko.value)) {
        nazwiskoError.textContent = 'Nazwisko nie może zawierać cyfr.';
        nazwisko.classList.add('error');
        valid = false;
    }

    // Email
    if (email.value.trim() === '') {
        emailError.textContent = 'Pole e-mail jest wymagane.';
        email.classList.add('error');
        valid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Podaj poprawny adres e-mail.';
        email.classList.add('error');
        valid = false;
    }

    // Wiadomosc
    if (wiadomosc.value.trim() === '') {
        wiadomoscError.textContent = 'Pole wiadomość jest wymagane.';
        wiadomosc.classList.add('error');
        valid = false;
    }

    if (valid) {
        successMsg.textContent = 'Formularz został wysłany pomyślnie!';
        document.getElementById('contact-form').reset();
    }

    return false;
}
