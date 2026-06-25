/* 
   Rotaract Club of Thane Downtown - RAG Chatbot Engine
   Implements a client-side Retrieval-Augmented Generation (RAG) agent.
   Retrieves relevant club facts based on user query tokens and synthesizes responses with sources.
*/

// 1. Knowledge Base Corpus (Documents)
const rctdKnowledgeBase = [
  {
    id: "about-rotaract",
    title: "About Rotaract",
    keywords: ["rotaract", "rotary", "international", "youth", "youngsters", "organization", "wing", "age", "purpose"],
    content: "Rotaract is an internationally renowned organization for youth aged 18 to 30. It is a youth wing of Rotary International, working for the welfare and development of communities through fellowship, service initiatives, and professional leadership development.",
    source: "about-us.html",
    sourceName: "About Us: Rotaract Global"
  },
  {
    id: "about-rctd",
    title: "Rotaract Club of Thane Downtown (RCTD)",
    keywords: ["rctd", "thane", "downtown", "club", "founded", "history", "slogan", "motto", "members", "family", "size"],
    content: "The Rotaract Club of Thane Downtown (RCTD) was founded on 7th May 2014. It is a family of 75+ active Rotaractors in the Thane region. The club's slogan is: 'Together We Change Lives, Together We Touchdown. We Are the Rotaractors of THANE DOWNTOWN.'",
    source: "about-us.html",
    sourceName: "About Us: Our Club"
  },
  {
    id: "stats",
    title: "Club Service Statistics",
    keywords: ["stats", "statistics", "achievements", "numbers", "enrolled", "completed", "years", "service", "experience"],
    content: "Over its 12+ years of service, the Rotaract Club of Thane Downtown has enrolled over 300+ active members and successfully completed more than 5,500+ service and community projects in and around Thane.",
    source: "index.html",
    sourceName: "Home: Statistics"
  },
  {
    id: "meetings",
    title: "GBM Meetings & Venue",
    keywords: ["meeting", "meetings", "gbm", "general", "body", "schedule", "when", "where", "frequency", "twice", "venue", "location"],
    content: "General Body Meetings (GBMs) of RCTD are held twice a month. Meetings are typically held in Thane, Maharashtra, India (Pin Code: 400601). Specific dates and timings are announced in the club newsletter and group channels.",
    source: "our-calender.html",
    sourceName: "Calendar: Meetings"
  },
  {
    id: "membership",
    title: "How to Join RCTD & Benefits",
    keywords: ["join", "member", "membership", "enroll", "how", "apply", "register", "benefits", "skills", "network", "treks", "fees", "rctd", "club"],
    content: "To join RCTD, visit the Contact Us page and submit the registration form. Membership benefits include: expanding your network, learning management and leadership skills, participating in fun treks, tours, and outings, improving communication, and contributing to community welfare.",
    source: "contact-us.html",
    sourceName: "Contact Us: Membership Form"
  },
  {
    id: "project-raasleela",
    title: "Project RaasLeela",
    keywords: ["raasleela", "garba", "dance", "culture", "celebration", "dandiya", "festivity", "flagship", "fundraiser", "jaipur", "foot"],
    content: "RaasLeela is a flagship cultural Garba celebration held annually by RCTD. It brings 700 to 1,000 community youth together. Crucially, all proceeds raised from RaasLeela are donated to fund our Jaipur Foot Donation project, merging cultural celebration with community service.",
    source: "projects.html",
    sourceName: "Projects: RaasLeela"
  },
  {
    id: "project-jaipurfoot",
    title: "Jaipur Foot Donation (JFD)",
    keywords: ["jaipur", "foot", "donation", "prosthetic", "legs", "disabled", "amputees", "mobility", "independence", "drive", "medical"],
    content: "For over 11 years, RCTD has conducted the Jaipur Foot Donation drive. We raise funds (primarily through our RaasLeela Garba event) to provide prosthetic limbs to amputees, empowering individuals who lost mobility in accidents or due to disabilities to walk again and regain independence.",
    source: "projects.html",
    sourceName: "Projects: Jaipur Foot Donation"
  },
  {
    id: "project-eloquence",
    title: "Project Eloquence",
    keywords: ["eloquence", "debate", "elocution", "essay", "writing", "schools", "children", "students", "soft-skills", "public", "speaking"],
    content: "Eloquence is an 8-year-old initiative by RCTD aimed at school children in Thane. It features elocution, debate, and essay writing competitions to enhance public speaking confidence, logical reasoning, and communication skills among youngsters.",
    source: "projects.html",
    sourceName: "Projects: Eloquence"
  },
  {
    id: "project-circleoflove",
    title: "Project Circle of Love (COL)",
    keywords: ["circle", "love", "col", "transgender", "monsoon", "ration", "support", "raincoats", "sarees", "water", "purifiers", "inclusivity"],
    content: "Circle of Love is a 7-year-old initiative dedicated to supporting the transgender community in the Thane region. Each year, we raise over ₹50,000 to provide essential monsoon support, including rice, flour, oil, raincoats, sarees, and water purifiers for clean drinking water.",
    source: "projects.html",
    sourceName: "Projects: Circle of Love"
  },
  {
    id: "project-sportsextravaganza",
    title: "Sports Extravaganza",
    keywords: ["sports", "extravaganza", "fitness", "games", "cricket", "football", "bowling", "tournaments", "weekends", "teamwork", "sportsmanship"],
    content: "Sports Extravaganza is a community sports campaign hosted by RCTD across 14+ simultaneous sports over two weekends. Open to all age groups, it promotes physical fitness, teamwork, healthy competition, and community sportsmanship.",
    source: "projects.html",
    sourceName: "Projects: Sports Extravaganza"
  },
  {
    id: "project-rakshapatra",
    title: "Project Rakshapatra",
    keywords: ["rakshapatra", "soldiers", "army", "rakshabandhan", "letters", "thanking", "appreciation", "schools", "camps"],
    content: "Rakshapatra is a 10-year-old flagship initiative conducted on Rakshabandhan. We coordinate with 15+ local schools, collecting over 1,0,000 thank-you letters written by children, and distribute them to active soldiers in remote army base camps to express gratitude for safeguarding the nation.",
    source: "projects.html",
    sourceName: "Projects: Rakshapatra"
  },
  {
    id: "project-secretsanta",
    title: "Project Secret Santa",
    keywords: ["santa", "secret", "christmas", "gifts", "orphans", "shelter", "distribution", "festive", "joy", "kids"],
    content: "Secret Santa is a holiday project where RCTD members distribute gifts, warm clothing, and share festive treats with children in local orphanages and shelter homes to spread warmth and Christmas cheer.",
    source: "projects.html",
    sourceName: "Projects: Secret Santa"
  },
  {
    id: "project-rockrotaract",
    title: "Project Rock Rotaract",
    keywords: ["rock", "rotaract", "music", "concert", "bands", "festival", "awareness", "funds", "youth", "fellowship"],
    content: "Rock Rotaract is a grand youth music festival promoting local bands while raising funds and awareness for social causes in the community, blending youth fellowship and public service.",
    source: "projects.html",
    sourceName: "Projects: Rock Rotaract"
  },
  {
    id: "project-communitywelfare",
    title: "Community Welfare & Disaster Relief",
    keywords: ["blood", "donation", "drives", "health", "checkups", "disaster", "relief", "campaigns", "welfare", "medical"],
    content: "Throughout the year, RCTD hosts immediate-response campaigns including blood donation drives, free health checkup camps, and disaster relief donation drives for affected communities in Maharashtra.",
    source: "projects.html",
    sourceName: "Projects: Community Welfare"
  },
  {
    id: "team-board",
    title: "Club Officers & Board of Directors (BOD)",
    keywords: ["president", "secretary", "vice", "treasurer", "sergeant", "board", "directors", "bod", "leaders", "leadership", "kshitij", "raut", "rishita", "harel", "sunayna", "rctd", "club"],
    content: "The current board features Rtr. Kshitij Raut (President), Rtr. Rishita Harel (Secretary), and Rtr. Sunayna Anand. The Board of Directors (BOD) coordinates with various avenues of service including Community Service, Club Service, International Service, and Professional Development.",
    source: "our-team.html",
    sourceName: "Our Team: Directors"
  },
  {
    id: "contact-info",
    title: "Contact Address & Phone",
    keywords: ["phone", "email", "address", "contact", "reach", "mobile", "number", "instagram", "facebook", "twitter", "social"],
    content: "You can reach the Rotaract Club of Thane Downtown via phone at +91 84518 91398, or follow them on Instagram (@rcthanedowntown) and Facebook. The club is based in Thane, Maharashtra, India (400601).",
    source: "contact-us.html",
    sourceName: "Contact Us: Support Details"
  }
];

