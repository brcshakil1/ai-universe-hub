const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const aiTools = data.data.tools;
    showAiTools(aiTools); 
}

const showAiTools = (aiTools) => {
    const aiToolsContainer = document.getElementById('ai-tools-container');
    aiTools.forEach(tool => {
        console.log(tool)
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
              <h2 class="card-title">Features</h2>
              <ol id="features-container">
                
              </ol>
            </div>
            <div class=" h-[1px] bg-gray-500 mx-4"></div>
            <div class="p-4 space-y-4">
                <h3 class="text-2xl font-semibold">${tool.name}</h3>
                <p class="text-base text-gray-500"><i class="fa-solid fa-calendar-days"></i> <span class="pl-1">${tool.published_in}</span></p>
            </div>
        `;
        aiToolsContainer.appendChild(aiCard)
    })
}
loadData()