fetch("http://localhost:3000/data",{method:'PUT'})
    .then(res=>res.json())
    .then(data=>console.log(data))