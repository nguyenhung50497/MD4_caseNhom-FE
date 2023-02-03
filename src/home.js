showHome();
function showList() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/products',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = ``;
            let categories = ``;
            data[1].map((item) => {
                categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
            })
            data[0].map((item) => {
                html += `
                        <div class="col-lg-3 mb-3">
                            <div class="card" style="width: 18rem;">
                                <img src="${item.image}" class="card-img-top" alt="${item.image}" style="height: 300px;">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text"><strong>Price:</strong> ${item.price} $</p>
                                    <p class="card-text"><strong>Category:</strong> ${item.nameCategory}</p>
                    `;
                if (token.role === 'admin') {
                    html += `
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${item.id}">Edit</button>
                            <div class="modal fade" id="editModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit ${item.name}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="input-group flex-nowrap">
                                            <span class="input-group-text" id="addon-wrapping">Name</span>
                                            <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                        </div>
                                        <br>
                                        <div class="input-group flex-nowrap">
                                            <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                            <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                        </div>
                                        <br>
                                        <div class="input-group flex-nowrap">
                                            <span class="input-group-text" id="addon-wrapping">Category</span>
                                            <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                                <option value="${item.idCategory}">${item.nameCategory}</option>
                                                ${categories}
                                            </select>
                                        </div>
                                        <br>
                                        <div class="input-group flex-nowrap">
                                            <span class="input-group-text" id="addon-wrapping">Image</span>
                                            <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                        </div>
                                        <br>
                                        <div class="input-group flex-nowrap">
                                            <span class="input-group-text" id="addon-wrapping">@</span>
                                            <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="editProduct(${item.id})">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${item.id}">Delete</button>
                            <div class="modal fade" id="deleteModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete???
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct(${item.id})">Yes</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>`;
                }
                else {
                    html += `
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buyModal${item.id}">Buy</button>
                        <div class="modal fade" id="buyModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Buy ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name</span>
                                        <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                        <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Category</span>
                                        <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                            <option value="${item.idCategory}">${item.nameCategory}</option>
                                            ${categories}
                                        </select>
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">@</span>
                                        <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="buyProduct(${item.id})">Confirm</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>`;
                }
            });
            $('#body').html(html);
        }
    })
}

function showHome() {
    let html = ``;
    $('#body').html(html);
    showList();
}

function showMyAlbum() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/albums/my-album',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = ``
            data.map((item) => {
                html += ` 
                <div class="container-fluid">
                    <div class="input-group flex-nowrap">
                        <h1>${item.nameAlbum}</h1>
                    </div>
                    <br>
                    <button class="btn btn-primary" onclick="showAlbumDetail(${item.idAlbum})">Detail</button>
                </div>
                `;
            })
            
            $('#body').html(html);
        }
    })
}

function showAlbumDetail() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/albums/`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = `
                <div class="container-fluid">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Name album</span>
                        <input type="text" class="form-control" id="nameAlbum" placeholder="Name album" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <button class="btn btn-primary" onclick="addAlbum()">Save</button>
                </div>`;
            $('#body').html(html);
        }
    })
}

function showFormAddAlbum() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/albums',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = `
                <div class="container-fluid">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Name album</span>
                        <input type="text" class="form-control" id="nameAlbum" placeholder="Name album" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <button class="btn btn-primary" onclick="addAlbum()">Save</button>
                </div>`;
            $('#body').html(html);
        }
    })
}

function addAlbum() {
    let token = JSON.parse(localStorage.getItem('token'));
    let nameAlbum = $('#nameAlbum').val();
    let album = {
        nameAlbum: nameAlbum,
        idUser: token.idUser
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/albums',
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: () => {
            alert('Album added successfully');
            showHome();
        }
    })
}

function showFormAddSong(idAlbum) {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/categories/',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let categories = ``;
            data.map((item) => {
                categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
            })
            let html = `
                <div class="container-fluid">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Song's name</span>
                        <input type="text" class="form-control" id="nameSong" placeholder="Song's name" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Singer</span>
                        <input type="text" class="form-control" id="singer" placeholder="Singer" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Author</span>
                        <input type="text" class="form-control" id="author" placeholder="Author" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Category</span>
                        <select id="category" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                            ${categories}
                        </select>
                    </div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Image</span>
                        <input type="file" id="fileButton" onchange="uploadImage(event)" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <div id="imgDiv"></div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Song</span>
                        <input type="file" id="fileButton" onchange="uploadSound(event)" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <div id="soundDiv"></div>
                    <br>
                    <button class="btn btn-primary" onclick="addSong(${idAlbum})">Save</button>
                </div>`;
            $('#body').html(html);
        }
    })
}

function addSong(idAlbum) {
    let token = JSON.parse(localStorage.getItem('token'));
    let nameAlbum = $('#nameAlbum').val();
    let singer = $('#singer').val();
    let author = $('#author').val();
    let idCategory = $('#category').val();
    let image = localStorage.getItem('image');
    let sound = localStorage.getItem('sound');
    let album = {
        nameAlbum: nameAlbum,
        singer: singer,
        author: author,
        idAlbum: idAlbum,
        idCategory: idCategory,
        image: image,
        sound: sound
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/songs',
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: () => {
            alert('Song added successfully');
            showHome();
        }
    })
}

function deleteProduct(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/products/${id}`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: () => {
            alert('Delete product successfully');
            showHome();
        }
    })
}

