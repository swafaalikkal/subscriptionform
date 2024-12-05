const form = document.getElementById('form-submission');
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

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fname = fnameField.value.trim();
    const lname = lnameField.value.trim();
    const name = nameField.value;
    const username = document.getElementById('username').value.trim();
    const email = emailField.value.trim();
    const dob = dobField.value;
    const age = ageField.value;
    const description = document.getElementById('description').value.trim();
    const gender = document.getElementById('gender').value;
    const profilePicture = imageField.files[0];
    const mobile = contactField.value;
    const checkbox = document.getElementById('checkbox').checked;
    
    if (!fname || !lname || !username || !email || !dob || !mobile || !gender || !checkbox) {
        alert("Please fill all required fields.");
        event.preventDefault();
        return;
    }
        
    submitBtn.classList.add("d-none");
    loadingBtn.classList.remove("d-none");

    const formData = new FormData(form);

    formData.append("First Name", fname);
    formData.append("Last Name", lname);
    formData.append("Full Name", name);
    formData.append("User Name", username);
    formData.append("Email", email);
    formData.append("Date of Birth", dob);
    formData.append("Age", age);
    formData.append("Description", description);
    formData.append("Contact Number", mobile);
    formData.append("Gender", gender);
    if(profilePicture){
        formData.append("Profile Picture", profilePicture.name);
    }
    formData.append("Newsletter Subscription", checkbox);

    setTimeout(() => {
        alert("Your Information is Recorded");
        displayData(formData);
        form.reset();
        submitBtn.classList.remove("d-none");
        loadingBtn.classList.add("d-none");
    },5000);
})

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateMobile(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
}

function displayData(formData) {
    let jsonData = {};
    for (let [key, value] of formData.entries()) {
        console.log(key + " : " + value);
        jsonData[key] = value; 
    }

    console.log("JSON Data:", JSON.stringify(jsonData, null, 2));
}