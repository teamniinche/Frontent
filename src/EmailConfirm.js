// import formData from 'form-data';
// import Mailgun from 'mailgun.js';

// // elastic mail API Key for ndour-smtp-api 486E59DBAE479FDA6F84777183BB8DDAC3BFD42A9321221DD2EEFC18B8736882F53CF42F405759415104F50C43B33A27

// const API_KEY = 'pubkey-ad0e08dae9e303a8c9198f96405efcc7';
// const DOMAIN = 'sandboxbb03b2ce39514e878056e02e8e8e37ea.mailgun.org';

// const mailgun = new Mailgun(formData);
// const client = mailgun.client({username: 'api', key: API_KEY});

// export default function EmailConfirm(email,code) {


// const messageData = {
//   from: 'ndourm9@gmail.com',
//   to: email,
//   subject: "Validation d'Email de teamniintcheft.onrender.com",
//   text: 'Code de validation : '+ code
// };

// client.messages.create(DOMAIN, messageData)
//  .then((res) => {
//    console.log(res);
//  })
//  .catch((err) => {
//    console.error(err);
//  })};

 var ElasticEmail = require('@elasticemail/elasticemail-client');
 
var defaultClient = ElasticEmail.ApiClient.instance;
// Configure API key authorization: apikey
var apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apikey.apiKeyPrefix['X-ElasticEmail-ApiKey'] = "Token"
 
var api = new ElasticEmail.CampaignsApi()
var name = "name_example"; // {String} Name of Campaign to delete
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
api.campaignsByNameDelete(name, callback);

//nodemailer
const nodemailer = require('nodemailer');

// Créez un objet transporteur pour Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votreadresse@gmail.com',
    pass: 'votremotdepasse',
  },
});

// Configuration de l'e-mail à envoyer
const mailOptions = {
  from: 'votreadresse@gmail.com',
  to: 'destinataire@example.com',
  subject: 'Sujet de l\'e-mail',
  text: 'Contenu de l\'e-mail',
};

// Envoyer l'e-mail
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('Erreur : ' + error);
  } else {
    console.log('E-mail envoyé : ' + info.response);
  }
});


// twillio
const accountSid = 'votreAccountSid';
const authToken = 'votreAuthToken';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Ceci est un exemple de SMS envoyé depuis Node.js',
    from: 'votreNuméroTwilio',
    to: 'numéroDestinataire',
  })
  .then(message => console.log(message.sid))
  .catch(error => console.log('Erreur : ' + error));

  fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({a: 7, str: 'Some string: &=&'})
}).then(res => res.json())
  .then(res => console.log(res));

  (async () => {
    const rawResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const content = await rawResponse.json();
  
    console.log(content);
  })();

  function getRandomForEmailConfirm(min, max) {
    return Math.random() * (max - min) + min;
  }
  
// nous.js useEffect()
const dispatch=useDispatch()
useEffect(() => {
  document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
  fetch(hostUrl+'api/membres/allmembres')
    .then(response => response.json())
    .then(membres => {const unblockedMembres=membres.filter(membre=>membre.statu==="v")
                      dispatch(setMembres({all:membres,newMembres:[],blockedMembres:[]}))
                      setMembres(unblockedMembres)
                    })
    .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
}, [dispatch]);
if (error) {return <Error error={error}/>}
const  InputChange=(val)=>{
  const membres=useSelector((state)=>state.userNewCh.membres.all)
  if (val===""){
    // fetch(hostUrl+'api/membres/allmembres')
    // .then(response => response.json())
    // .then(membres => {
      const unblockedMembres=membres.filter(membre=>membre.statu==="v")
      setMembres(unblockedMembres)
    // .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
    // if (error) {return <Error error={error}/>}
  }else{
    // fetch(hostUrl+'api/membres/allmembres/'+val)
    // .then(response => response.json())
    // .then(membres => {
      const unblockedMembres=membres.filter(membre=>membre.statu==="v")
      const checkedMembres=unblockedMembres.filter(membre=>membre.firstName+membre.lastName+membre.pseudo+membre.departementDOrigine.toUpperCase().includes(val.toUpperCase()))
      setMembres(checkedMembres)
    // })
    // .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
    // if (error) {return <Error error={error}/>}
  }
  }