// phone icon
 (function() {
    // Fully responsive widget control with smooth close/open and localstorage persistence
    const widget = document.getElementById('callWidget');
    const closeBtn = document.getElementById('closeWidgetBtn');
    const speechBubble = document.getElementById('speechBubble');
    const callIcon = document.getElementById('callIconBtn');

    // Check localStorage for widget state (closed or open)
    let isWidgetVisible = true;
    if (localStorage.getItem('supportWidgetClosed') === 'true') {
        isWidgetVisible = false;
        if (speechBubble) speechBubble.style.display = 'none';
    }

    // Function to close widget (hide bubble)
    function closeWidget() {
        if (speechBubble) {
            speechBubble.style.display = 'none';
            localStorage.setItem('supportWidgetClosed', 'true');
            isWidgetVisible = false;
        }
    }

    // Function to reopen widget (show bubble) – optional, triggered by clicking call icon if needed
    function openWidget() {
        if (speechBubble) {
            speechBubble.style.display = 'block';
            localStorage.setItem('supportWidgetClosed', 'false');
            isWidgetVisible = true;
        }
    }

    // Toggle: clicking on call icon reopens the widget if it was closed
    if (callIcon) {
        callIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isWidgetVisible || (speechBubble && speechBubble.style.display === 'none')) {
                openWidget();
            } else {
                // If bubble is visible, you could also navigate to contact, but we keep as expand.
                // Optionally scroll into view for better UX.
                if (speechBubble) speechBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Close button action
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWidget();
        });
    }

    // On window resize, ensure no overlapping issues (just enforce position)
    window.addEventListener('resize', function() {
        // simple reflow guard, but already CSS handles responsiveness.
        if (window.innerWidth <= 576 && speechBubble && speechBubble.style.display !== 'none') {
            // ensure bubble still visible and not offscreen, but default css handles.
        }
    });

})();