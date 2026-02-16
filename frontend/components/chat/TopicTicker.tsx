import React from 'react';
export const TopicTicker = ({ topic }: any) => topic ? (
  <div className="bg-cyber-purple/20 border-b border-cyber-purple/30 p-2 text-center text-cyber-purple font-mono text-xs animate-pulse">
    TRENDING TOPIC: #{topic}
  </div>
) : null;