const networkController = {
    getGraph: async (req, res) => {
        // Return mock graph data for now, or read from connections table
        res.json({
            nodes: [
                { id: "1", label: "You", group: "user" },
                { id: "2", label: "Agent Assi", group: "agent" },
                { id: "3", label: "Agent Desy", group: "agent" }
            ],
            edges: [
                { from: "1", to: "2" },
                { from: "1", to: "3" }
            ]
        });
    }
};

module.exports = networkController;
