/*
// ==== ETAPE 1.1 === Par défaut, la newsletter devrait être masquée !

// 1. Soit on ajoute la classe `newsletter--hidden` via le JS
// ===> document.querySelector(".newsletter").classList.add("newsletter--hidden");

// Soit on ajoute la classe `newsletter--hidden` via le HTML
// ===> voir le fichier HTML

// KISS = Keep it simple stupid = faire simple quand on peut faire simple !
*/

let hasNewsletterBeenClosedOnce = false; // Utiliser un "flag" : un booléen qui indique l'état du programme.

// === ETAPE 1.2 === Afficher la newsletter lors du click sur l'élément Newsletter
const newsletterLinkElement = document.querySelector("#newsletter-link"); // Selectionner le lien Newsletter
newsletterLinkElement.addEventListener("click", (event) => {  // Ecouter le click sur cet élément, en cas de click : 
  // console.log("Hello"); // REFLEXE, TESTEZ !
  event.preventDefault(); // Empêcher le comportement par défaut de l'évenement "click" sur un "<a>"
  openNewsletter();
});

// === ETAPE 1.3 === Masquer à nouveau la newsletter lors du click sur la croix
const newsletterCloseButton = document.querySelector(".newsletter__close"); // Selectionner la croix
newsletterCloseButton.addEventListener("click", closeNewsletter);

function openNewsletter() {
  const newsletterAsideElement = document.querySelector(".newsletter"); // - Selectionner le aside newsletter
  newsletterAsideElement.classList.remove("newsletter--hidden"); // - Lui retirer la classe newsletter--hidden
}

function closeNewsletter() {
  const newsletterAsideElement = document.querySelector(".newsletter"); // - Selectionner le aside newsletter
  newsletterAsideElement.classList.add("newsletter--hidden"); // Remettre la classe newsletter--hidden
  hasNewsletterBeenClosedOnce = true;
}

// === ETAPE 1.4 === Afficher la newsletter lorsque l'utilisateur scroll au dela de 300px
window.addEventListener("scroll", handleScroll);

function handleScroll() {
  if (window.scrollY >= 500 && !hasNewsletterBeenClosedOnce) { // Si l'utilisateur est a plus de 300px, on affiche la newsletter
    openNewsletter();
    // window.removeEventListener("scroll", handleScroll);
  }
}

/*
// === ETAPE 1.5 === Une fois qu'il a fermé la newsletter UNE FOIS, on ne la reouvre plus au scroll 
// Solution 1 => un flag 'hasNewsletterBeenClosedOnce'
// Solution 2 => (nouveauté) : on peut retirer un eventListener quand on a plus besoin. Voir la ligne commenté window.removeEventListener
*/

// === ETAPE 2 === Filtrer les mails "jetables"! 

const formElement = document.getElementById("newsletter-form"); // Selectionner le formulaire
formElement.addEventListener("submit", (event) => { // Ecouter le submit sur le formulaire, et en cas de submit :
  event.preventDefault(); // - On empeche le rechargement de la page
  const emailInput = document.querySelector("#subscriber-email"); // - Selectionner l'input
  const userEmail = emailInput.value; // - Lire la "value" de l'input et la stocker dans une variable

  console.log(userEmail); //   toto@yopmail.com    ||   tata@hotmail.com
  const forbiddenDomains = [ // [ "@yopmail.com", "@yopmail.fr"]
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@cool.fr.nf',
    '@jetable.fr.nf',
    '@courriel.fr.nf',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@hide.biz.st',
    '@mymail.infos.st',
  ];

  let isEmailOK = true; // On crée une variable pour stocker le message à afficher

  forbiddenDomains.forEach((forbiddenDomain) => { // On itère sur le tableau. Pour CHAQUE forbiddenDomain 
    if (userEmail.includes(forbiddenDomain)) { // Si le mail utilisateur contient un domain interdit
      isEmailOK = false; // Si c'est le cas, l'email n'est finalement pas OK
    }
  });

  const resultElement = document.querySelector("#email-result");
  
  if (isEmailOK) {
    resultElement.textContent = "Votre inscription est bien prise en compte !";
    resultElement.classList.remove("error");
    resultElement.classList.add("success");
  } else {
    resultElement.textContent = "Le domain fourni est interdit.";
    resultElement.classList.remove("success");
    resultElement.classList.add("error");
  }
});

