const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const aiTools = data.data.tools;
    showAiTools(aiTools); 
}

const showAiTools = (aiTools) => {
    const aiToolsContainer = document.getElementById('ai-tools-container');
    aiTools.forEach(tool => {
        const aiCard = document.createElement('div');
        aiCard.classList.add('card', 'card-compact', 'w-96', 'bg-base-100')
        aiCard.innerHTML = `
            <figure>
              <img
                src="${tool.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `; 
        aiToolsContainer.appendChild(aiCard)
    })
}
loadData()