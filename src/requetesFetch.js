import {serverUrl} from './root.js'

const hostUrl=serverUrl

export const UpdateProps=(url,state)=> {fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    })
    .then(data => {
      alert('Mise à jour réussie !')
    })
    .catch(error => {
      console.error(error);
    });}

export const Poster=(url,state)=>{
  fetch(url,
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })
      .then(response => {
        if (response.ok) {return response.json();} 
        else {alert('Erreur lors de la tentative de POSTER.');}
      })
      .then(data => {if (data && data.pseudo){
        const url_confirm_email=hostUrl+'api/membres/sendConfirmationMail'
        const {newMembreId,pseudo,codeConfirmation,email}=data
        fetch(url_confirm_email,
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pseudo:pseudo,email:email,code:codeConfirmation})
          })
          .then(response => {
            if (response.ok) {return response.json();} 
            else {alert("Erreur lors de la tentative de verification d'email." );}
          })
          .then()
        alert('Bienvenue '+ data.firstName + ' 👌🏻! Vous étes bien inscrit. Veuillez bien patienter pour la validatiion de votre inscription 🙏🏻🙏🏻🙏🏻')}
        alert('Poste bien réussi !')
      })
}

export const ObtenirDonnee=(url)=>{
  
}

