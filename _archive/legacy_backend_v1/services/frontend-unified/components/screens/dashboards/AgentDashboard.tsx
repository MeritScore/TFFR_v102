import React from 'react';
export const AgentDashboard = ({ agentId, onBack }: any) => <div className="p-8 text-white">Agent Dashboard: {agentId} <button onClick={onBack}>Back</button></div>;