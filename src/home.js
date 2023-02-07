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
            let playlistAudio = {};
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
                            <div class="container">
                                <audio id="my_audio" controls preload="none">
                                    <source src="" type="audio/mp3">
                                </audio>
                            </div>
                            <div class="container">
                                <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                            </div>
                        </center>`
            data[1].map((item, index) => {
                playlistAudio['song_'+item.idSong] = item.sound;
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
                                        <audio controls>
                                            <source src="${item.sound}" type="audio/mp3">
                                        </audio>
                                    </div>
                                </div>
                            </div>
                        </div>`
            });

            html +=`</div>
                </div>
            </section>
            <script> 
                let playlistAudio = ${JSON.stringify(playlistAudio)};
                $("#my_audio").trigger('load');
                keys = Object.keys(playlistAudio);
                $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                $('#my_audio').on('ended', function() { 
                    count++;  
                    $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                    $("#my_audio").trigger('load');
                    play_audio('play');
                });
                function play_audio(task) {
                    if(task == 'play'){
                        $("#my_audio").trigger('play');
                    }
                    if(task == 'stop'){
                        $("#my_audio").trigger('pause');
                        $("#my_audio").prop("currentTime",0);
                    }
                }
            </script>`;
            $('#body').html(html);
        }
    })
}

function showHome() {
    let html = ``;
    $('#body').html(html);
    $('#searchSong').html(html);
    $('#showUsers').html(html);
    $('#playlist').html(html);
    showList();
}

function showAlbumDetail(idAlbum) {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
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
                let playlistAudio = {};
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
                                <div class="container">
                                    <audio id="my_audio" controls preload="none">
                                        <source src="" type="audio/mp3">
                                    </audio>
                                </div>
                                <div class="container">
                                    <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                    <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                                </div>
                            </center>`
                data[0].map((item) => {
                    playlistAudio['song_'+item.idSong] = item.sound;
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
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
                </section>
                <script> 
                    let playlistAudio = ${JSON.stringify(playlistAudio)};
                    $("#my_audio").trigger('load');
                    keys = Object.keys(playlistAudio);
                    $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                    $('#my_audio').on('ended', function() { 
                        count++;  
                        $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                        $("#my_audio").trigger('load');
                        play_audio('play');
                    });
                    function play_audio(task) {
                        if(task == 'play'){
                            $("#my_audio").trigger('play');
                        }
                        if(task == 'stop'){
                            $("#my_audio").trigger('pause');
                            $("#my_audio").prop("currentTime",0);
                        }
                    }
                </script>`;
                $('#body').html(html);
                } else {
                    alert('Album have no song');
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
                console.log(data);
                if (data[0].length > 0) {
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#body').html(html);
            } else {
                alert('Album have no song');
            }
            }
        });
    };
}

function showMyAlbum() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
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
            
                                    <a class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#editModal${item.idAlbum}">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="editModal${item.idAlbum}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit ${item.nameAlbum}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name album</span>
                                        <input type="text" class="form-control" id="nameAlbum" value="${item.nameAlbum}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image Album</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.idAlbum})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div id="imgDiv${item.idAlbum}"><image src="${item.imageAlbum}" style="width: 200px; border-radius: 5%;"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="editAlbum(${item.idAlbum})">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>`;
            })
            html += `</div>
                </div>
            </section>`;
            
            $('#body').html(html);
        }
    })
}

