let balance = 1000;
const portfolio = {};

// Helper function to update the balance
function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Buy stock function
function buyStock(company, priceId, changeId) {
    const priceElement = document.getElementById(priceId);
    const price = parseFloat(priceElement.textContent);

    if (balance >= price) {
        balance -= price;

        portfolio[company] = (portfolio[company] || 0) + 1;

        updateBalanceDisplay();
        updatePortfolio();

        adjustPrice(priceElement, changeId, 1); // Increase price by 1%
    } else {
        alert("Not enough balance to buy this stock!");
    }
}

// Sell stock function
function sellStock(company, priceId, changeId) {
    if (portfolio[company] > 0) {
        const priceElement = document.getElementById(priceId);
        const price = parseFloat(priceElement.textContent);

        balance += price;

        portfolio[company] -= 1;

        if (portfolio[company] === 0) {
            delete portfolio[company];
        }

        updateBalanceDisplay();
        updatePortfolio();

        adjustPrice(priceElement, changeId, -2); // Decrease price by 2%
    } else {
        alert("You don't own this stock!");
    }
}

// Adjust stock price and show trend
function adjustPrice(priceElement, changeId, percentage) {
    const currentPrice = parseFloat(priceElement.textContent);
    const newPrice = currentPrice * (1 + percentage / 100);

    priceElement.textContent = newPrice.toFixed(2);

    const changeElement = document.getElementById(changeId);
    changeElement.textContent = `${percentage > 0 ? '+' : ''}${percentage}%`;
    changeElement.className = percentage > 0 ? 'up' : 'down';
}

// Update portfolio display
function updatePortfolio() {
    const portfolioTable = document.getElementById('portfolioTable').querySelector('tbody');
    portfolioTable.innerHTML = '';

    for (const company in portfolio) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${company}</td>
            <td>${portfolio[company]}</td>
            <td>$${(portfolio[company] * document.getElementById(`${company.toLowerCase()}-price`).textContent).toFixed(2)}</td>
        `;

        portfolioTable.appendChild(row);
    }
}

// Initialize balance display
updateBalanceDisplay();
