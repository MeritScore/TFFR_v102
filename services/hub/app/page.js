import ChatInterface from '@/components/ChatInterface';

/**
 * THE FUN FAN REPORTER - HUB PAGE
 * 
 * In production, this data comes from the `ChatInitializationService`.
 * For now, we mock the "Handshake" JSON consistent with the Integration Plan.
 */
export default function Home() {

  // MOCK DATA: The "Handshake" from Backend
  const handshakeData = {
    user_profile: {
      uid: "user_hackathon_demo",
      username: "NeonRider",
      role: "VIP", // Shows the Gold Badge
      merit_score: 150,
      wallet_balance: 45000
    },
    zone_context: {
      zone_id: "sector_7",
      safety_alert: {
        severity: "high",
        message: "High congestion at Gate C. Use Gate D for faster entry."
      }
    },
    live_auction: {
      item_name: "SUPER BOWL MVP HELMET",
      end_time_epoch: Date.now() + 262000,
      current_bid: 1250
    }
  };

  return (
    <main>
      <ChatInterface initializationData={handshakeData} />
    </main>
  );
}
