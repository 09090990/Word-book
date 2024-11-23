const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();  
    getWordInfo(form.elements[0].value);
});

const getWordInfo =  async (word)=>{
    try{


    
   
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
    <h2><strong>Word:</strong>${data[0].word}</h2>
    <p class="partofSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    <p><strong>Example:</strong>${definitions.definition === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms:</strong></p>`;

    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
        for(let i=0; i,definitions.antonyms.length; i++){
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
}

resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    }
catch (error){
    resultDiv.innerHTML = `<p>Sorry, the word could not be found</p> `;

}  
    




}