// === ETAPE 3 === faire fonctionner le slider

const btnPrevious = document.querySelector("#previous_btn");

const btnNext = document.querySelector("#next_btn");

const img = document.querySelectorAll(".slider__img");

let imgIndex = 0;
const currentImg = img[imgIndex];
// currentImg.classList.add("slider__img--current");


btnNext.addEventListener("click", () => {
  
  if (imgIndex < img.length-1 &&  !0) {
    
    const currentImg = img[imgIndex];
    currentImg.classList.add("slider__img--current");
    imgIndex++;
    
    console.log(currentImg);
       
  } 
});


btnPrevious.addEventListener("click", () => {
    
  if (imgIndex == 0) {   
    currentImg.classList.remove("slider__img--current"); 
    console.log(currentImg);

    imgIndex = img.length-1 ;
    console.log(imgIndex);
   
  } else { 
    imgIndex --;    
    console.log(imgIndex);
    const currentImg = img[imgIndex];   
    console.log(currentImg);
    currentImg.classList.add("slider__img--current");
       
  }  

});    

function setupRatings() {
  // Selectionner TOUTES les checkbox COCHEES (seulement celle-ci)
  // Pour chaque COMMENTAIRE, si la note du commentaire ne fait partie des checkbox cochées => on le masque
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"'); // Selectionner tous les boutons (input)
  checkboxes.forEach(checkbox => { // Poser un listener sur chaque bouton
    checkbox.addEventListener("change", () => {
      // On passe au filtrage !!
  
      // Selectionner toutes les checkbox
      // Mettre dans un tableau, l'ID des checkboxs qui sont cochées
      // Créer un tableau vide (selectedStars)
      // Pour chaque checkbox
      // SI la checkbox est cochée
      // On ajoute son index (1, 2 ou 3) dans notre tableau vide
  
      const selectedStars = []; // On cherche à savoir QUEL EST L'ETAT des checkbox pour un filtrage efficace ! // On stock les checkbox-cochées
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) { // === true
          selectedStars.push(checkbox.value);
        }
      });
  
      // Objectif : obtenir ce genre de chose :     selectedStars = ["1", "3"]
  
      // const selectedStars = checkboxes
      //   .filter(checkbox => checkbox.checked)
      //   .map(checkbox => checkbox.value);
  
      const reviews = document.querySelectorAll(".review"); // Selectionner toutes les review
  
      reviews.forEach(review => { // Pour chacune des review, on regarde si on l'affiche ou pas
        console.log(review.dataset.rating); // J'ai accès à son data-rating via son dataset : https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  
        if (! selectedStars.includes(review.dataset.rating)) { // S'il n'est pas selectionner
          review.classList.add("review--hidden"); // Alors on le cache
        } else {
          review.classList.remove("review--hidden"); // On le laisse affiché
        }
      });
    });
  });
}
setupRatings();
  
// function setupThemes() {
//   const switchButton = document.getElementById("theme-switch"); // On selectionne le bouton "choix du theme"
//   switchButton.addEventListener("click", () => { // On écoute le click, et en cas de click :
//     document.body.classList.toggle("theme-dark"); // On selectionne le body // On toggle la classe `theme-dark` sur le body
//   });
    
//   setupTheme("theme-red");
//   setupTheme("theme-blue");
//   setupTheme("theme-green");
    
//   function setupTheme(theme) {
//     document.getElementById(theme).addEventListener("click", () => {
//       document.querySelector("#logo-img").setAttribute("src", `img/logo-${theme}.png`);
      
//       const isDarkThemeActive = document.body.classList.contains("theme-dark"); // On regarde si il y a la classe theme dark
        
//       document.body.className = theme; // On réécrase toutes les classes
//       if (isDarkThemeActive) {
//         document.body.classList.add("theme-dark");
//       }
//     });
//   }  
// }

// === ETAPE 4 === Ajout dans la page des favoris

// const btnFavorites = document.querySelectorAll(".btn__like");
// const cards = document.querySelectorAll("div.card__content");

// btnFavorites.forEach(btn => {
//   btn.addEventListener("click", () => {
//     cards.forEach((card) => {
//       const cardContent = document.querySelector(".card__content");
    
    
//       console.log(cardContent);  
      
//     });
//     console.log("go");
//   });});




