const teaRatios = {
    hawt: 15,
    rabee: 13,
    manis: 16,
    abuJabal: 14,
    ceylani: 12
};

const waterInput = document.getElementById("waterAmount");
const teaSelect = document.getElementById("teaType");
const resultElement = document.getElementById("result");

// عناصر التنبيه المخصص
const customAlert = document.getElementById("customAlert");
const alertText = document.getElementById("alertText");

function calculateTea() {

    const waterAmount = parseFloat(waterInput.value);
    const teaType = teaSelect.value;

    if (!waterAmount || waterAmount <= 0) {
        resultElement.innerText = "0 غرام";
        customAlert.style.display = "none";
        return;
    }

    const ratio = teaRatios[teaType];
    const grams = (waterAmount / 1000) * ratio;
    const finalGrams = grams.toFixed(1);

    resultElement.innerText = finalGrams + " غرام";

    // تنبيه ذكي داخل الموقع
    if (parseFloat(finalGrams) > 30) {
        alertText.innerText = "متأكد؟ ممكن يصير ثقيل زيادة ☕";
        customAlert.style.display = "block";
    } else {
        customAlert.style.display = "none";
    }
}

// يحسب تلقائي عند التغيير
waterInput.addEventListener("input", calculateTea);
teaSelect.addEventListener("change", calculateTea);