function editProduct(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    let name = $(`#name${id}`).val();
    let price = $(`#price${id}`).val();
    let image = localStorage.getItem('image');
    let category = $(`#category${id}`).val();
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/products/${id}`,
        data: JSON.stringify(product),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: () => {
            alert('Edit product successfully');
            showHome();
        }
    })
}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 500px;" id="image">`
            localStorage.setItem('image', downloadURL);
        });
}

function uploadSound(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('soundDiv').innerHTML = `<audio src="${downloadURL}"></audio>`
            localStorage.setItem('sound', downloadURL);
        });
}

function uploadImageEdit(e, id) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById(`imgDiv${id}`).innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 500px;">`;
            localStorage.setItem('image', downloadURL);
        });
}

function searchProduct(value) {
    let token = JSON.parse(localStorage.getItem('token'));
    let name = value.toLowerCase();
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/products/find-by-name?name=${name}`,
        data: JSON.stringify(name),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            console.log(data);
            let html = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th scope="col" colspan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>`;
            $('#body').html(html);
            let tbody = ``;
            let categories = ``;
            data[1].map((item) => {
                categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
            })
            data[0].map((item) => {
                tbody += `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.price} $</td>
                    <td><img src="${item.image}" alt="${item.image}" style="width: 200px;"></td>
                    <td>${item.nameCategory}</td>
                    `
                if (token.role === 'admin') {
                    tbody += `
                    <td>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${item.id}">Edit</button>
                        <div class="modal fade" id="editModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name</span>
                                        <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                        <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Category</span>
                                        <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                            <option value="${item.idCategory}">${item.nameCategory}</option>
                                            ${categories}
                                        </select>
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">@</span>
                                        <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="editProduct(${item.id})">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${item.id}">Delete</button>
                        <div class="modal fade" id="deleteModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete ${item.name}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete???
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct(${item.id})">Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>`;
                }
                else {
                    tbody += `
                    <td>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buyModal${item.id}">Buy</button>
                        <div class="modal fade" id="buyModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Buy ${item.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name</span>
                                        <input type="text" class="form-control" id="name${item.id}" value="${item.name}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Price ($)</span>
                                        <input type="text" class="form-control" id="price${item.id}" value="${item.price}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Category</span>
                                        <select id="category${item.id}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                            <option value="${item.idCategory}">${item.nameCategory}</option>
                                            ${categories}
                                        </select>
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.id})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">@</span>
                                        <div class="container-fluid" id="imgDiv${item.id}" aria-describedby="addon-wrapping"><img src="${item.image}" alt="${item.image}" style="width: 500px;"></div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="buyProduct(${item.id})">Confirm</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    `;
                }
            });
            $('#tbody').html(tbody);
        }
    })
}

