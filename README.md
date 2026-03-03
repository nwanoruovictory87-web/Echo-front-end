Echo is a modern real-time chat application built with React, TypeScript, and Vite, focused on delivering a smooth, responsive, and interactive messaging experience.

The application supports instant messaging, live typing indicators, and real-time online/offline presence, demonstrating practical use of event-driven architecture and real-time communication patterns commonly used in production systems.

This repository contains the frontend client of the Echo platform.

🎯 Why Echo Matters (Project Value)

Echo was built to showcase:

Real-world real-time application design

Clean and scalable React architecture

Effective use of TypeScript for reliability

UI patterns used in modern chat platforms (typing indicators, presence, instant updates)

It reflects how real chat applications like Slack or WhatsApp behave under the hood — but in a simplified, portfolio-friendly form.

🚀 Key Features
💬 Real-Time Messaging

Messages are sent and received instantly

UI updates without page refresh

✍️ Live Typing Indicators

Displays when another user is actively typing

Uses real-time events for smooth UX

Prevents “dead air” during conversations

🟢 Online / Offline Presence

Shows user availability in real time

Automatically updates on connect and disconnect events

⚡ High-Performance Frontend

Built with Vite for fast startup and hot reload

Optimized component rendering

📱 Responsive UI

Works seamlessly across mobile, tablet, and desktop devices

🧠 Technical Overview

Echo follows a client-driven real-time architecture where the frontend:

Emits events for:

Sending messages

Typing status

User presence

Listens for server-broadcast events to update UI instantly

Manages global socket state using React Context and hooks

Example event flow:

socket.emit("typing", { chatId, userId });
socket.emit("send_message", message);

socket.on("receive_message", handleNewMessage);
socket.on("user_online", updatePresence);
socket.on("user_offline", updatePresence);

This mirrors production-grade real-time systems used in collaborative applications.

🛠️ Tech Stack
Layer	Technology
Frontend	React
Language	TypeScript
Build Tool	Vite
Styling	CSS / Tailwind CSS
Real-Time	Socket.IO / WebSockets
📁 Project Structure (Simplified)
src/
├── components/
│   ├── MessageList.tsx
│   ├── MessageBubble.tsx
│   ├── TypingIndicator.tsx
│   └── ChatInput.tsx
├── context/
│   └── SocketContext.tsx
├── App.tsx
└── main.tsx
🔮 Planned Enhancements

🔐 Authentication (JWT / OAuth)

🧑‍🤝‍🧑 Group chats and rooms

📦 Message persistence

🔔 Notifications

📎 Media sharing

🌙 Dark mode

✅ Message delivery & read receipts

📄 License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2026 Victory Nwanoruo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
👤 Author

Victory Nwanoruo
Frontend Engineer | React & TypeScript Developer
