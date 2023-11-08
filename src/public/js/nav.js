


async function logout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
        }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch('https://apirest.up.railway.app/sessions/logout', {method: 'POST'})
            return window.location.replace('https://apirest.up.railway.app/views/login')
        }})
  }
  
async function toPremium(id){
    Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: 'Congratulations!',
                text: 'You are now a premium user!, now you have to sign in again',
                icon: 'success',
                }).then(async () => {
                    await fetch(`https://apirest.up.railway.app/sessions/premium/${id}`, {method: 'POST'})
                    await fetch('https://apirest.up.railway.app/sessions/logout', {method: 'POST'})
                    window.location.replace('https://apirest.up.railway.app/views/login')
                })
                
            }
        })
    
}
