document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateLoan();
});

function calculateLoan() {
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    // Other variables...

    var details = {
        "Name": name,
        "Contact Number": contact,
        // Other details...
    };

    // Populate the loan details table
    var loanDetailsTable = document.getElementById('loanDetails');
    loanDetailsTable.innerHTML = ''; // Clear existing content

    for (var key in details) {
        if (details.hasOwnProperty(key)) {
            var row = loanDetailsTable.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent = key;
            cell2.textContent = details[key];
        }
    }

    // Hide the form and display the details
    document.getElementById('main').style.display = 'none';
    document.getElementById('detailForm').style.display = 'block';
}

function generatePDF() {
    // Create new jsPDF instance
    var doc = new jsPDF();

    // Add title to the PDF
    doc.text(20, 20, 'Loan Contract Details');

    // Get loan details table
    var loanDetailsTable = document.getElementById('loanDetails');

    // Loop through each row of the table and add to PDF
    var rows = loanDetailsTable.rows;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
            var cellText = cells[j].textContent.trim();
            doc.text(20, 30 + (i * 10), cellText);
        }
    }

    // Save the PDF
    doc.save('loan_contract.pdf');
}
