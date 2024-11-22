const loginForm = document.getElementsByTagName('form')[0]

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(e);
    const username = e.target[0].value;
    const password = e.target[1].value;
    
    const reqLogin = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            role: 'CUSTOMER',
        })
    })
    if(reqLogin.status === 200) {
        window.location = "http://localhost:5000";
    } else {
        const message = loginForm.getElementsByTagName('p')[0]
        message.style.display = 'flex';
    }
})