function editAlbum(idAlbum) {
    let token = JSON.parse(localStorage.getItem('token'));
    let nameAlbum = $(`#nameAlbum${idAlbum}`).val();
    let imageAlbum = localStorage.getItem('image');
    let album = {
        nameAlbum: nameAlbum,
        imageAlbum: imageAlbum
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/albums/${idAlbum}`,
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Edit album successfully');
            showMyAlbum();
        }
    })
}

function showFormAddAlbum() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
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
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/playlists`,
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
                                <h4 class="section-title">My playlist</h4>
                            </center>
                        </div>`;
            data.map((item) => {
                html += `
                        <div class="col-lg-4 col-12 mt-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a class="btn" onclick="showPlaylistDetail(${item.idPlaylist})">
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
                                            <span>${item.countSongPlaylist}</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="social-share d-flex flex-column ms-auto">
                                    <a class="badge ms-auto btn">
                                        <i class="bi-plus"></i>
                                    </a>

                                    <a class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#editModal${item.idPlaylist}">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="editModal${item.idPlaylist}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit ${item.namePlaylist}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Name playlist</span>
                                        <input type="text" class="form-control" id="namePlaylist" value="${item.namePlaylist}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div class="input-group flex-nowrap">
                                        <span class="input-group-text" id="addon-wrapping">Image Album</span>
                                        <input type="file" id="fileButton" onchange="uploadImageEdit(event, ${item.idPlaylist})" class="form-control" placeholder="Image" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <div id="imgDiv${item.idPlaylist}"><image src="${item.imagePlaylist}" style="width: 200px; border-radius: 5%;"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="editPlaylist(${item.idPlaylist})">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                `;
            })
            html += `</div>
                </div>
            </section>`;
            $('#playlist').html(html);
            }
        })
}

function editPlaylist(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    let namePlaylist = $(`#namePlaylist${id}`).val();
    let imagePlaylist = localStorage.getItem('image');
    let playlist = {
        namePlaylist: namePlaylist,
        imagePlaylist: imagePlaylist
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/playlists/${id}`,
        data: JSON.stringify(playlist),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Edit playlist successfully');
            showMyPlaylist();
        }
    })
}

function showPlaylistDetail(idPlaylist) {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/playlistDetails/my-playlist-detail/${idPlaylist}`,
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token,
            },
            success: async (data) => {
                let playlistAudio = {};
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap mb-2">
                                    <h4 class="section-title">${data[0].namePlaylist}</h4>
                                </div>
                                <div class="container">
                                    <audio id="my_audio" controls preload="none">
                                        <source src="" type="audio/mp3">
                                    </audio>
                                </div>
                                <div class="container">
                                    <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                    <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                                </div>
                            </center>`
                data.map((item) => {
                    playlistAudio['song_'+item.idSong] = item.sound;
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                });
                html +=`</div>
                    </div>
                </section>
                <script> 
                    let playlistAudio = ${JSON.stringify(playlistAudio)};
                    $("#my_audio").trigger('load');
                    keys = Object.keys(playlistAudio);
                    $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                    $('#my_audio').on('ended', function() { 
                        count++;  
                        $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                        $("#my_audio").trigger('load');
                        play_audio('play');
                    });
                    function play_audio(task) {
                        if(task == 'play'){
                            $("#my_audio").trigger('play');
                        }
                        if(task == 'stop'){
                            $("#my_audio").trigger('pause');
                            $("#my_audio").prop("currentTime",0);
                        }
                    }
                </script>`;
                $('#body').html(html);
            }
        })
}

function showFormAddPlaylist() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
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
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/songs',
        headers : {
            'Content-Type': 'application/json',
        },
        success: (data) => {
            let playlistAudio = {};
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
                                    <h4 class="section-title">All song</h4>
                                </div>
                                <div class="container">
                                    <audio id="my_audio" controls preload="none">
                                        <source src="" type="audio/mp3">
                                    </audio>
                                </div>
                                <div class="container">
                                    <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                    <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                                </div>
                            </center>`
                data[0].map((item) => {
                    playlistAudio['song_'+item.idSong] = item.sound;
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
                                            <small class="me-4 text-danger">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameAlbum}
                                            </small>
                                            <small class="me-4 text-primary">
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>
                <script> 
                    let playlistAudio = ${JSON.stringify(playlistAudio)};
                    $("#my_audio").trigger('load');
                    keys = Object.keys(playlistAudio);
                    $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                    $('#my_audio').on('ended', function() { 
                        count++;  
                        $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                        $("#my_audio").trigger('load');
                        play_audio('play');
                    });
                    function play_audio(task) {
                        if(task == 'play'){
                            $("#my_audio").trigger('play');
                        }
                        if(task == 'stop'){
                            $("#my_audio").trigger('pause');
                            $("#my_audio").prop("currentTime",0);
                        }
                    }
                </script>`;
                $('#body').html(html);
        }
    });
}

function showAllSongUser() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/songs/users',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let playlistAudio = {};
                let button = ``;
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let playlists = ``;
                if (data[2]) {
                    data[2].map((item) => {
                        playlists += `<option value="${item.idPlaylist}">${item.namePlaylist}</option>`
                    })
                }
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">All song</h4>
                                </div>
                                <div class="container">
                                    <audio id="my_audio" controls preload="none">
                                        <source src="" type="audio/mp3">
                                    </audio>
                                </div>
                                <div class="container">
                                    <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                    <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                                </div>
                            </center>`
                data[0].map((item) => {
                    playlistAudio['song_'+item.idSong] = item.sound;
                    if (token) {
                        if (token.role === 'user') {
                            button = `
                            <div class="d-flex flex-column ms-auto">
                                <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#addToPlaylistModal${item.idSong}">
                                    <i class="bi-heart"></i>
                                </button>
                            </div>`
                        } else {
                            button = `
                            <div class="d-flex flex-column ms-auto">
                                <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#deleteModal${item.idSong}">
                                    <i class="bi-x"></i>
                                </button>
                            </div>`
                        }
                    }
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
                                            <small class="me-4 text-danger">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameAlbum}
                                            </small>
                                            <small class="me-4 text-primary">
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
                                        </div>

                                    </div>
                                    ${button}
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
                            <div class="modal fade" id="addToPlaylistModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Select playlist to add song ${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <select id="idPlaylist" class="form-select" aria-label="Default select example">
                                            ${playlists}
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="addToPlaylist(${item.idSong})">Add</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>
                <script> 
                    let playlistAudio = ${JSON.stringify(playlistAudio)};
                    $("#my_audio").trigger('load');
                    keys = Object.keys(playlistAudio);
                    $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                    $('#my_audio').on('ended', function() { 
                        count++;  
                        $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                        $("#my_audio").trigger('load');
                        play_audio('play');
                    });
                    function play_audio(task) {
                        if(task == 'play'){
                            $("#my_audio").trigger('play');
                        }
                        if(task == 'stop'){
                            $("#my_audio").trigger('pause');
                            $("#my_audio").prop("currentTime",0);
                        }
                    }
                </script>`;
                $('#body').html(html);
        }
    });
}

function showMySong() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/songs/my-songs',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
                let playlistAudio = {};
                let html = ``;
                if  (data[0] === 'No songs found') {
                    $('#body').html("No songs found");
                } else {
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let playlists = ``;
                data[2].map((item) => {
                    playlists += `<option value="${item.idPlaylist}">${item.namePlaylist}</option>`
                })
                html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">My song</h4>
                                </div>
                                <div class="container">
                                    <audio id="my_audio" controls preload="none">
                                        <source src="" type="audio/mp3">
                                    </audio>
                                </div>
                                <div class="container">
                                    <button class="btn btn-primary" onclick="play_audio('play')">PLAY</button>
                                    <button class="btn btn-danger" onclick="play_audio('stop')">STOP</button>
                                </div>
                            </center>`
                data[0].map((item) => {
                    playlistAudio['song_'+item.idSong] = item.sound;
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
                                            <small class="me-4 text-danger">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameAlbum}
                                            </small>
                                            <small class="me-4 text-primary">
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
                                            <audio controls>
                                                <source src="${item.sound}" type="audio/mp3">
                                            </audio>
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
                            <div class="modal fade" id="addToPlaylistModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Select playlist to add song ${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <select id="idPlaylist" class="form-select" aria-label="Default select example">
                                            ${playlists}
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
                                            <br>
                                            <div id="imgDiv${item.idSong}"><image src="${item.image}" style="width: 200px; border-radius: 5%;"></div>
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
                </section>
                <script> 
                    let playlistAudio = ${JSON.stringify(playlistAudio)};
                    $("#my_audio").trigger('load');
                    keys = Object.keys(playlistAudio);
                    $('#my_audio').append("<source id='sound_src' src=" + playlistAudio[keys[0]] + " type='audio/mp3'>");count = 0; 
                    $('#my_audio').on('ended', function() { 
                        count++;  
                        $("#sound_src").attr("src", playlistAudio[keys[count]])[0];
                        $("#my_audio").trigger('load');
                        play_audio('play');
                    });
                    function play_audio(task) {
                        if(task == 'play'){
                            $("#my_audio").trigger('play');
                        }
                        if(task == 'stop'){
                            $("#my_audio").trigger('pause');
                            $("#my_audio").prop("currentTime",0);
                        }
                    }
                </script>`;
                $('#body').html(html);
                }
        }
    });
}

function addToPlaylist(idSong) {
    let token = JSON.parse(localStorage.getItem('token'));
    let idPlaylist = $('#idPlaylist').val();
    if (idPlaylist) {
        let playlistDetail = {
            idPlaylist: idPlaylist,
            idSong: idSong
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/playlistDetails',
            data: JSON.stringify(playlistDetail),
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.token,
            },
            success: (data) => {
                if (data) {
                    alert('Add song to playlist successfully');
                } else {
                    alert('Song is existed in playlist');
                }
            }
        })
    } else {
        alert('No playlist found! Please create playlist!');
    }
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
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
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
                    <br>
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
            alert('Delete song successfully');
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
    let idCategory = +$(`#category${idSong}`).val();
    let song = {
        nameSong: nameSong,
        singer: singer,
        author: author,
        idAlbum: idAlbum,
        idCategory: idCategory,
        image: image,
        sound: sound,
        count: 0
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/songs/${idSong}`,
        data: JSON.stringify(song),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Edit song successfully');
            showAlbumDetail(data);
        }
    })
}

function showUsers() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    showHome();
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/admins`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            let html = `
            <section class="topics-section section-padding pb-0" id="section_3">
                <div class="container">
                    <div class="row">

                        <center class="col-lg-12 col-12">
                            <div class="section-title-wrap mb-5">
                                <h4 class="section-title">Users</h4>
                            </div>
                        </center>`;
            data.map((item) => {
                html += `
                            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                                <div class="custom-block custom-block-overlay">
                                    <a href="" class="custom-block-image-wrap">
                                        <img src="${item.avatar}" alt="" class="custom-block-image img-fluid" style="width: 100%; height: 100%;">
                                    </a>
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="custom-block-info custom-block-overlay-info">
                                                    <h5 class="mb-1">
                                                        <a href="listing-page.html">
                                                            ${item.username}
                                                        </a>
                                                    </h5>
                                                    <p class="badge mb-0">User</p>
                                                </div>
                                            </td>
                                            <td>
                                            <div class="d-flex flex-column ms-5">
                                                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${item.idUser}">
                                                    <i class="bi-x"></i>
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="modal fade" id="deleteModal${item.idUser}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.username}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete???
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteUser(${item.idUser})">Yes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `;
            })
            html += `</div>
                </div>
            </section>`

            $('#showUsers').html(html);
        }
    })
}

function deleteUser(idUser) {
    let token = JSON.parse(localStorage.getItem('token'));
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/admins/${idUser}`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Delete user successfully');
            showUsers();
        }
    })
}

function showMyProfile() {
    $('#searchSong').html(``);
    $('#showUsers').html(``);
    $('#playlist').html(``);
    let token = JSON.parse(localStorage.getItem('token'));
    showMyAlbum();
    showMyPlaylist();
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users/my-profile/${token.idUser}`,
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
                            <h4 class="section-title">My profile</h4>
                        </center>
                    </div>
                    <div class="col-lg-6 col-12 mt-4 mb-0 mb-lg-0" style="margin: auto; height: 600px;">
                        <div class="custom-block custom-block-full" style="height: 600px;">
                            <div class="custom-block-image-wrap" style="height: 400px;">
                                <a class="btn">
                                    <img src="${data[0].avatar}" style="height: 400px;" class="custom-block-image img-fluid"
                                        alt="${data[0].avatar}">
                                </a>
                            </div>

                            <div class="custom-block-info">
                                <h5 class="mb-2">
                                    <a class="btn btn-outline-none text-primary">
                                        ${data[0].username}
                                    </a>
                                </h5>

                                <div class="profile-block d-flex">
                                    <img src="${data[0].avatar}" alt="${data[0].avatar}" style="width: 50px; height: 50px; border-radius: 50%;">
                                    <p class="ms-3">
                                        <strong>${data[0].username}</strong>
                                        Let's listen to music
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
        $('#showUsers').html(html);
        }
    })
}

