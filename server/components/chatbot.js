const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function chatWithAI(userMessage) {
    
 
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give only about the mining content you know \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's what I know about mining:\n\n**Types of Mining:**\n\n*   **Surface Mining:**\n    *   Open-pit mining: Extracting ore from an open pit or borrow.\n    *   Strip mining: Removing layers of soil and rock (overburden) to expose mineral seams or ore bodies.\n    *   Mountaintop removal mining: Removing the summit of a mountain to expose coal seams.\n\n*   **Underground Mining:**\n    *   Shaft mining: Accessing ore deposits through vertical shafts.\n    *   Drift mining: Accessing ore deposits through horizontal tunnels (drifts).\n    *   Slope mining: Accessing ore deposits through inclined tunnels (slopes).\n    *   Room and pillar mining: Creating rooms where ore is removed and leaving pillars of ore to support the roof.\n    *   Longwall mining: Shearing a long wall of coal or other ore.\n\n*   **Solution Mining:**\n    *   In-situ leaching (ISL): Dissolving minerals in place and pumping the solution to the surface.\n\n*   **Placer Mining:**\n    *   Extracting valuable minerals from surface deposits (placer deposits) using water and gravity.\n\n*   **Heap leaching:**\n    *   Extracting precious metals such as gold, silver, uranium and copper.\n\n**Commonly Mined Materials:**\n\n*   **Metals:** Iron ore, copper, gold, silver, aluminum (bauxite), nickel, zinc, lead, uranium\n*   **Energy Resources:** Coal, natural gas, oil shale, uranium\n*   **Industrial Minerals:** Diamonds, phosphate, potash, salt, sulfur, limestone, clay, sand, gravel\n\n**Processes Involved in Mining (Generally):**\n\n1.  **Exploration:** Prospecting and surveying to locate ore deposits.\n2.  **Development:** Preparing the site for mining (e.g., building roads, removing overburden).\n3.  **Extraction:** Removing the ore from the ground.\n4.  **Processing:** Crushing, grinding, and separating the valuable minerals from the waste rock (gangue).\n5.  **Smelting/Refining (for metals):** Further processing to purify the metals.\n6.  **Reclamation:** Restoring the mined land to a usable state.\n\n**Mining Equipment:**\n\n*   Drills\n*   Explosives\n*   Shovels\n*   Trucks\n*   Conveyors\n*   Crushers\n*   Grinding mills\n*   Separation equipment (e.g., flotation cells)\n\n**Environmental Concerns:**\n\n*   Habitat destruction\n*   Water pollution\n*   Air pollution (dust, emissions from equipment)\n*   Soil erosion\n*   Acid mine drainage\n*   Subsidence (ground sinking)\n\n**Social and Economic Considerations:**\n\n*   Job creation\n*   Economic development in mining regions\n*   Land use conflicts\n*   Impacts on indigenous communities\n*   Worker safety\n\n**Regulations:**\nGoverning bodies typically enforce laws that require mining projects to adhere to specific protocols to minimize their environmental consequences.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "and stats about the mining"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a summary of some key statistics related to the mining industry. Note that these figures are subject to change based on the year and specific region.\n\n**Global Statistics (General):**\n\n*   **Market Size:** The global mining market is a multi-trillion dollar industry.\n*   **Leading Countries (Production):** China, Australia, United States, Russia, and Canada are often among the top mining producers globally. However, the specific leaders vary by the mineral being mined.\n*   **Employment:** The mining industry employs millions of people worldwide, both directly and indirectly.\n*   **Reserves:** The world has abundant mineral reserves, however the access and quality is varied.\n\n**Specific Mineral Statistics (Examples - Numbers are approximate and may vary):**\n\n*   **Iron Ore:** Billions of metric tons are produced globally each year. Australia and Brazil are major producers.\n*   **Coal:** Several billion metric tons are mined annually. China is the largest producer and consumer of coal.\n*   **Copper:** Millions of metric tons are produced each year. Chile is a major producer.\n*   **Gold:** Thousands of metric tons are mined annually. China, Australia, and Russia are leading producers.\n*   **Lithium:** Production has increased sharply due to demand for batteries. Australia, Chile, and China are major producers.\n\n**Economic Impact:**\n\n*   **GDP Contribution:** Mining contributes a significant percentage to the GDP of many countries, especially those with large mineral resources.\n*   **Exports:** Minerals are a major export commodity for many countries.\n*   **Investment:** The mining industry attracts significant investment capital.\n\n**Environmental Impact:**\n\n*   **Land Disturbance:** Mining operations can disturb vast areas of land.\n*   **Water Usage:** Mining can be a water-intensive industry.\n*   **Waste Generation:** Mining generates large volumes of waste rock and tailings.\n\n**Important Considerations about Mining Statistics:**\n\n*   **Fluctuations:** Mineral prices and production volumes can fluctuate significantly based on global demand, economic conditions, and geopolitical factors.\n*   **Data Sources:** Different organizations (government agencies, industry associations, research firms) may report different statistics.\n*   **Specificity:** It's important to specify which mineral, country, or region you are interested in to get more accurate statistics.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "jobs in mining\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a breakdown of various jobs in the mining industry, categorized by area:\n\n**1. Exploration & Surveying:**\n\n*   **Geologist:** Studies the earth's structure, composition, and processes to locate and assess mineral deposits.\n*   **Geophysicist:** Uses geophysical methods (e.g., seismic, gravity, magnetic surveys) to explore for ore deposits.\n*   **Geochemist:** Analyzes the chemical composition of rocks and soils to identify potential ore deposits.\n*   **Exploration Manager:** Plans and manages exploration programs.\n*   **Surveyor:** Measures and maps the earth's surface to create accurate maps and plans for mining operations.\n*   **Driller:** Operates drilling equipment to obtain core samples for geological analysis.\n\n**2. Mine Operations & Engineering:**\n\n*   **Mining Engineer:** Designs and plans mining operations, ensuring safety, efficiency, and environmental compliance.\n*   **Mine Manager:** Oversees all aspects of mine operations, including production, safety, and environmental management.\n*   **Mine Superintendent:** Supervises specific areas of the mine, such as underground or surface operations.\n*   **Production Supervisor:** Manages the day-to-day activities of mining operations, ensuring production targets are met.\n*   **Blaster:** Handles and detonates explosives for rock breaking.\n*   **Equipment Operator:** Operates heavy machinery such as excavators, loaders, trucks, and drills.\n*   **Mechanic/Maintenance Technician:** Maintains and repairs mining equipment.\n*   **Electrician:** Installs and maintains electrical systems in the mine.\n*   **Ventilation Engineer:** Designs and manages ventilation systems to ensure safe air quality in underground mines.\n*   **Rock Mechanics Engineer:** Analyzes rock behavior to ensure mine stability and prevent collapses.\n*   **Surveyor:** (Again) Because ongoing surveying is crucial for mine development and operation.\n\n**3. Processing & Metallurgy:**\n\n*   **Metallurgical Engineer:** Designs and manages mineral processing plants to extract valuable minerals from ore.\n*   **Process Engineer:** Optimizes mineral processing operations to improve efficiency and recovery.\n*   **Chemist/Laboratory Technician:** Analyzes ore samples and process solutions to monitor and control the extraction process.\n*   **Plant Operator:** Operates equipment in the mineral processing plant, such as crushers, mills, and flotation cells.\n\n**4. Health, Safety, and Environment (HSE):**\n\n*   **Safety Officer/Manager:** Develops and implements safety programs to prevent accidents and injuries.\n*   **Environmental Engineer/Scientist:** Monitors and manages the environmental impact of mining operations, ensuring compliance with regulations.\n*   **Health and Safety Inspector:** Inspects the mine to identify hazards and ensure compliance with safety regulations.\n*   **Industrial Hygienist:** Assesses and controls workplace hazards such as dust, noise, and chemical exposures.\n\n**5. Management & Administration:**\n\n*   **General Manager:** Overall responsibility for the mine site.\n*   **Financial Analyst:** Manages the financial aspects of mining operations.\n*   **Human Resources Manager:** Manages employee relations, recruitment, and training.\n*   **Procurement Specialist:** Sources and purchases materials and equipment for the mine.\n\n**6. Specialized Roles:**\n\n*   **Remote Sensing Specialist:** Uses satellite imagery and aerial photography to analyze geological features.\n*   **Data Scientist:** Analyzes large datasets to optimize mining operations and improve decision-making.\n*   **Automation Engineer:** Implements and maintains automated systems in the mine.\n*   **Robotics Technician:** Maintains and repairs robots used in mining operations.\n\n**Important Considerations:**\n\n*   **Education & Training:** The required education and training vary depending on the job. Some positions require a university degree (e.g., engineering, geology), while others require vocational training or on-the-job experience.\n*   **Location:** Mining jobs are typically located in remote areas, often near mineral deposits.\n*   **Physical Demands:** Some mining jobs can be physically demanding and require working in challenging conditions.\n*   **Safety:** Safety is a top priority in the mining industry.\n*   **Technological Advancements:** The mining industry is increasingly adopting new technologies, such as automation, robotics, and data analytics. This is creating new job opportunities and changing the skills required for existing jobs.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "think and give answer before answering\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Understood. I will take a moment to process the request and formulate a considered response before providing an answer.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(userMessage);
    console.log(result.response.text());
    return result.response.text()
  }
  
  module.exports={chatWithAI}