const formSubmission = document.getElementById('form-submission');
const submitBtn = document.getElementById('submit-btn');
const loadingBtn = document.getElementById('loading-btn')
const fnameField = document.getElementById('fname');
const lnameField = document.getElementById('lname');
const dobField = document.getElementById('dob');
const ageField = document.getElementById('age');
const emailField = document.getElementById('email');
const nameField = document.getElementById('fullname');
const contactField = document.getElementById('mobile');
const imageField = document.getElementById('picture');


fnameField.addEventListener('change', updateName);
lnameField.addEventListener('change', updateName);

function updateName() {
    const fname = fnameField.value.trim();
    const lname = lnameField.value.trim();
    nameField.value = `${fname} ${lname}`;
}



emailField.addEventListener('change',function() {
    const email = emailField.value.trim();
    if(!validateEmail(email)){
    alert('Enter a valid email');
    emailField.value = '';
    return;
    }
});

dobField.addEventListener('change',() => {
    const dob =dobField.value;
    const birthDate = new Date(dob);
    const today = new Date();
    const ageUpdate = today.getFullYear() - birthDate.getFullYear();
    ageField.value = ageUpdate;
});

contactField.addEventListener('change', () => {
    const contact = contactField.value;
    if(!validateMobile(contact)) {
        alert('Enter a valid mobile number');
        contactField.value = '';
        return;
    }
})

imageField.addEventListener('change',() => {
    var selectedFile = imageField.files[0];
    var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

    if (!allowedTypes.includes(selectedFile.type)) {
       alert('Invalid file type. Please upload a JPEG, PNG, or PDF file.');
       imageField.value = '';
    }
})



formSubmission.addEventListener('submit', async (event) => {

    event.preventDefault();
    
    if(!formSubmission.checkValidity()) {
        alert("Please fill in all required fields");
        return;
    }

    const fname = fnameField.value.trim();
    const lname = lnameField.value.trim();
    const name = nameField.value;
    const username = document.getElementById('username').value.trim();
    const email = emailField.value.trim();
    const dob = dobField.value;
    const age = ageField.value;
    const description = document.getElementById('description').value.trim();
    const gender = document.getElementById('gender').value;
    const ppicture = document.getElementById('picture').files[0];
    const mobile = contactField.value;
    

    const profile = { fname, lname, name, username, email , dob, age, description, gender, ppicture, mobile};
    

    submitBtn.classList.add("d-none");
    loadingBtn.classList.remove("d-none");


    setTimeout(() => {
        alert("Your Information is Recorded");
        displayForm(profile);
        formSubmission.reset();
        submitBtn.classList.remove("d-none");
        loadingBtn.classList.add("d-none");
    },5000);

});  



function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateMobile(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
}

function displayForm(profile) {
    let dataDisplayed = "";
    for (let [data , value] of Object.entries(profile)) {
        dataDisplayed += `${data} : ${value}\n`;
    }
    console.log(dataDisplayed);
}


// function saveForm(profile) {
//   const savedProfiles = JSON.parse(localStorage.getItem('Profiles')) || [];
//   savedProfiles.push(profile);
//   localStorage.setItem('Profiles', JSON.stringify(savedProfiles));
// }