function editProfile(idUser) {
    let token = JSON.parse(localStorage.getItem('token'));
    let username = $(`#username`).val();
    let avatar = localStorage.getItem('image');
    let password =``;
    let album = {
        username: username,
        password: password,
        avatar: avatar
    }
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/users/${idUser}`,
        data: JSON.stringify(album),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Edit profile successfully');
            showMyProfile(data);
        }
    })
}

function oldPassword(value) {
    let token = JSON.parse(localStorage.getItem('token'));
    let user = {
        password: value
    }
    $.ajax({
        type: "POST",
        url: `http://localhost:3000/users/check-old-password/${token.idUser}`,
        data: JSON.stringify(user),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            if (!data) {
                $(`#alertOldPassword`).html(`
                <div class="alert alert-danger" role="alert">
                    Old password is wrong!
                </div>`);
            } else {
                $(`#alertOldPassword`).html(``);
            }
        }
    });
}

function newPassword(value) {
    let token = JSON.parse(localStorage.getItem('token'));
    let user = {
        password: value
    }
    $.ajax({
        type: "POST",
        url: `http://localhost:3000/users/check-new-password/${token.idUser}`,
        data: JSON.stringify(user),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            if (data) {
                $(`#alertNewPassword`).html(`
                <div class="alert alert-danger" role="alert">
                    New password is the same as old password! Please try again!
                </div>`);
            } else {
                $(`#alertNewPassword`).html(``);
            }
        }
    });
}

