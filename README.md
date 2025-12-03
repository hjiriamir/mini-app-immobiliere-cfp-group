# 🏡 Mini App Immobilière — Application Full-Stack de Gestion de Biens

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=110&section=header" />
</div>

Une application simple et moderne permettant de gérer des biens immobiliers (CRUD complet).  
Architecture professionnelle : **Fastify (Backend)** + **React (Frontend)**.

---

## 🌟 Présentation

**Mini App Immobilière** est un projet full-stack conçu pour apprendre et démontrer :

- la construction d’une API REST,
- la communication Front ↔ Back,
- l’organisation d’un projet multi-dossiers,
- une architecture claire, évolutive et maintenable.

---

## 🛠️ Fonctionnalités principales

### 🏠 Gestion complète des biens immobiliers
- ➕ **Ajouter** un bien  
- 📄 **Lister** tous les biens  
- 🔍 **Voir** les détails  
- 📝 **Modifier**  
- ❌ **Supprimer**

### ⚙️ Backend Fastify
- API REST performante  
- Validation des données avec **Zod**  
- Routes séparées  
- CORS configuré pour le frontend  

### 🎨 Frontend React
- Interface simple et fonctionnelle  
- Pages : Accueil, Détails, Création, Édition  
- Appels API centralisés dans `/services/api.ts`  
- Navigation via **React Router**

---

## ⚡ Stack technique

### 🧩 Backend
- Node.js  
- Fastify  
- Zod  
- TypeScript  

### 🎨 Frontend
- React.js  
- React Router  
- CSS / Tailwind

---

## 📂 Architecture du projet

```
mini-app-immobiliere-cfp-group/
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   │   └── item.routes.ts
│   │   ├── schemas/
│   │   │   └── item.schema.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/api.ts
│   │   └── types/Item.ts
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Lancement

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/hjiriamir/mini-app-immobiliere-cfp-group.git
cd mini-app-immobiliere-cfp-group
```

---

## 🌐 Lancer le Backend

```bash
cd backend
npm install --legacy-peer-deps
npm run dev
```

👉 Serveur API : http://localhost:3000

---

## 🎨 Lancer le Frontend

```bash
cd ../frontend
npm install --legacy-peer-deps
npm start
```

👉 App web : http://localhost:3001

---

## 🎯 Pourquoi cette architecture ?

### ✔️ Séparation claire Front / Back
- meilleure organisation  
- déploiement plus simple  
- évolutivité naturelle

### ✔️ Fastify : performance + simplicité
- rapide  
- léger  
- parfait pour une API pédagogique

### ✔️ React : flexibilité et modernité
- composants réutilisables  
- navigation fluide  
- facile à maintenir

---

## ✨ Améliorations possibles

- 🔹 Ajouter une base de données (MongoDB, PostgreSQL…)  
- 🔹 Mise en place d’un système d’authentification (JWT)  
- 🔹 Upload d’images des biens immobiliers (Cloudinary)  
- 🔹 Filtres : prix, villes, surfaces, recherche  
- 🔹 UI améliorée avec Tailwind ou Material UI  
- 🔹 Dockerisation du projet entier  
- 🔹 Tests unitaires (Jest) + tests e2e (Playwright)

---

## 📸 Screenshot

<img width="1134" height="609" alt="image" src="https://github.com/user-attachments/assets/99e99e01-208c-4356-b345-f52316e1b5b7" />


## 📫 Auteur

- ✉️ Email: amirhjiri5@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/amir-hjiri/

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=110&section=footer" />
</div>
