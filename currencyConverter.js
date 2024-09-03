
    const dropDowns = document.querySelectorAll('.dropdown select');
    const flags = document.querySelectorAll('.select-container img');
    const msg = document.querySelector('#msg');
    const btn = document.querySelector('#btn');
    const amount = document.querySelector('.amount input');
    

    // Populate dropdown options
for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
}

// Add event listener to dropdowns to update flag on change
dropDowns.forEach((select) => {
    select.addEventListener('change', updateFlag);
});

function updateFlag() {
    // Get the selected country code from the dropdown
    let selectedCurrencyCode = this.value;
    // Get the corresponding country name
    let countryCode = countryList[selectedCurrencyCode];
    // Find the flag image associated with this dropdown
    let flagContainer = this.closest('.select-container');
    let flag = flagContainer.querySelector('img');
    // Update the flag image source
    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener('click', async (event) => {
    event.preventDefault();

    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    let from = document.querySelector('.from select');
    let fromVal = from.value;

    let to = document.querySelector('.to select');
    let toVal = to.value;

    const URL = `https://open.er-api.com/v6/latest/${fromVal}`;
    let response = await fetch(URL);
    let data = await response.json();

    let exchangeRate = data.rates[toVal];
    let convertedAmount = (amountVal * exchangeRate).toFixed(3); // Limit to 3 decimal places
    msg.textContent = `${amountVal}${fromVal} = ${convertedAmount}${toVal}`;
});
