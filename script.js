class KalkulatorBMI {
  constructor(bmiElementId, descElementId, formElementSelector) {
    this.bmiText = document.getElementById(bmiElementId);
    this.descText = document.getElementById(descElementId);
    this.form = document.querySelector(formElementSelector);
    this.form.addEventListener("submit", this.onFormSubmit.bind(this));
    this.form.addEventListener("reset", this.onFormReset.bind(this));
  }

  onFormReset() {
    this.bmiText.textContent = 0;
    this.bmiText.className = "";
    this.descText.textContent = "N/A";
  }

  onFormSubmit(e) {
    e.preventDefault();

    const weight = parseFloat(this.form.weight.value);
    const height = parseFloat(this.form.height.value);

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Harap isi berat dan tinggi Anda.");
      return;
    }

    const heightInMeters = height / 100; // cm -> m
    const bmi = weight / Math.pow(heightInMeters, 2);
    const desc = this.interpretBMI(bmi);

    this.bmiText.textContent = bmi.toFixed(2);
    this.bmiText.className = desc;
    this.descText.innerHTML = `Anda memiliki indeks massa tubuh <strong>${desc}</strong>.<a href="" id="recommendationLink">Rekomendasi makanan dan pola hidup sehat</a>`;

    const recommendationLink = document.getElementById("recommendationLink");
    recommendationLink.addEventListener("click", this.showRecommendations.bind(this));
  }

  showRecommendations(e) {
    e.preventDefault();
    const menuSection = document.querySelector(".menu");
    menuSection.scrollIntoView({ behavior: "smooth" });
  }

  interpretBMI(bmi) {
    if (bmi < 18.5) {
      return "kurang berat badan";
    } else if (bmi < 25) {
      return "sehat";
    } else if (bmi < 30) {
      return "kelebihan berat badan";
    } else {
      return "obesitas";
    }
  }
}

const kalkulator = new KalkulatorBMI("bmi", "desc", "form");