// 2. Stop words to filter from searches
const englishStopWords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "arent", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "cant", "cannot", "could", "couldnt",
  "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here", "heres", "hers", "herself", "him", "himself", "his", "how", "hows",
  "i", "id", "ill", "im", "ive", "if", "in", "into", "is", "isnt", "it", "its", "itself",
  "lets", "me", "more", "most", "mustnt", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
  "same", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such",
  "than", "that", "thats", "the", "their", "theirs", "them", "themselves", "then", "there", "theres", "these", "they", "theyd", "theyll", "theyre", "theyve", "this", "those", "through", "to", "too",
  "under", "until", "up", "very", "was", "wasnt", "we", "wed", "well", "were", "weve", "werent", "what", "whats", "when", "whens", "where", "wheres", "which", "while", "who", "whos", "whom", "why", "whys",
  "with", "wont", "would", "wouldnt", "you", "youd", "youll", "youre", "youve", "your", "yours", "yourself", "yourselves"
]);

// 3. Retrieval Algorithm (TF-IDF inspired term ranker)
function retrieveRelevantDocuments(query) {
  // Tokenize and clean query
  const tokens = query
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(t => t.length > 1 && !englishStopWords.has(t));

  if (tokens.length === 0) return [];

  const matchedDocs = [];

  rctdKnowledgeBase.forEach(doc => {
    let score = 0;
    
    tokens.forEach(token => {
      // 1. Keyword direct match (high priority weight = 5)
      doc.keywords.forEach(kw => {
        if (kw === token) score += 5;
        else if (kw.includes(token)) score += 2;
      });

      // 2. Title match (weight = 3)
      const cleanTitle = doc.title.toLowerCase();
      if (cleanTitle.includes(token)) {
        score += 3;
      }

      // 3. Content match (weight = 1 for term frequency)
      const cleanContent = doc.content.toLowerCase();
      const occurrences = (cleanContent.match(new RegExp(token, "g")) || []).length;
      score += occurrences * 1;
    });

    if (score > 0) {
      matchedDocs.push({ doc, score });
    }
  });

  // Sort by highest match score
  matchedDocs.sort((a, b) => b.score - a.score);
  return matchedDocs;
}

