import React, { useRef } from 'react';

const socketUrl = 'wss://app.openhome.xyz/websocket/shared-personality?token=eyJ1c2VyX2lkIjoxLCJwZXJzb25hbGl0eV9pZCI6MzEwNiwiZXhwaXJlc190aW1lIjpudWxsfQ.Z0B7yA.ISehLPk6tuQ1w0xU6En1gBXlvCA&demo=true';

const useWebSocket = () => {
  const socketRef = useRef(null);

  const connectSocket = () => {
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    }; 
     
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not open');
    }
  };

  return { connectSocket, disconnectSocket, sendMessage };
};

export default useWebSocket;
