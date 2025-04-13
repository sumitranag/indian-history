// Simulating API key - in a real application, you would use environment variables or secure storage
// and would implement proper backend security for API key handling
const OPENAI_API_KEY = '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';

// DOM Elements
const questionForm = document.getElementById('questionForm');
const questionInput = document.getElementById('questionInput');
const chatContainer = document.getElementById('chatContainer');
const timelineBtn = document.getElementById('timelineBtn');
const aboutBtn = document.getElementById('aboutBtn');
const timelineModal = document.getElementById('timelineModal');
const aboutModal = document.getElementById('aboutModal');
const closeTimelineBtn = document.getElementById('closeTimelineBtn');
const closeAboutBtn = document.getElementById('closeAboutBtn');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Event Listeners
questionForm.addEventListener('submit', handleSubmit);
timelineBtn.addEventListener('click', () => timelineModal.classList.remove('hidden'));
aboutBtn.addEventListener('click', () => aboutModal.classList.remove('hidden'));
closeTimelineBtn.addEventListener('click', () => timelineModal.classList.add('hidden'));
closeAboutBtn.addEventListener('click', () => aboutModal.classList.add('hidden'));

suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        questionInput.value = btn.textContent;
        handleSubmit(new Event('submit'));
    });
});

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    const question = questionInput.value.trim();
    
    if (!question) return;
    
    // Add user message to chat
    addMessageToChat('user', question);
    
    // Add loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loader';
    chatContainer.appendChild(loadingElement);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Clear input
    questionInput.value = '';
    
    try {
        const response = await fetchAIResponse(question);
        // Remove loading indicator
        chatContainer.removeChild(loadingElement);
        
        // Add AI response to chat
        addMessageToChat('ai', response);
        
        // Scroll to bottom again
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        // Remove loading indicator
        chatContainer.removeChild(loadingElement);
        
        // Add error message
        addMessageToChat('ai', "I'm sorry, I couldn't process your request. Please try again later.");
        
        console.error("Error:", error);
    }
}

