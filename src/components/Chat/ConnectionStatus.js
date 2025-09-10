import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const ConnectionStatus = ({ connected }) => {
  const [show, setShow] = useState(false);
  const [wasConnected, setWasConnected] = useState(true);

  useEffect(() => {
    // Show status when connection changes
    if (wasConnected !== connected) {
      setShow(true);
      setWasConnected(connected);
      
      // Auto-hide after 3 seconds if connected
      if (connected) {
        const timer = setTimeout(() => {
          setShow(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [connected, wasConnected]);

  // Always show if disconnected
  useEffect(() => {
    setShow(!connected);
  }, [connected]);

  if (!show) return null;

  return (
    <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
      <div className="d-flex align-items-center">
        {connected ? (
          <>
            <Wifi size={16} className="me-2" />
            Connected
          </>
        ) : (
          <>
            <WifiOff size={16} className="me-2" />
            Disconnected
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;