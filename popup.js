document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchButton').addEventListener('click', function() {
        const word = document.getElementById('wordInput').value.trim();
        if (word !== '') {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.json())
                .then(data => {
                    const resultsContainer = document.getElementById('results');
                    resultsContainer.innerHTML = '';

                    data.forEach(entry => {
                        const entryDiv = document.createElement('div');
                        entryDiv.classList.add('entry');

                        // Word and Phonetic
                        entryDiv.innerHTML += `<h2>${entry.word}</h2>`;
                        if (entry.phonetics && entry.phonetics.length > 0) {
                            entryDiv.innerHTML += `<p>Phonetic: ${entry.phonetics[0].text}</p>`;
                        }

                        // Meanings
                        entry.meanings.forEach(meaning => {
                            entryDiv.innerHTML += `<div class="part-of-speech">${meaning.partOfSpeech}</div>`;
                            meaning.definitions.forEach(definition => {
                                entryDiv.innerHTML += `<div class="definition">
                                    <p><strong>Definition:</strong> ${definition.definition}</p>
                                    <p><strong>Example:</strong> ${definition.example}</p>
                                </div>`;
                            });
                        });

            

                        resultsContainer.appendChild(entryDiv);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
                });
        }
    });
});