function confirmPassword(value) {
    let newPassword = $('#newPassword').val();
    if (value !== newPassword ) {
        $(`#alertConfirmPassword`).html(`
        <div class="alert alert-danger" role="alert">
            Confirm password doesn't match new password! Please try again!
        </div>`);
    } else {
        $(`#alertConfirmPassword`).html(``);
    }
}

function changePassword(idUser) {
    let token = JSON.parse(localStorage.getItem('token'));
    let user = {
        password: $('#newPassword').val(),
    }
    $.ajax({
        type: "POST",
        url: `http://localhost:3000/users/change-password/${idUser}`,
        data: JSON.stringify(user),
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
            alert('Change password successfully');
            localStorage.clear();
            showFormLogin();
        }
    });

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
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 200px; border-radius: 5%;">`
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
            document.getElementById(`imgDiv${id}`).innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 200px; border-radius: 5%;">`;
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

function searchSongByName(value) {
    showHome();
    let token = JSON.parse(localStorage.getItem('token'));
    let name = value.toLowerCase();
    if (name === ``) {
        $('#searchSong').html(``);
    } else {
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/songs/find-by-name?name=${name}`,
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.token,
        },
        success: (data) => {
                console.log(data);
                let button = ``;
                let categories = ``;
                data[1].map((item) => {
                    categories += `<option value="${item.idCategory}">${item.nameCategory}</option>`
                })
                let playlists = ``;
                if (data[2]) {
                    data[2].map((item) => {
                        playlists += `<option value="${item.idPlaylist}">${item.namePlaylist}</option>`
                    })
                }
                let html = `
                <section class="latest-podcast-section section-padding pb-0" id="section_2">
                    <div class="container">
                        <div class="row justify-content-center">

                            <center class="col-lg-12 col-12">
                                <div class="section-title-wrap">
                                    <h4 class="section-title">Search</h4>
                                </div>
                            </center>`
                data[0].map((item) => {
                    if (token) {
                        if (token.role === 'user') {
                            button = `
                            <div class="d-flex flex-column ms-auto">
                                <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#addToPlaylistModal${item.idSong}">
                                    <i class="bi-heart"></i>
                                </button>
                            </div>`
                        } else {
                            button = `
                            <div class="d-flex flex-column ms-auto">
                                <button class="badge ms-auto btn" data-bs-toggle="modal" data-bs-target="#deleteModal${item.idSong}">
                                    <i class="bi-x"></i>
                                </button>
                            </div>`
                        }
                    }
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
                                            <small class="me-4 text-danger">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameAlbum}
                                            </small>
                                            <small class="me-4 text-primary">
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
                                    ${button}
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
                            <div class="modal fade" id="addToPlaylistModal${item.idSong}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Select playlist to add song ${item.nameSong}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <select id="idPlaylist" class="form-select" aria-label="Default select example">
                                            ${playlists}
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="addToPlaylist(${item.idSong})">Add</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            `
                });

                html +=`</div>
                    </div>
                </section>`;
                $('#searchSong').html(html);
        }
    })
    }
}

function searchSong(value) {
    let name = value.toLowerCase();
    if (name === ``) {
        $('#searchSong').html(``);
    } else {
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/songs/find-song-by-name?name=${name}`,
        headers : {
            'Content-Type': 'application/json',
        },
        success: (data) => {
                console.log(data);
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
                                    <h4 class="section-title">Search</h4>
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
                                            <small class="me-4 text-danger">
                                                <i class="bi-clock-fill custom-icon"></i>
                                                ${item.nameAlbum}
                                            </small>
                                            <small class="me-4 text-primary">
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
                $('#searchSong').html(html);
        }
    })
    }
}

function register() {
    let username = $('#username').val();
    let password = $('#password').val();
    let avatar = localStorage.getItem('image');
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
            password: password,
            avatar: avatar
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/users/register',
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
                
                <div id="imgDiv"></div>
                <div class="input">
                    <div class="input-group flex-nowrap">
                        <input type="file" id="fileButton" onchange="uploadImage(event)" aria-describedby="addon-wrapping" >
                    </div>
                </div>
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
                if (token === 'Wrong password') {
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