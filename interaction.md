# 🏛️ Registre des Interactions - Cour Royale (Version Palais Cloud)

Ce document répertorie l'état d'avancement de l'expérience depuis la stabilisation de la **Migration Firestore V2** et l'activation de l'**Identité Impériale**.

---

## 🟢 Interactions Opérationnelles (Cloud & Temps Réel)

### 1. Identité Impériale & Profil Noble
- **Système de Scellement (V2)** : Sauvegarde ultra-robuste via `setDoc` avec fusion (merge). Résistance aux latences réseau (timeout de 20s).
- **Deep-Merge Data** : Protection contre les crashs d'affichage. Les préférences et statistiques ont toujours des valeurs par défaut, évitant les erreurs de chargement.
- **Anonymisation de Fer** : Les noms Google réels sont systématiquement remplacés par des titres héraldiques uniques générés par le Palais.
- **Règles de Sécurité (Conseil des Sceaux)** : Autorisations Firestore strictes déployées (seul le noble modifie son pli).

### 2. Le Grand Hall (Registre Social)
- **Proclamations Mondiales** : Flux temps réel global. Chaque noble voit les annonces instantanément.
- **Faveurs (Likes) & Influence** : Système de réputation persistant. Liker une proclamation augmente réellement l'aura du noble émetteur.
- **Présence Aristocratique** : Détection des nobles connectés via "Heartbeat" (mise à jour toutes les 60s).

---

## 🟡 Chantiers en Cours (L'Immersion Totale)

### 1. 🎖️ Système de Médailles Royales
- **Objectif** : Une galerie de **20 médailles** (sceaux de cire et camées) se débloquant selon les succès (ex: *Plume d'Argent*, *Idole des Salons*).
- **Visualisation** : Intégration dans le profil sous forme de vitrine d'honneur.

### 2. 🎭 L'Esprit du Duc (DSS Smart Trigger)
- **Logique de Chronique** : Le Duc de Saint-Simon ne se déclenche plus au hasard.
- **Conditions** : Minimum **2 messages supplémentaires** depuis la dernière chronique.
- **Rythme** : Maximum une fois toutes les **10 minutes** pour préserver la rareté de sa parole.

### 3. Les Plis Scellés (Messagerie 1:1)
- **Statut** : Interface prête, en attente de la logique de correspondance privée Firestore.

---

## 💎 Prochains Chantiers (Esthétique & Physique)

### 🎭 Audio-Scape (Priorité Haute)
- **Bruitages contextuels** : Crépitement de plume lors de la saisie, son de rideau lors des transitions, cloche de valet pour les notifications.

### 🕯️ Physique & Sceau de Cire
- **Wax Seal Physics** : Utiliser GSAP pour que le bouton "Sceller" déclenche une animation de sceau de cire physique qui s'écrase sur le parchemin.

### 🎖️ Médailles de Présance
- **Illustration Premium IA** : Chroniques illustrées par des œuvres d'art générées par IA pour une immersion totale.