// 4. Conversational Generation Engine
function generateResponse(query) {
  // Check basic greeting first
  const cleanQuery = query.toLowerCase().trim().replace(/[?.]/g, "");
  const greetings = ["hi", "hello", "hey", "hola", "greetings", "wasup", "yo", "who are you", "what is this"];
  if (greetings.includes(cleanQuery)) {
    return {
      text: "Hello! I am **RCTD ka Chotu**, a chatbot trained to answer questions about the **Rotaract Club of Thane Downtown** and Rotaract globally. You can ask me about our flagship projects (like RaasLeela and Jaipur Foot Donation), our officers, our calendar, or how to join us!",
      source: null
    };
  }

  // Retrieve matches
  const matches = retrieveRelevantDocuments(query);
  
  // RAG Decision Rule: If no document scores, fallback to out-of-scope lock
  if (matches.length === 0 || matches[0].score < 1.5) {
    return {
      text: "I'm sorry, but I am specifically trained to only discuss Rotaract and the **Rotaract Club of Thane Downtown (RCTD)**. Let's discuss our projects, meeting schedules, active board members, or how to register as a new member!",
      source: null
    };
  }

  // Retrieve top matching document
  const topMatch = matches[0].doc;
  
  // Synthesize response based on matches
  let responseText = `Here is what I retrieved from our club files regarding **${topMatch.title}**:\n\n${topMatch.content}`;
  
  // If there is a strong secondary match, append a helpful reference
  if (matches.length > 1 && matches[1].score > 3.0) {
    responseText += `\n\n*Related Info:* We also found details under **${matches[1].doc.title}**: ${matches[1].doc.content.substring(0, 120)}... (refer to source link to read more).`;
  }

  return {
    text: responseText,
    source: topMatch
  };
}