function register() {
    let username = $('#username').val();
    let password = $('#password').val();
    let checkUsername = username.split('');
    let flagUsername = false;
    for (let i of checkUsername) {
        if (i === ' ') {
            flagUsername = true;
        }
    }
    let checkPassword = password.split('');
    let flagPassword = false;
    for (let i of checkPassword) {
        if (i === ' ') {
            flagPassword = true;
        }
    }
    if (checkUsername.length <= 0) {
        $('#alert').html(`<p class="text-danger">Please enter username</p>`);
    } else if (flagUsername === true) {
        $('#alert').html(`<p class="text-danger">Invalid username</p>`);
    }
    else if (password === '') {
        $('#alert').html(``);
        $('#existed').html(`<p class="text-danger">Please enter password</p>`);
    } else if (flagPassword === true) {
        $('#alert').html(``);
        $('#existed').html(`<p class="text-danger">Invalid password</p>`);
    } else {
        let user = {
            username: username,
            password: password
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/user/register',
            data: JSON.stringify(user),
            headers : {
                'Content-Type': 'application/json',
            },
            success: (user) => {
                if (user === 'Username already registered') {
                    $('#existed').html(`<p class="text-danger">Username already registered! Please try again</p>`);
                } else {
                    alert('Register successfully');
                    showFormLogin();
                }
            }
        })
    }
}

function showFormRegister() {
    $('#mainBody').html(`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="css/main.css">
        <div id="container-register">
            <div id="title">
                <i class="material-icons lock">lock</i> Register
            </div>

            <form>
                <!-- <div class="input">
                    <div class="input-addon">
                        <i class="material-icons">email</i>
                    </div>
                    <input id="email" placeholder="Email" type="email" required class="validate" autocomplete="off">
                </div> -->

                <div class="clearfix"></div>

                <div class="input">
                    <div class="input-addon">
                        <i class="material-icons">face</i>
                    </div>
                    <input id="username" placeholder="Username" type="text" required class="validate" autocomplete="off">
                </div>
                <p id="alert"  style="height: 10px;"></p>

                <div class="clearfix"></div>

                <div class="input">
                    <div class="input-addon">
                        <i class="material-icons">vpn_key</i>
                    </div>
                    <input id="password" placeholder="Password" type="password" required class="validate" autocomplete="off">
                </div>
                <div id="existed" style="height: 10px;"></div>
                <button type="button" class="btn btn-secondary mt-3" onclick="showBody()">Home</button>
                <button type="button" class="btn btn-secondary mt-3" onclick="register()">Register</button>
            </form>

            <div class="privacy">
                <a href="#">Privacy Policy</a>
            </div>

            <div class="register">
                Do you already have an account?
                <button id="register-link" onclick="showBody()">Log In here</button>
            </div>
        </div>
    `);
}

function login() {
    let username = $('#username').val();
    let password = $('#password').val();
    if (username === '') {
        $('#alert').html(`<p class="text-danger">Please enter username</p>`);
    }
    else if (password === '') {
        $('#alert').html(``);
        $('#wrongPass').html(`<p class="text-danger">Please enter password</p>`);
    } else {
        let user = {
            username: username,
            password: password
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/users/login',
            data: JSON.stringify(user),
            headers : {
                'Content-Type': 'application/json',
            },
            success: (token) => {
                if (token === 'Password is wrong') {
                    $('#wrongPass').html(`<p class="text-danger">Password is wrong! Please try again</p>`);
                } else if (token === 'User not found') {
                    $('#alert').html(`<p class="text-danger">User not found! Please try again</p>`);
                } else {
                    localStorage.setItem('token', JSON.stringify(token));
                    alert('Login successfully');
                    showBody();
                    showHome();
                }
            }
        })
    }
}

function logout() {
    localStorage.clear();
    showBody();
}

function showFormLogin() {
    $('#mainBody').html(`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <div id="container-login">
        <div id="title">
            <i class="material-icons lock">lock</i> Login
        </div>

        <form>
            <div class="input">
                <div class="input-addon">
                    <i class="material-icons">face</i>
                </div>
                <input id="username" name="username" placeholder="Username" type="text" required class="validate" autocomplete="off">
            </div>
            <p id="alert"  style="height: 10px;"></p>

            <div class="clearfix"></div>

            <div class="input">
                <div class="input-addon">
                    <i class="material-icons">vpn_key</i>
                </div>
                <input id="password" name="password" placeholder="Password" type="password" required class="validate" autocomplete="off">
            </div>
            <p id="wrongPass"  style="height: 10px;"></p>
            <button type="button" class="btn btn-secondary" onclick="showBody()">Home</button>
            <button type="button" class="btn btn-secondary" onclick="login()">Login</button>
        </form>

        <div class="privacy">
            <a href="#">Privacy Policy</a>
        </div>

        <div class="register">
            Don't have an account yet?
            <button id="register-link" onclick="showFormRegister()">Register here</button>
        </div>
    </div>
    `);
}