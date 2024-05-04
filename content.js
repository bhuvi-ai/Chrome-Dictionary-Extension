function getDefinition(selectedText) {
    // Send selected text to Flask server
    fetch('http://localhost:5000/getDefinitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                words: [selectedText]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch definition');
            }
            return response.json();
        })
        .then(data => {
            // Remove existing popovers
            const existingPopover = document.getElementById('definition-popover');
            if (existingPopover) {
                existingPopover.remove();
            }

            // Create a popover to display the definitions
            const popover = document.createElement('div');
            popover.id = 'definition-popover';

            // Create an unordered list to hold the definitions
            const list = document.createElement('ul');

            // Append each word and its definition as list items
            Object.entries(data).forEach(([word, definition]) => {
                const listItem = document.createElement('li');
                listItem.style.margin = '10px 10px';
                listItem.style.padding = '6px';
                listItem.innerHTML = `<p>This is Our First Dict</p>`;
                listItem.innerHTML = `<strong>${word} :</strong> ${definition}`;

                list.appendChild(listItem);
            });
            const para = document.createElement('p');
            para.style.fontSize = '25px';
            para.style.boxshadow = ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            para.style.padding = '0 30% 0 30% ';
            para.textContent = 'Dictionary';
            para.style.fontWeight = "bold";
            para.style.color = 'black';





            const btn = document.createElement('button');
            btn.textContent = 'Read More';

            // btn.addEventListener('click', function() {
            //     window.location.href = ('http://localhost:5000/index');
            // });

            btn.addEventListener('click', function() {
                // window.open('http://localhost:5000/index', '_blank');
                window.open(`http://localhost:5000/index?word=${encodeURIComponent(selectedText)}`, '_blank');
            });
            // document.addEventListener('DOMContentLoaded', function() {
            //     var myButton = document.getElementById('myButton');
            //     myButton.addEventListener('click', function() {
            //         chrome.tabs.create({ url: 'http://localhost:5000/index' });
            //     });
            // });



            popover.appendChild(para);
            popover.appendChild(list);
            popover.appendChild(btn);

            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const topOffset = rect.top + window.pageYOffset;
            if (topOffset > window.innerHeight / 2) {
                popover.style.top = (topOffset - popover.offsetHeight - 10) + 'px';
            } else {
                // Position below the selected text
                popover.style.top = (topOffset + rect.height + 10) + 'px';
            }

            popover.style.left = (rect.left + window.pageXOffset) + 'px';

            // Append the popover to the document body
            document.body.appendChild(popover);

            // Close the popover when clicked outside
            document.addEventListener('mousedown', function(event) {
                if (!popover.contains(event.target)) {
                    popover.remove();
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Listen for text selection events
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
        getDefinition(selectedText);
    }
});