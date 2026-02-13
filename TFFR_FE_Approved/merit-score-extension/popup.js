document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userDisplay = document.getElementById('user-display');
    const views = {
        login: document.getElementById('view-login'),
        home: document.getElementById('view-home'),
        search: document.getElementById('view-search'),
        requests: document.getElementById('view-requests')
    };
    const inputs = {
        handle: document.getElementById('input-handle'),
        search: document.getElementById('input-search')
    };
    const buttons = {
        login: document.getElementById('btn-login'),
        request: document.getElementById('btn-request')
    };
    const navButtons = document.querySelectorAll('.nav-btn');
    const requestStatus = document.getElementById('request-status');
    const lists = {
        requests: document.getElementById('list-requests')
    };

    // State
    let currentUser = null;

    // Initialize
    loadUser();

    // Event Listeners
    buttons.login.addEventListener('click', handleLogin);
    // Dynamic binding for request button is better, but for now lets bind the main check
    document.getElementById('btn-check').addEventListener('click', handleCheckAccess);

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            if (currentUser) switchView(targetId);
        });
    });

    // core LOGIC
    function loadUser() {
        chrome.storage.local.get(['currentUser'], (result) => {
            if (result.currentUser) {
                currentUser = result.currentUser;
                userDisplay.textContent = currentUser;
                switchView('view-home');
                loadRequests();
            } else {
                switchView('view-login');
            }
        });
    }

    function handleLogin() {
        const handle = inputs.handle.value.trim();
        if (handle) {
            const formattedHandle = handle.startsWith('@') ? handle : '@' + handle;
            currentUser = formattedHandle;

            chrome.storage.local.set({ currentUser: formattedHandle }, () => {
                userDisplay.textContent = currentUser;
                switchView('view-home');
            });
        }
    }

    function switchView(viewId) {
        // Hide all
        Object.values(views).forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });

        // Show target
        const target = document.getElementById(viewId);
        target.classList.remove('hidden');
        target.classList.add('active');

        // Update Nav
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === viewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (viewId === 'view-requests') loadRequests();
    }

    // SIMULATED NETWORK LOGIC
    // In a real app, this would hit an API. Here we simulate "Shared State" via local storage
    // effectively acting as a "Server" for this single browser instance.

    function handleCheckAccess() {
        const targetHandle = inputs.search.value.trim();
        if (!targetHandle) return;
        const formattedTarget = targetHandle.startsWith('@') ? targetHandle : '@' + targetHandle;
        const resultBox = document.getElementById('search-result');

        resultBox.classList.remove('hidden');
        resultBox.innerHTML = '<div style="color:#888">Checking blockchain permissions...</div>';

        chrome.storage.local.get(['approvedViewers', 'pendingRequests'], (result) => {
            const approved = result.approvedViewers || {};
            const requests = result.pendingRequests || [];

            // Check if currentUser is in the target's approved list
            // Structure: approved[TargetUser] = [ViewerA, ViewerB]
            const isApproved = approved[formattedTarget] && approved[formattedTarget].includes(currentUser);

            setTimeout(() => {
                if (isApproved) {
                    // SHOW SCORE
                    // In a real app, fetch from API. Here, random mock.
                    const mockScore = Math.floor(Math.random() * (800 - 600) + 600);
                    resultBox.innerHTML = `
                        <div style="font-size:40px; color:#39ff14; font-weight:bold; margin:10px 0;">${mockScore}</div>
                        <div style="color:#00ffff">ACCESS GRANTED</div>
                        <div style="font-size:12px; color:#888">TFFR Level for ${formattedTarget}</div>
                    `;
                } else {
                    // CHECK IF PENDING
                    const isPending = requests.some(r => r.from === currentUser && r.to === formattedTarget);

                    if (isPending) {
                        resultBox.innerHTML = `
                            <div style="color:#ffcc00; margin:10px 0;">PENDING APPROVAL</div>
                            <div style="font-size:12px; color:#888">Request sent to ${formattedTarget}. Waiting for response.</div>
                        `;
                    } else {
                        // SHOW REQUEST BUTTON
                        resultBox.innerHTML = `
                            <div style="color:#ff0055; margin:10px 0;">ACCESS DENIED</div>
                            <div style="font-size:12px; color:#888; margin-bottom:10px;">You do not have permission to view this score.</div>
                            <button id="btn-send-request" class="btn-primary">REQUEST ACCESS</button>
                        `;
                        document.getElementById('btn-send-request').addEventListener('click', () => sendRequest(formattedTarget));
                    }
                }
            }, 800); // Fake latency
        });
    }

    function sendRequest(targetHandle) {
        const resultBox = document.getElementById('search-result');

        chrome.storage.local.get(['pendingRequests'], (result) => {
            let requests = result.pendingRequests || [];

            requests.push({
                from: currentUser,
                to: targetHandle,
                status: 'PENDING',
                timestamp: Date.now()
            });

            chrome.storage.local.set({ pendingRequests: requests }, () => {
                resultBox.innerHTML = `
                    <div style="color:#39ff14; margin:10px 0;">REQUEST SENT</div>
                    <div style="font-size:12px; color:#888">Notification dispatched to ${targetHandle}.</div>
                `;
            });
        });
    }

    function loadRequests() {
        chrome.storage.local.get(['pendingRequests'], (result) => {
            const requests = result.pendingRequests || [];

            // Filter requests sent TO the current user
            const myRequests = requests.filter(req => req.to === currentUser && req.status === 'PENDING');

            lists.requests.innerHTML = '';

            if (myRequests.length === 0) {
                lists.requests.innerHTML = '<li class="empty-state">No pending requests.</li>';
                return;
            }

            myRequests.forEach((req) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>
                        <strong style="color:white">${req.from}</strong>
                    </span>
                    <div>
                        <button class="action-btn btn-approve" data-from="${req.from}">✓</button>
                        <button class="action-btn btn-deny" data-from="${req.from}">✕</button>
                    </div>
                `;
                lists.requests.appendChild(li);
            });

            // Attach listeners to dynamic buttons
            document.querySelectorAll('.btn-approve').forEach(btn => {
                btn.addEventListener('click', (e) => resolveRequest(e.target.getAttribute('data-from'), 'APPROVED'));
            });
            document.querySelectorAll('.btn-deny').forEach(btn => {
                btn.addEventListener('click', (e) => resolveRequest(e.target.getAttribute('data-from'), 'DENIED'));
            });
        });
    }

    function resolveRequest(requesterHandle, decision) {
        chrome.storage.local.get(['pendingRequests', 'approvedViewers'], (result) => {
            let requests = result.pendingRequests || [];
            let approved = result.approvedViewers || {}; // Map: { "MyHandle": ["ViewerA", "ViewerB"] }

            // Remove from pending
            // Only remove the specific request from this requester to this user
            const updatedRequests = requests.filter(req => !(req.to === currentUser && req.from === requesterHandle));

            // If approved, add to approved list
            if (decision === 'APPROVED') {
                if (!approved[currentUser]) approved[currentUser] = [];
                if (!approved[currentUser].includes(requesterHandle)) {
                    approved[currentUser].push(requesterHandle);
                }
            }

            chrome.storage.local.set({
                pendingRequests: updatedRequests,
                approvedViewers: approved
            }, () => {
                loadRequests(); // Refresh UI
                // limit alert to avoid popup blocking
                console.log(`Request from ${requesterHandle} was ${decision}`);
            });
        });
    }
});
