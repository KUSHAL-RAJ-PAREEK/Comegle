# 📺 Comegle — College-Based Omegle

**Comegle** is a real-time, college-exclusive video chat platform inspired by Omegle. It connects students from the **same college** (verified by college email domain) for spontaneous and anonymous one-on-one video chats.

---

## 🎥 Demo Video
📽️ Check out the app in action:

https://github.com/user-attachments/assets/8fda2c65-1ee0-43ac-ba21-7e92351041d2


## ✨ Features

- 🎥 **Video Chat** – Peer-to-peer one-on-one video communication  
- 💬 **Text Messaging** – Chat alongside video in real time  
- 🔄 **Next** – Instantly skip to another random user from your college  
- 🛑 **Stop** – Leave the current chat session any time  
- 🔐 **College Email Sign-In** – Only verified college domain emails can access  
- ⚡ **Smart Room Allocation** – Efficient matchmaking using Redis  

---

## 🛠 Tech Stack

| Layer                | Technologies Used                                                               |
|---------------------|----------------------------------------------------------------------------------|
| **Monorepo**         | [Turborepo](https://turbo.build/repo)                                           |
| **Frontend**         | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)        |
| **Authentication**   | [NextAuth.js](https://next-auth.js.org/) with college domain email verification |
| **Database**         | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/)|
| **Video Streaming**  | [WebRTC](https://webrtc.org/), [PeerJS](https://peerjs.com/)                    |
| **Real-Time Socket** | [Socket.IO](https://socket.io/), [Redis Pub/Sub](https://redis.io/)             |
| **Matchmaking**      | Custom Redis-based room allocation algorithm                                     |

---

## 🏫 College-Only Access

- Users **must sign in with their official college email address** (e.g., `student@abc.edu`).
- Email domains are verified to match against a pre-approved list.
- Users are only matched with other students from the **same college domain**.

---

## ⚙️ How It Works

1. **Sign In**  
   - Users log in via OAuth using Google through **NextAuth.js**.  

2. **Room Allocation**  
   - A Redis-backed queue system allocates rooms by grouping users from the same college.  
   - The matching algorithm ensures quick and relevant pairings.

3. **Video & Chat Communication**  
   - **WebRTC** + **PeerJS** are used for peer-to-peer video calling.  
   - **Socket.IO** handles signaling, events (join, next, stop), and chat messages.

---
## 📢 LinkedIn Post

👉 [LinkedIn Post](https://www.linkedin.com/posts/kushal-raj-pareek_omegle-nextjs-socket-activity-7336564994349621248-pXQx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6K2CsB7HDNhcXdMy9UAPAAleQv9nt2A8k)

Thank you.
