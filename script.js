let container = document.getElementById("container");
container.innerHTML = `<div class="text-center py-3">
                        <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>`;

function getApi(api) {
    let element = document.getElementById("row");
    fetch(api)
        .then(res => res.json())
        .then(res => {
            let data = render(res);
            if (data == '') {
                element.innerHTML = "<div class='alert alert-danger' role='alert'>News not available</div > ";
            } else {
                element.innerHTML = data;
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            container.innerHTML = '';
        });
}

function render(result) {
    let div = '';
    result.articles.forEach(data => {
        if (data.description == null) {
            data.description = "....";
        }
        div += `
            <div class="col d-flex justify-content-center py-2">
                <div class="card" style="width: 18rem;">
                    <img src="${data.urlToImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <a href="#" class="btn btn-primary">Read More...</a>
                    </div>
                </div>
            </div>
        `;
    });
    return div;
}

let u = 'https://newsapi.org/v2/top-headlines?';
let q = 'q=&';
let c = 'country=us&';
let ak = 'apiKey=d4c14ef9e6504f48b095da1191dee657';
let api = u + q + c + ak;
getApi(api);

// loading

document.getElementById("search").addEventListener('input', (e) => {
    let container = document.getElementById("container");
    container.innerHTML = `<div class="text-center py-3">
                        <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>`;
    let q = `q=${this.search.value}&`;
    getApi(u + q + c + ak);
});