// 5. Setup Floating Chatbot UI Widget
function initChatbotUI() {
  // Create widget DOM markup
  const chatbotHtml = `
    <!-- Floating Button -->
    <button class="chatbot-toggle" aria-label="Open Chatbot">
      <svg class="chat-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
      </svg>
    </button>

    <!-- Chat window pane -->
    <div class="chatbot-window">
      <!-- Chat Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">R</div>
          <div>
            <div class="chatbot-name">RCTD ka Chotu</div>
            <div class="chatbot-status"><span class="status-dot"></span>Online • RAG Assistant</div>
          </div>
        </div>
        <button class="chatbot-close" aria-label="Close Chatbot">&times;</button>
      </div>

      <!-- Message History Pane -->
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="chat-message bot-msg">
          <div class="chat-msg-bubble">
            Hello! I am <strong>RCTD ka Chotu</strong>. Ask me anything about Rotaract or the Rotaract Club of Thane Downtown!
          </div>
        </div>
      </div>

      <!-- Suggested Chips -->
      <div class="chatbot-suggestions">
        <button class="suggestion-chip">What is RaasLeela?</button>
        <button class="suggestion-chip">How do I join the club?</button>
        <button class="suggestion-chip">When was RCTD started?</button>
        <button class="suggestion-chip">Jaipur Foot Donation</button>
      </div>

      <!-- Input controls -->
      <div class="chatbot-input-container">
        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
        <button class="chatbot-send-btn" id="chatbotSend" aria-label="Send Message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHtml);

  // Grab DOM references
  const toggleBtn = document.querySelector('.chatbot-toggle');
  const closeBtn = document.querySelector('.chatbot-close');
  const windowPane = document.querySelector('.chatbot-window');
  const messagesContainer = document.getElementById('chatbotMessages');
  const inputField = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const suggestions = document.querySelectorAll('.suggestion-chip');

  if (!toggleBtn || !closeBtn || !windowPane || !messagesContainer || !inputField || !sendBtn) return;

  // Toggle Visibility
  const toggleWindow = () => {
    windowPane.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    if (windowPane.classList.contains('open')) {
      inputField.focus();
    }
  };

  toggleBtn.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', () => windowPane.classList.remove('open'));

  // Append new chat bubble
  const appendMessage = (text, isUser = false, sourceObj = null) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', isUser ? 'user-msg' : 'bot-msg');
    
    // Markdown replacement helper (bold text replacement only)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');

    let sourceHtml = "";
    if (sourceObj) {
      sourceHtml = `
        <div class="chat-msg-source">
          <span>Source:</span> 
          <a href="${sourceObj.source}" class="source-link">${sourceObj.sourceName}</a>
        </div>
      `;
    }

    messageDiv.innerHTML = `
      <div class="chat-msg-bubble">
        ${formattedText}
        ${sourceHtml}
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Typing simulator
  const showTypingIndicator = () => {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('chat-message', 'bot-msg', 'typing-indicator');
    indicatorDiv.innerHTML = `
      <div class="chat-msg-bubble indicator-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicatorDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return indicatorDiv;
  };

  // Message Send Actions
  const handleSend = () => {
    const query = inputField.value.trim();
    if (!query) return;

    // 1. Send User message
    appendMessage(query, true);
    inputField.value = "";

    // 2. Show typing loading state
    const indicator = showTypingIndicator();

    // 3. Simulate processing and print generated response
    setTimeout(() => {
      // Remove typing dot indicator
      if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }

      // Generate response from local RAG engine
      const response = generateResponse(query);
      appendMessage(response.text, false, response.source);
    }, 900 + Math.random() * 600); // 0.9s - 1.5s human-like thinking delay
  };

  sendBtn.addEventListener('click', handleSend);
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Suggestion chips clicks
  suggestions.forEach(chip => {
    chip.addEventListener('click', () => {
      inputField.value = chip.textContent;
      handleSend();
    });
  });
}

// Initialise the chatbot UI on DOM load
document.addEventListener('DOMContentLoaded', initChatbotUI);
