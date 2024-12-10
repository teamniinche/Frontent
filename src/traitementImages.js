
// Fonction pour convertir l'image en base64
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
                                              const reader = new FileReader();
                                              reader.onload = () => resolve(reader.result);
                                              reader.onerror = error => reject(error);
                                              reader.readAsDataURL(file);
                                          });
}

// Fonction pour compresser l'image et convertir en JPEG
export const compressImage = async (base64Image,quality,wH) => {
            const image = new Image(); // initier un objet image
            image.src = base64Image;   // remplir l'objet image de l'url en parametre

            return new Promise((resolve) => {
                      image.onload = () => {
                                              const canvas = document.createElement("canvas"); //donne du cadre à l'objet image
                                              const ctx = canvas.getContext("2d"); // accès au contexte 2D du cadre

                                              let height=wH,width =wH 
                                              canvas.width = width;canvas.height = height;
                                              // remplir le contexte du cadre par l'image instanciée et remmplie par l'url en parametre
                                              ctx.drawImage(image, 0, 0, width, height);

                                              // Convertir en dataUrl(passage au src coté client) de mime image/jpeg avec une qualité de QUALITY
                                              const compressedBase64 = canvas.toDataURL("image/jpg", quality);
                                              resolve(compressedBase64);
                                              // Etape suivante: passer l'url "compressedBase64" à un htmlElement "img" en son "src";
                                            };
                      });










































                      
            };
// Fonction pour convertir l'image comprssée en file
export const dataURLtoFile = (dataURL, fileName) => {
              const arr = dataURL.split(',');
              const mime = arr[0].match(/:(.*?);/)[1]; // image/jpeg par exemple
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
          
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
          
              return new File([u8arr], fileName, { type: mime });
            }