// Fetch response from OpenAI API
async function fetchAIResponse(question) {
    // This is a simulation of API response for the demonstration
    // In a real application, you would make an actual API call to OpenAI
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Crafting the prompt template for Indian history
    const prompt = `As an expert historian specializing in Indian history, please provide an accurate, informative, and educational response to the following question about Indian history. Include relevant dates, names, and context. Focus on historical facts while acknowledging different historical perspectives where appropriate. If the question is not about Indian history, politely redirect and offer to help with Indian historical topics instead.

Question: ${question}`;

    // Since this is a frontend-only demo without actual API calls,
    // we'll return some sample responses based on keywords in the question
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('mughal') || lowerQuestion.includes('mughal empire')) {
        return "The Mughal Empire was established in 1526 when Babur defeated Ibrahim Lodi at the First Battle of Panipat. At its peak under Emperor Aurangzeb (1658-1707), it controlled most of the Indian subcontinent. Notable emperors included Akbar (known for religious tolerance and administrative reforms), Jahangir, Shah Jahan (who built the Taj Mahal), and Aurangzeb. The empire is known for its Persian-influenced art, architecture (including the Taj Mahal, Red Fort, and Humayun's Tomb), and administrative systems. The empire gradually declined after Aurangzeb's death, facing challenges from Maratha expansion and eventually coming under British influence, with the last emperor Bahadur Shah Zafar deposed following the Revolt of 1857.";
    } else if (lowerQuestion.includes('ashoka') || lowerQuestion.includes('asoka')) {
        return "Emperor Ashoka (304-232 BCE) was the third ruler of the Maurya Dynasty and one of India's greatest emperors. After witnessing the devastation caused by his conquest of Kalinga (modern Odisha), he embraced Buddhism and renounced warfare. His reign is marked by the spread of Buddhist principles, construction of stupas and monasteries, and establishment of pillars and rock edicts across the subcontinent that promoted dharma (righteous living). The Ashoka Chakra on India's national flag is derived from the lion capital of one of his pillars at Sarnath. His efforts to spread Buddhism helped it become a world religion, particularly in Southeast Asia. His policies of non-violence, religious tolerance, and welfare projects were revolutionary for his time.";
    } else if (lowerQuestion.includes('independence') || lowerQuestion.includes('freedom struggle')) {
        return "The Indian Independence Movement evolved over decades, beginning with the 1857 Revolt against the East India Company and culminating in independence in 1947. Key phases included the formation of the Indian National Congress (1885), the Swadeshi Movement following Bengal's partition (1905), and Mahatma Gandhi's non-violent civil disobedience campaigns like Non-Cooperation (1920-22), Civil Disobedience (1930), and Quit India (1942). Other significant leaders included Bal Gangadhar Tilak, Jawaharlal Nehru, Subhas Chandra Bose, Bhagat Singh, and Sardar Vallabhbhai Patel. Various factors contributed to independence, including World War II's weakening of British power, naval mutinies, and sustained nationalist pressure. The independence came with partition into India and Pakistan, causing massive population displacement and communal violence that claimed hundreds of thousands of lives.";
    } else if (lowerQuestion.includes('taj mahal')) {
        return "The Taj Mahal is a white marble mausoleum located in Agra, Uttar Pradesh. It was commissioned in 1632 by Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, who died giving birth to their 14th child. The mausoleum was completed around 1643, while the surrounding complex was finished in 1653. Built by approximately 20,000 artisans under the guidance of architects including Ustad Ahmad Lahauri, it combines Persian, Islamic, and Indian architectural styles. The main structure stands on a square plinth with a symmetrical garden divided into four parts (charbagh). The Taj is renowned for its perfect proportions, intricate marble inlay work (pietra dura), and how it changes appearance throughout the day as light conditions shift. It was designated a UNESCO World Heritage Site in 1983 and is considered one of the New Seven Wonders of the World.";
    } else if (lowerQuestion.includes('science') || lowerQuestion.includes('mathematics')) {
        return "Ancient India made significant contributions to science and mathematics. In mathematics, the decimal numeral system and the concept of zero (developed by Aryabhata and Brahmagupta) revolutionized calculation. The Bakhshali manuscript contains the earliest known use of the zero symbol. Mathematicians like Brahmagupta formulated rules for arithmetic operations and negative numbers, while Bhaskara II made advances in calculus-like concepts. In astronomy, the Siddhantic texts calculated planetary positions, and Aryabhata correctly proposed the earth's rotation on its axis. Medical science flourished with Sushruta's surgical techniques (including rhinoplasty) and Charaka's systematic medicine. Metallurgical achievements include the rust-resistant Iron Pillar of Delhi (402 CE). Ancient universities like Takshashila and Nalanda were centers of learning that attracted scholars from across Asia, establishing India's early tradition of scientific inquiry and knowledge dissemination.";
    } else {
        return "I'd be happy to share information about Indian history related to your question, but I need a specific query about Indian historical events, figures, dynasties, or cultural developments. India has a rich history spanning thousands of years, from the ancient Indus Valley Civilization through the Medieval period to the colonial era and independence. Feel free to ask about any aspect of Indian history you're curious about!";
    }

    /* UNCOMMENT AND MODIFY THIS CODE TO USE THE ACTUAL OPENAI API
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // or gpt-4 if you have access
                messages: [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant specializing in Indian history."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error("No response from API");
        }
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
    */
}

// Add message to chat container
function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex items-start mb-4';
    
    let avatar, messageBg;
    
    if (sender === 'user') {
        avatar = 'U';
        messageBg = 'bg-blue-50';
    } else {
        avatar = 'H';
        messageBg = 'bg-gray-100';
    }
    
    messageElement.innerHTML = `
        <div class="flex-shrink-0 mr-3">
            <div class="h-10 w-10 rounded-full ${sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-r from-orange-500 to-red-600'} flex items-center justify-center text-white font-bold">
                ${avatar}
            </div>
        </div>
        <div class="${messageBg} rounded-lg p-3 max-w-3xl">
            <p class="text-gray-800">${message}</p>
        </div>
    `;
    
    chatContainer.appendChild(messageElement);
}