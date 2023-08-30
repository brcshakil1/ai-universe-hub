const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const aiTools = data.data.tools;
    showAiTools(aiTools); 
}

const showAiTools = (aiTools) => {
    const aiToolsContainer = document.getElementById('ai-tools-container');
    aiTools.forEach(tool => {
        // console.log(tool)
        const aiCard = document.createElement('div');
        // create features lists
        const featuresListContainer = document.createElement('ol');
        featuresListContainer.classList.add('list-decimal', 'text-base', 'font-semibold', 'px-4')
        tool.features.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `${item}`;
          featuresListContainer.appendChild(li);
        })
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
            </div>
            <div class=" h-[1px] bg-gray-500 mx-4"></div>
            <div  class="flex justify-between items-center">
              <div class="p-4 space-y-4">
                  <h3 class="text-2xl font-semibold">${tool.name}</h3>
                  <p class="text-base text-gray-500"><i class="fa-solid fa-calendar-days"></i> <span class="pl-1">${tool.published_in}</span></p>
              </div>
              <div class="card-actions justify-end">
                <button class="text-xl" onclick="showAiDetails.showModal(), handleShowDetails(${tool.id})"><i class="fa-solid fa-arrow-right" style="color: #f24556;"></i></button>
              </div>
            </div>
        `;
        // Append list item
        const cardBody = aiCard.querySelector('.card-body');
        cardBody.appendChild(featuresListContainer);
        aiToolsContainer.appendChild(aiCard);
    })
}

// handle click on right arrow
const handleShowDetails = (toolId) =>{
  let addZero = '0'
  if(toolId < 10) {
    addZero += toolId;
    showDetails(addZero)
    console.log(addZero)
  } else {
    showDetails(toolId)
    console.log(toolId)
  }
  // showDetails(toolId)
}

// show details
const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
  const allDetails = data.data;
  console.log(allDetails);

  // details container
  const detailsContainer = document.getElementById('details-container');
  // create element
  const detailsInfo = document.createElement('div');
  detailsInfo.classList.add('flex-1')
  const otherInfo = document.createElement('div');
  otherInfo.classList.add('flex-1')

  // create pricing container
  const pricingContainer = document.createElement('div');
  allDetails.pricing.forEach(price => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${price.price}</h3>`;
    pricingContainer.appendChild(div);
  })

  // create features name container
  const featuresNameContainer = document.createElement('ul');
  const features = allDetails.features;
  for(const key in features) {
    if(features.hasOwnProperty(key)) {
      const featureNames = features[key].feature_name; 
      const li = document.createElement('li');
      li.innerHTML = `${featureNames}`;
      featuresNameContainer.appendChild(li);
    }
  }

   // create integration name container
   const integrationsNameContainer = document.createElement('ul');
   allDetails.integrations.forEach(name => {
     const li = document.createElement('li');
     li.innerHTML = name;
     integrationsNameContainer.appendChild(li);
   })
 
  // details info
  detailsInfo.innerHTML = `
    <div id="info">
      <h2>${allDetails.description}</h2>
    </div>
    <div>
      <div id="features-container">
        <h3>Features</h3>
      </div>
      <div id="integrations-container">
        <h3>Integrations</h3>
      </div>
    </div>  
  `;

  // other Info
  otherInfo.innerHTML = `
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="${allDetails.image_link[0]}" alt="${allDetails.tool_name}" /></figure>
      <div class="card-body">
        <h2 class="card-title">${allDetails.input_output_examples[0].input}</h2>
        <p>${allDetails.input_output_examples[0].output}</p>
      </div>
    </div>
  `;


  detailsContainer.textContent = '';

  // append info
  const info = detailsInfo.querySelector('#info');
  info.appendChild(pricingContainer);

  // append features and integrations
  // features container
  const featuresContainer = detailsInfo.querySelector('#features-container');
  featuresContainer.appendChild(featuresNameContainer);

  // integrations container
  const integrationContainer = detailsInfo.querySelector('#integrations-container');
  integrationContainer.appendChild(integrationsNameContainer)
  console.log(featuresNameContainer)

  detailsContainer.appendChild(detailsInfo);
  detailsContainer.appendChild(otherInfo);
}




loadData()