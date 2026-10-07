# SANGVYA — AI & LMS-Enabled Cooperative Capacity Building, ERP, and Employment Ecosystem

> **Problem Statement ID**: 26087  
> **Sponsoring Body**: Ministry of Cooperation, Government of India  
> **Executing Body**: National Council for Cooperative Training (NCCT)  
> **Repository**: [https://github.com/HasanAli-07/SANGVYA](https://github.com/HasanAli-07/SANGVYA)

---

## 📌 Project Overview
**SANGVYA** is a comprehensive, enterprise-grade digital operating ecosystem designed to modernize human resource development, training administration, e-learning, and employment linkages across India's cooperative sector. 

The platform connects:
- **1 Apex Center**: VAMNICOM Pune
- **5 Regional Institutes**: RICM Gandhinagar, Chandigarh, Bengaluru, Kalyani, Patna
- **14 State-level Institutes**: ICM Bhopal, Bhubaneswar, Chennai, Dehradun, Guwahati, Hyderabad, Imphal, Jaipur, Kannur, Lucknow, Madurai, Nagpur, Pune, Thiruvananthapuram
- **~109 Junior Cooperative Training Centres (JCTCs)**
- **Over 200,000 trainees annually** across PACS secretaries, cooperative bankers, dairy federations, self-help groups, and rural youth.

---

## 🏗️ Module Architecture & Branch Strategy

The project is structured and developed branch-by-branch across 7 core modules:

```
main (Baseline documentation & foundation)
 ├── feature/module-1-academic-erp-logistics
 ├── feature/module-2-edge-biometrics-qr-attendance
 ├── feature/module-3-offline-multilingual-lms
 ├── feature/module-4-w3c-verifiable-credentials
 ├── feature/module-5-indic-ai-rag-chatbot
 ├── feature/module-6-employment-exchange-job-matcher
 └── feature/module-7-analytics-mis-dpdp
```

### Module Roadmap & Breakdown

| Branch Name | Module Title | Core Focus Areas |
| :--- | :--- | :--- |
| `feature/module-1-academic-erp-logistics` | **Central Academic ERP & Campus Logistics** | Multi-tenant governance, course catalog, bulk society nominations, conflict-free scheduling, hostel bed allocation optimization ($\min \sum c_{ij} X_{ij}$), mess headcounts. |
| `feature/module-2-edge-biometrics-qr-attendance` | **Edge Biometric & Dynamic QR Attendance** | On-device face extraction (`MobileFaceNet`/`ArcFace` $\mathbf{e} \in \mathbb{R}^{512}$), liveness check, geofenced TOTP QR (15s refresh), offline buffer & CRDT sync. |
| `feature/module-3-offline-multilingual-lms` | **Offline Multilingual LMS & Assessment** | Offline SCORM/HTML5 player, MeitY Bhashini AI (NMT/ASR/TTS in 22 Scheduled Languages), anti-cheating exam engine, xAPI monotonic CRDT sync. |
| `feature/module-4-w3c-verifiable-credentials` | **W3C Credentials & DPI Integration** | W3C VC 2.0 JSON-LD credentials, Ed25519 cloud HSM signing, DigiLocker / API Setu Pull/Push gateways, SIDH/ABC bridge, scannable 2D QR validation. |
| `feature/module-5-indic-ai-rag-chatbot` | **Indic AI RAG Career Guidance Chatbot** | Bhashini voice queries, `pgvector` RAG pipeline over PACS Model Bye-Laws & NCCT catalogs, zero-hallucination grounded counselor agent. |
| `feature/module-6-employment-exchange-job-matcher` | **Cooperative Employment Exchange & Matcher** | Recruiter portal (PACS/DCCBs/Milk Unions), multi-factor candidate match score $S(c, j)$ with exponential distance decay ($e^{-\lambda d}$), NCS bridge. |
| `feature/module-7-analytics-mis-dpdp` | **Executive MIS & DPDP Statutory Compliance** | Multi-tier executive dashboards, DPDP Act 2023 consent & 90-day biometric data purging, append-only cryptographic audit ledger. |

---

## 🛠️ Technology Stack

- **Frontend / Client**: React / Next.js, TailwindCSS / Custom CSS, Flutter Mobile Client, PWA Support.
- **Backend / Microservices**: FastAPI, Node.js / Express, Python.
- **AI & ML**: PyTorch, MobileFaceNet, ArcFace, LangChain, Bhashini ULCA APIs, pgvector.
- **Database & Storage**: PostgreSQL 16 (+ pgvector), Redis, SQLite (SQLCipher + WAL), S3-compatible Object Storage.
- **Security & Cryptography**: W3C Verifiable Credentials, Ed25519 Signature, OIDC, TLS 1.3, AES-256-GCM.

---

## 📜 Specifications & Documentation
- [Cooperative Training ERP SRS Design.pdf](Cooperative%20Training%20ERP%20SRS%20Design.pdf)
- [Cooperative Training ERP SRS Design (1).pdf](Cooperative%20Training%20ERP%20SRS%20Design%20(1).pdf)
