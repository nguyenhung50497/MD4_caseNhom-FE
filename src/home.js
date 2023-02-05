showHome();

function showList() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/albums',
        headers : {
            'Content-Type': 'application/json',
        },
        success: (data) => {
            let html = `
            <section class="trending-podcast-section section-padding" style="margin-top: -50px;">
                <div class="container">
                    <div class="row">

                        <center class="col-lg-12 col-12">
                            <div class="section-title-wrap">
                                <h4 class="section-title">Album</h4>
                            </div>
                        </center>`;
            data[0].map((item) => {
                html += `
                        <div class="col-lg-4 col-12 mt-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a class="btn" onclick="showAlbumDetail(${item.idAlbum})">
                                        <img src="${item.imageAlbum}" class="custom-block-image img-fluid"
                                            alt="${item.imageAlbum}">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a class="btn btn-outline-none text-primary" onclick="showAlbumDetail(${item.idAlbum})">
                                            ${item.nameAlbum}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">
                                        <p class="ms-3">
                                            <strong>${item.username}</strong>
                                            Let's listen to music
                                        </p>
                                    </div>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-headphones me-1">
                                            <span>${item.countSong}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
            })
            html += `</div>
                </div>
            </section>`;
            html += `
            <section class="latest-podcast-section section-padding pb-0" id="section_2" style="margin-top: -150px;">
                <div class="container">
                    <div class="row justify-content-center">

                        <center class="col-lg-12 col-12">
                            <div class="section-title-wrap">
                                <h4 class="section-title">Top 4 song</h4>
                            </div>
                        </center>`
            data[1].map((item) => {
                html += `<div class="col-lg-6 col-12 mt-4 mb-lg-0">
                            <div class="custom-block d-flex">
                                <div class="">
                                    <div class="custom-block-icon-wrap" style="width: 120px; height: 150px;">
                                        <div class="section-overlay"></div>
                                        <a class="custom-block-image-wrap btn">
                                            <img src="${item.image}" style="width: 100%; height: 100%;" alt="${item.image}">

                                            <a class="custom-block-icon btn">
                                                <i class="bi-play-fill"></i>
                                            </a>
                                        </a>
                                    </div>

                                    <center class="mt-2">
                                        <a class="btn custom-btn">
                                            Play
                                        </a>
                                    </center>
                                </div>

                                <div class="custom-block-info">
                                    <div class="custom-block-top d-flex mb-1">
                                        <small class="me-4 text-primary">
                                            <i class="bi-clock-fill custom-icon"></i>
                                            ${item.nameCategory} <span class="badge">${item.idCategory}</span>
                                        </small>
                                    </div>

                                    <h5 class="mb-2">
                                        <a>
                                            ${item.nameSong}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">

                                        <p class="ms-3">
                                            ${item.author}
                                            <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                            <strong>${item.singer}</strong>
                                        </p>
                                    </div>

                                    <p class="mb-0">Added by ${item.username}</p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-headphones me-2">
                                            <span>${item.count}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`
            });

            html +=`</div>
                </div>
            </section>`;
            $('#body').html(html);
        }
    })
}

function showHome() {
    let html = ``;
    $('#body').html(html);
    showList();
}

function showAlbumDetail(idAlbum) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/albums/my-album-detail/${idAlbum}`,
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token,
            },
            success: (data) => {
                if (data[0].length > 0) {
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">${data[0][0].nameAlbum}</h4>
                                </div>
                            </center>`
                data[0].map((item) => {
                    html += `<div class="col-lg-6 col-12 mt-4 mb-lg-0">
                                <div class="custom-block d-flex">
                                    <div class="">
                                        <div class="custom-block-icon-wrap" style="width: 120px; height: 150px;">
                                            <div class="section-overlay"></div>
                                            <a class="custom-block-image-wrap btn">
                                                <img src="${item.image}" style="width: 100%; height: 100%;" alt="${item.image}">

                                                <a class="custom-block-icon btn">
                                                    <i class="bi-play-fill"></i>
                                                </a>
                                            </a>
                                        </div>

                                        <center class="mt-2">
                                            <a class="btn custom-btn">
                                                Play
                                            </a>
                                        </center>
                                    </div>

                                    <div class="custom-block-info">
                                        <div class="custom-block-top d-flex mb-1">
                                            <small class="me-4 text-primary">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameCategory} <span class="badge">${item.idCategory}</span>
                                            </small>
                                        </div>

                                        <h5 class="mb-2">
                                            <a>
                                                ${item.nameSong}
                                            </a>
                                        </h5>

                                        <div class="profile-block d-flex">
                                            <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">

                                            <p class="ms-3">
                                                ${item.author}
                                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                                <strong>${item.singer}</strong>
                                            </p>
                                        </div>

                                        <p class="mb-0">Added by ${item.username}</p>

                                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                            <a href="#" class="bi-headphones me-2">
                                                <span>${item.count}</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column ms-auto">
                                        <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#deleteModal${item.idSong}">
                                            <i class="bi-x"></i>
                                        </button>

                                        <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#editModal${item.idSong}">
                                            <i class="bi-bookmark"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="deleteModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete???
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteSong(${item.idSong})">Yes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="editModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Song's name</span>
                                                <input type="text" class="form-control" id="nameSong${item.idSong}" value="${item.nameSong}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Singer</span>
                                                <input type="text" class="form-control" id="singer${item.idSong}" value="${item.singer}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Author</span>
                                                <input type="text" class="form-control" id="author${item.idSong}" value="${item.author}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Category</span>
                                                <select id="category${item.idSong}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                                    <option selected value="${item.idCategory}">${item.nameCategory}</option>
                                                    ${categories}
                                                </select>
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Image</span>
                                                <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.idSong})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <div id="imgDiv${item.idSong}"><image src="${item.image}" style="width: 100px;"></div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Song</span>
                                                <input type="file" id="fileButton" onchange="uploadSoundEdit(event, ${item.idSong})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <div id="soundDiv${item.idSong}"><audio src="${item.sound}"></audio></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editSong(${item.idSong}, ${item.idAlbum})">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#body').html(html);
                } else {
                    alert('Album have no song');
                    showMyAlbum();
                }
            }
        })
    } else {
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/albums/detail/${idAlbum}`,
            headers : {
                'Content-Type': 'application/json',
            },
            success: (data) => {
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">${data[0].nameAlbum}</h4>
                                </div>
                            </center>`
                data.map((item) => {
                    html += `<div class="col-lg-6 col-12 mt-4 mb-lg-0">
                                <div class="custom-block d-flex">
                                    <div class="">
                                        <div class="custom-block-icon-wrap" style="width: 120px; height: 150px;">
                                            <div class="section-overlay"></div>
                                            <a class="custom-block-image-wrap btn">
                                                <img src="${item.image}" style="width: 100%; height: 100%;" alt="${item.image}">

                                                <a class="custom-block-icon btn">
                                                    <i class="bi-play-fill"></i>
                                                </a>
                                            </a>
                                        </div>

                                        <center class="mt-2">
                                            <a class="btn custom-btn">
                                                Play
                                            </a>
                                        </center>
                                    </div>

                                    <div class="custom-block-info">
                                        <div class="custom-block-top d-flex mb-1">
                                            <small class="me-4 text-primary">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameCategory} <span class="badge">${item.idCategory}</span>
                                            </small>
                                        </div>

                                        <h5 class="mb-2">
                                            <a>
                                                ${item.nameSong}
                                            </a>
                                        </h5>

                                        <div class="profile-block d-flex">
                                            <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">

                                            <p class="ms-3">
                                                ${item.author}
                                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                                <strong>${item.singer}</strong>
                                            </p>
                                        </div>

                                        <p class="mb-0">Added by ${item.username}</p>

                                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                            <a href="#" class="bi-headphones me-2">
                                                <span>${item.count}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#body').html(html);
            }
        });
    };
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
            let html = `
            <section class="trending-podcast-section section-padding" style="margin-top: -50px;">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 col-12">
                            <center class="section-title-wrap">
                                <h4 class="section-title">My album</h4>
                            </center>
                        </div>`;
            data.map((item) => {
                html += `
                        <div class="col-lg-4 col-12 mt-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a class="btn" onclick="showAlbumDetail(${item.idAlbum})">
                                        <img src="${item.imageAlbum}" class="custom-block-image img-fluid"
                                            alt="${item.imageAlbum}">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a class="btn btn-outline-none text-primary" onclick="showAlbumDetail(${item.idAlbum})">
                                            ${item.nameAlbum}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">
                                        <p class="ms-3">
                                            <strong>${item.username}</strong>
                                            Let's listen to music
                                        </p>
                                    </div>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-headphones me-1">
                                            <span>${item.countSong}</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="social-share d-flex flex-column ms-auto">
                                    <a class="badge ms-auto btn" onclick="showFormAddSong(${item.idAlbum})">
                                        <i class="bi-plus"></i>
                                    </a>
            
                                    <a class="badge ms-auto btn" onclick="showFormEditAlbum(${item.idAlbum})">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                `;
            })
            html += `</div>
                </div>
            </section>`;
            
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
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Image Album</span>
                        <input type="file" id="fileButton" onchange="uploadImage(event)" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <div id="imgDiv"></div>
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
    let imageAlbum = localStorage.getItem('image');
    let album = {
        nameAlbum: nameAlbum,
        idUser: token.idUser,
        imageAlbum: imageAlbum
    }
    console.log(album);
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

function showMyPlaylist() {
    let token = JSON.parse(localStorage.getItem('token'));
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/playlists`,
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token,
            },
            success: (data) => {
                console.log(data);
                let html = `
            <section class="trending-podcast-section section-padding" style="margin-top: -50px;">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 col-12">
                            <center class="section-title-wrap">
                                <h4 class="section-title">My playlist</h4>
                            </center>
                        </div>`;
            data.map((item) => {
                html += `
                        <div class="col-lg-4 col-12 mt-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a class="btn" onclick="showPlaylistDetail(${item.idAlbum})">
                                        <img src="${item.imagePlaylist}" class="custom-block-image img-fluid"
                                            alt="${item.imagePlaylist}">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a class="btn btn-outline-none text-primary" onclick="showPlaylistDetail(${item.idPlaylist})">
                                            ${item.namePlaylist}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">
                                        <p class="ms-3">
                                            <strong>${item.username}</strong>
                                            Let's listen to music
                                        </p>
                                    </div>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-headphones me-1">
                                            <span></span>
                                        </a>
                                    </div>
                                </div>

                                <div class="social-share d-flex flex-column ms-auto">
                                    <a class="badge ms-auto btn">
                                        <i class="bi-plus"></i>
                                    </a>

                                    <a class="badge ms-auto btn" onclick="showFormEditPlaylist(${item.idAlbum})">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                `;
            })
            html += `</div>
                </div>
            </section>`;
            
            $('#body').html(html);
            }
        })
}

