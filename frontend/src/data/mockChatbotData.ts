import type { ChatMessage, VectorContextChunk } from '../types/chatbot';

export const SAMPLE_VECTOR_KNOWLEDGE_BASE: VectorContextChunk[] = [
  {
    chunkId: 'chunk-pacs-sec-01',
    sourceDocument: 'PACS HR Policy Framework',
    contentSnippet: 'Qualifications for PACS Secretary: Candidate must possess a Diploma/Degree in Cooperative Management (or completed NCCT PACS Computerization & CAS Course), minimum age 21 years, and basic accounting proficiency.',
    cosineSimilarity: 0.942,
  },
  {
    chunkId: 'chunk-pacs-byelaws-04',
    sourceDocument: 'Model Bye-Laws for PACS',
    contentSnippet: 'Rule 14(2): Primary Agricultural Credit Societies shall prioritize candidates holding cryptographically verified NCCT certifications for IT and Common Accounting System roles.',
    cosineSimilarity: 0.895,
  },
  {
    chunkId: 'chunk-dairy-sop-09',
    sourceDocument: 'Dairy Cooperative SOP',
    contentSnippet: 'Qualifications for Milk Union Quality Manager: Requires completion of NCCT Milk Union Procurement & Quality Management course (DAIRY-FED-201) and practical training in lactometer testing.',
    cosineSimilarity: 0.881,
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    sender: 'ASSISTANT_AI',
    text: 'Namaste! I am your Indic AI Career & Cooperative Scheme Assistant. Ask me anything about PACS Secretary qualifications, cooperative banking career pathways, or NCCT training courses in your preferred language.',
    language: 'Hindi',
    timestamp: '2026-10-07T10:00:00Z',
    disclaimerAppended: true,
  },
  {
    id: 'msg-002',
    sender: 'USER',
    text: 'पैक्स सचिव (PACS Secretary) बनने के लिए क्या योग्यता चाहिए?',
    language: 'Hindi',
    isVoiceQuery: true,
    timestamp: '2026-10-07T10:02:15Z',
  },
  {
    id: 'msg-003',
    sender: 'ASSISTANT_AI',
    text: 'पैक्स सचिव (PACS Secretary) बनने के लिए निम्नलिखित आधिकारिक योग्यताएँ आवश्यक हैं:\n\n1. **शैक्षणिक योग्यता**: किसी मान्यता प्राप्त संस्थान से न्यूनतम स्नातक (Graduate) या सहकारिता प्रबंधन में डिप्लोमा।\n2. **एनसीसीटी पाठ्यक्रम**: एनसीसीटी का "PACS Computerization & Common Accounting System (CAS)" (PACS-CAS-2026) कोर्स सफलतापूर्वक उत्तीर्ण होना अनिवार्य है (न्यूनतम 80% उपस्थिति और 75% अंक)।\n3. **आयु सीमा**: न्यूनतम 21 वर्ष।\n4. **वरीयता**: मॉडल उप-नियमों (Model Bye-Laws) के अनुसार, डिजीलॉकर से सत्यापित कौशल प्रमाण पत्र धारक ग्रामीण युवाओं को प्राथमिकता दी जाती है।\n\n*अस्वीकरण: यह सलाह केवल मार्गदर्शन हेतु है और रोजगार की प्रत्यक्ष गारंटी नहीं देती।*',
    language: 'Hindi',
    retrievedContext: [SAMPLE_VECTOR_KNOWLEDGE_BASE[0], SAMPLE_VECTOR_KNOWLEDGE_BASE[1]],
    timestamp: '2026-10-07T10:02:18Z',
    disclaimerAppended: true,
  }
];