function showFormAddPlaylist() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/playlists',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = `
                <div class="container-fluid">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Name Playlist</span>
                        <input type="text" class="form-control" id="namePlaylist" placeholder="Name playlist" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <br>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Image Playlist</span>
                        <input type="file" id="fileButton" onchange="uploadImage(event)" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <div id="imgDiv"></div>
                    <br>
                    <button class="btn btn-primary" onclick="addPlaylist()">Save</button>
                </div>`;
            $('#body').html(html);
        }
    })
}

function showAllSong() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/songs',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">${data[0][0].nameAlbum}</h4>
                                </div>
                            </center>`
                data[0].map((item) => {
                    html += `<div class="col-lg-6 col-12 mt-4 mb-lg-0">
                                <div class="custom-block d-flex">
                                    <div class="">
                                        <div class="custom-block-icon-wrap" style="width: 120px; height: 150px;">
                                            <div class="section-overlay"></div>
                                            <a class="custom-block-image-wrap btn">
                                                <img src="${item.image}" style="width: 100%; height: 100%;" alt="${item.image}">

                                                <a class="custom-block-icon btn">
                                                    <i class="bi-play-fill"></i>
                                                </a>
                                            </a>
                                        </div>

                                        <center class="mt-2">
                                            <a class="btn custom-btn">
                                                Play
                                            </a>
                                        </center>
                                    </div>

                                    <div class="custom-block-info">
                                        <div class="custom-block-top d-flex mb-1">
                                            <small class="me-4 text-primary">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameCategory} <span class="badge">${item.idCategory}</span>
                                            </small>
                                        </div>

                                        <h5 class="mb-2">
                                            <a>
                                                ${item.nameSong}
                                            </a>
                                        </h5>

                                        <div class="profile-block d-flex">
                                            <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">

                                            <p class="ms-3">
                                                ${item.author}
                                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                                <strong>${item.singer}</strong>
                                            </p>
                                        </div>

                                        <p class="mb-0">Added by ${item.username}</p>

                                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                            <a href="#" class="bi-headphones me-2">
                                                <span>${item.count}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#body').html(html);
        }
    });
}

function showMySong() {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/songs/my-songs',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">${data[0][0].nameAlbum}</h4>
                                </div>
                            </center>`
                data[0].map((item) => {
                    html += `<div class="col-lg-6 col-12 mt-4 mb-lg-0">
                                <div class="custom-block d-flex">
                                    <div class="">
                                        <div class="custom-block-icon-wrap" style="width: 120px; height: 150px;">
                                            <div class="section-overlay"></div>
                                            <a class="custom-block-image-wrap btn">
                                                <img src="${item.image}" style="width: 100%; height: 100%;" alt="${item.image}">

                                                <a class="custom-block-icon btn">
                                                    <i class="bi-play-fill"></i>
                                                </a>
                                            </a>
                                        </div>

                                        <center class="mt-2">
                                            <a class="btn custom-btn">
                                                Play
                                            </a>
                                        </center>
                                    </div>

                                    <div class="custom-block-info">
                                        <div class="custom-block-top d-flex mb-1">
                                            <small class="me-4 text-primary">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameCategory} <span class="badge">${item.idCategory}</span>
                                            </small>
                                        </div>

                                        <h5 class="mb-2">
                                            <a>
                                                ${item.nameSong}
                                            </a>
                                        </h5>

                                        <div class="profile-block d-flex">
                                            <img src="${item.avatar}" alt="${item.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">

                                            <p class="ms-3">
                                                ${item.author}
                                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                                <strong>${item.singer}</strong>
                                            </p>
                                        </div>

                                        <p class="mb-0">Added by ${item.username}</p>

                                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                            <a href="#" class="bi-headphones me-2">
                                                <span>${item.count}</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column ms-auto">
                                        <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#deleteModal${item.idSong}">
                                            <i class="bi-x"></i>
                                        </button>
                                        <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#addToPlaylistModal${item.idSong}">
                                            <i class="bi-heart"></i>
                                        </button>
                                        <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#editModal${item.idSong}">
                                            <i class="bi-bookmark"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="deleteModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Select playlist</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete???
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteSong(${item.idSong})">Yes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="addToPlaylistModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <select id="idPlaylist" class="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="addToPlaylist(${item.idSong})">Add</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="editModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Song's name</span>
                                                <input type="text" class="form-control" id="nameSong${item.idSong}" value="${item.nameSong}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Singer</span>
                                                <input type="text" class="form-control" id="singer${item.idSong}" value="${item.singer}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Author</span>
                                                <input type="text" class="form-control" id="author${item.idSong}" value="${item.author}" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Category</span>
                                                <select id="category${item.idSong}" class="form-select" aria-label="Default select example" aria-describedby="addon-wrapping">
                                                    <option selected value="${item.idCategory}">${item.nameCategory}</option>
                                                    ${categories}
                                                </select>
                                            </div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Image</span>
                                                <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.idSong})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <div id="imgDiv${item.idSong}"><image src="${item.image}" style="width: 100px;"></div>
                                            <br>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">Song</span>
                                                <input type="file" id="fileButton" onchange="uploadSoundEdit(event, ${item.idSong})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                            </div>
                                            <div id="soundDiv${item.idSong}"><audio src="${item.sound}"></audio></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editSong(${item.idSong}, ${item.idAlbum})">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#body').html(html);
        }
    });
}

function addPlaylist() {
    let token = JSON.parse(localStorage.getItem('token'));
    let namePlaylist = $('#namePlaylist').val();
    let imagePlaylist = localStorage.getItem('image');
    let playlist = {
        namePlaylist: namePlaylist,
        idUser: token.idUser,
        imagePlaylist: imagePlaylist
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/playlists',
        data: JSON.stringify(playlist),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: () => {
            alert('Playlist added successfully');
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
    let nameSong = $('#nameSong').val();
    let singer = $('#singer').val();
    let author = $('#author').val();
    let idCategory = $('#category').val();
    let image = localStorage.getItem('image');
    let sound = localStorage.getItem('sound');
    let album = {
        nameSong: nameSong,
        singer: singer,
        author: author,
        idAlbum: idAlbum,
        idCategory: idCategory,
        image: image,
        sound: sound
    }
    $.ajax({
        type: "POST",
        url: `http://localhost:3000/songs`,
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Song added successfully');
            showAlbumDetail(data);
        }
    })
}

function deleteSong(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/songs/${id}`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Delete product successfully');
            showAlbumDetail(data);
        }
    })
}

function editSong(idSong, idAlbum) {
    let token = JSON.parse(localStorage.getItem('token'));
    let nameSong = $(`#nameSong${idSong}`).val();
    let singer = $(`#singer${idSong}`).val();
    let author = $(`#author${idSong}`).val();
    let image = localStorage.getItem('image');
    let sound = localStorage.getItem('sound');
    let idCategory = $(`#category${idSong}`).val();
    let album = {
        nameSong: nameSong,
        singer: singer,
        author: author,
        idAlbum: idAlbum,
        idCategory: idCategory,
        image: image,
        sound: sound
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/songs/${idSong}`,
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Edit product successfully');
            showAlbumDetail(data);
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
            document.getElementById(`imgDiv${id}`).innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 100px;">`;
            localStorage.setItem('image', downloadURL);
        });
}

function uploadSoundEdit(e, id) {
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
            document.getElementById(`soundDiv${id}`).innerHTML = `<audio src="${downloadURL}"></audio>`;
            localStorage.setItem('sound', downloadURL);
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
                <button id="register-link" onclick="showFormLogin()">Log In here</button>
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