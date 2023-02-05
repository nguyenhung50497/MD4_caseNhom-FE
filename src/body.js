showBody();
function showBody() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        let html = ``;
        html += `
        <main>

        <style>
            body {
                background-color: rgb(200, 219, 219);
            }
        </style>

            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand me-lg-5 me-0" href="index.html">
                        <img src="images/pod-talk-logo.png" class="logo-image img-fluid" alt="templatemo pod talk">
                    </a>

                    <form action="#" method="get" class="custom-form search-form flex-fill me-3" role="search">
                        <div class="input-group input-group-lg">
                            <input name="search" type="search" class="form-control" id="search" placeholder="Search Podcast"
                                aria-label="Search">

                            <button type="submit" class="form-control" id="submit">
                                <i class="bi-search"></i>
                            </button>
                        </div>
                    </form>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-lg-auto">
                            <li class="nav-item ms-2">
                                <a class="active btn custom-btn custom-border-btn smoothscroll" onclick="showHome()">Home</a>
                            </li>
                        </ul>

                        <div class="ms-2">
                            <a class="btn custom-btn custom-border-btn smoothscroll" onclick="showFormLogin()">Login</a>
                        </div>

                        <div class="ms-2">
                            <a class="btn custom-btn custom-border-btn smoothscroll" onclick="showFormRegister()">Signup</a>
                        </div>
                    </div>
                </div>
            </nav>


            <section class="hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-12">
                            <div class="text-center pb-2">
                                <h1 class="text-danger">Listen to Music</h1>

                                <a href="#section_2" class="btn custom-btn smoothscroll mt-3">Start listening</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="container" id="body"></div>

            <section class="topics-section section-padding pb-0" id="section_3">
                <div class="container">
                    <div class="row">

                        <center class="col-lg-12 col-12">
                            <div class="section-title-wrap mb-5">
                                <h4 class="section-title">Topics</h4>
                            </div>
                        </center>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/physician-consulting-his-patient-clinic.jpg"
                                        class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                            Productivity
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">50 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/repairman-doing-air-conditioner-service.jpg"
                                        class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                            Technician
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">12 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/woman-practicing-yoga-mat-home.jpg"
                                        class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                            Mindfullness
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">35 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/delicious-meal-with-sambal-arrangement.jpg"
                                        class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                            Cooking
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">12 Episodes</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>


        <footer class="site-footer">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6 col-12 mb-5 mb-lg-0">
                        <div class="subscribe-form-wrap">
                            <h6>Subscribe. Every weekly.</h6>

                            <form class="custom-form subscribe-form" action="#" method="get" role="form">
                                <input type="email" name="subscribe-email" id="subscribe-email" pattern="[^ @]*@[^ @]*"
                                    class="form-control" placeholder="Email Address" required="">

                                <div class="col-lg-12 col-12">
                                    <button type="submit" class="form-control" id="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-12 mb-4 mb-md-0 mb-lg-0">
                        <h6 class="site-footer-title mb-3">Contact</h6>

                        <p class="mb-2"><strong class="d-inline me-2">Phone:</strong> 010-020-0340</p>

                        <p>
                            <strong class="d-inline me-2">Email:</strong>
                            <a href="#">inquiry@pod.co</a>
                        </p>
                    </div>

                    <div class="col-lg-3 col-md-6 col-12">
                        <h6 class="site-footer-title mb-3">Download Mobile</h6>

                        <div class="site-footer-thumb mb-4 pb-2">
                            <div class="d-flex flex-wrap">
                                <a href="#">
                                    <img src="images/app-store.png" class="me-3 mb-2 mb-lg-0 img-fluid" alt="">
                                </a>

                                <a href="#">
                                    <img src="images/play-store.png" class="img-fluid" alt="">
                                </a>
                            </div>
                        </div>

                        <h6 class="site-footer-title mb-3">Social</h6>

                        <ul class="social-icon">
                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link bi-instagram"></a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link bi-twitter"></a>
                            </li>

                            <li class="social-icon-item">
                                <a href="#" class="social-icon-link bi-whatsapp"></a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div class="container pt-5">
                <div class="row align-items-center">

                    <div class="col-lg-2 col-md-3 col-12">
                        <a class="navbar-brand" href="index.html">
                            <img src="images/pod-talk-logo.png" class="logo-image img-fluid" alt="templatemo pod talk">
                        </a>
                    </div>

                    <div class="col-lg-7 col-md-9 col-12">
                        <ul class="site-footer-links">
                            <li class="site-footer-link-item">
                                <a href="#" class="site-footer-link">Homepage</a>
                            </li>

                            <li class="site-footer-link-item">
                                <a href="#" class="site-footer-link">Browse episodes</a>
                            </li>

                            <li class="site-footer-link-item">
                                <a href="#" class="site-footer-link">Help Center</a>
                            </li>

                            <li class="site-footer-link-item">
                                <a href="#" class="site-footer-link">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-12">
                        <p class="copyright-text mb-0">Copyright © 2036 Talk Pod Company
                            <br><br>
                            Design: <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">TemplateMo</a>
                        </p> Distribution: <a rel="nofollow" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                    </div>
                </div>
            </div>
        </footer>
        `
        $('#mainBody').html(html);

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
        });
    } else {
        let navbar = ``;
        if (token.role === 'user') {
            navbar += `
                        <li class="nav-item dropdown ms-2">
                            <a class="dropdown-toggle btn custom-btn custom-border-btn smoothscroll" style="height: 45px;" id="navbarLightDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Playlist</a>

                            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                <li><a class="dropdown-item btn" onclick="showMyPlaylist()">My Playlist</a></li>
                                <li><a class="dropdown-item btn" onclick="showFormAddPlaylist()">Create Playlist</a></li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown ms-2">
                            <a class="dropdown-toggle btn custom-btn custom-border-btn smoothscroll" style="height: 45px;" id="navbarLightDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Album</a>

                            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                <li><a class="dropdown-item btn" onclick="showMyAlbum()">My Album</a></li>
                                <li><a class="dropdown-item btn" onclick="showFormAddAlbum()">Create Album</a></li>
                            </ul>
                        </li>
                        
                        <li class="nav-item dropdown ms-2">
                            <a class="dropdown-toggle btn custom-btn custom-border-btn smoothscroll" style="height: 45px;" id="navbarLightDropdownMenuLink" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Song</a>

                            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                <li><a class="dropdown-item btn" onclick="showAllSong()">All Song</a></li>
                                <li><a class="dropdown-item btn" onclick="showMySong()">My Song</a></li>
                                <li><a class="dropdown-item btn" onclick="showFormAddSong()">Create Song</a></li>
                            </ul>
                        </li>`
        } else {
            navbar += `<li class="nav-item ms-2">
                            <a class="active btn custom-btn custom-border-btn smoothscroll" onclick="showUsers()">Users</a>
                        </li>`
        }
        let html = ``;
        html += `
        <style>
            body {
                background-color: rgb(200, 219, 219);
            }
        </style>

        <main>
            
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand me-lg-5 me-0" href="index.html">
                    <img src="images/pod-talk-logo.png" class="logo-image img-fluid" alt="templatemo pod talk">
                </a>

                <form action="#" method="get" class="custom-form search-form flex-fill me-3" role="search">
                    <div class="input-group input-group-lg">
                        <input name="search" type="search" class="form-control" id="search" placeholder="Search Podcast"
                            aria-label="Search">

                        <button type="submit" class="form-control" id="submit">
                            <i class="bi-search"></i>
                        </button>
                    </div>
                </form>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-lg-auto">
                        <li class="nav-item ms-2">
                            <a class="active btn custom-btn custom-border-btn smoothscroll" onclick="showHome()">Home</a>
                        </li>

                        ${navbar}
                    </ul>

                    <div class="ms-2">
                        <a class="btn custom-btn custom-border-btn smoothscroll" onclick="logout()">Logout</a>
                    </div>
                </div>
            </div>
        </nav>

            
        <section class="hero-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-12">
                        <div class="text-center pb-2">
                            <h1 class="text-danger">Listen to Music</h1>

                            <a href="#section_2" class="btn custom-btn smoothscroll mt-3">Start listening</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="container" id="body"></div>

        <section class="topics-section section-padding pb-0" id="section_3">
            <div class="container">
                <div class="row">

                    <center class="col-lg-12 col-12">
                        <div class="section-title-wrap mb-5">
                            <h4 class="section-title">Topics</h4>
                        </div>
                    </center>

                    <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block custom-block-overlay">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="images/topics/physician-consulting-his-patient-clinic.jpg"
                                    class="custom-block-image img-fluid" alt="">
                            </a>

                            <div class="custom-block-info custom-block-overlay-info">
                                <h5 class="mb-1">
                                    <a href="listing-page.html">
                                        Productivity
                                    </a>
                                </h5>

                                <p class="badge mb-0">50 Episodes</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block custom-block-overlay">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="images/topics/repairman-doing-air-conditioner-service.jpg"
                                    class="custom-block-image img-fluid" alt="">
                            </a>

                            <div class="custom-block-info custom-block-overlay-info">
                                <h5 class="mb-1">
                                    <a href="listing-page.html">
                                        Technician
                                    </a>
                                </h5>

                                <p class="badge mb-0">12 Episodes</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block custom-block-overlay">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="images/topics/woman-practicing-yoga-mat-home.jpg"
                                    class="custom-block-image img-fluid" alt="">
                            </a>

                            <div class="custom-block-info custom-block-overlay-info">
                                <h5 class="mb-1">
                                    <a href="listing-page.html">
                                        Mindfullness
                                    </a>
                                </h5>

                                <p class="badge mb-0">35 Episodes</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block custom-block-overlay">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="images/topics/delicious-meal-with-sambal-arrangement.jpg"
                                    class="custom-block-image img-fluid" alt="">
                            </a>

                            <div class="custom-block-info custom-block-overlay-info">
                                <h5 class="mb-1">
                                    <a href="listing-page.html">
                                        Cooking
                                    </a>
                                </h5>

                                <p class="badge mb-0">12 Episodes</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </main>


    <footer class="site-footer">
        <div class="container">
            <div class="row">

                <div class="col-lg-6 col-12 mb-5 mb-lg-0">
                    <div class="subscribe-form-wrap">
                        <h6>Subscribe. Every weekly.</h6>

                        <form class="custom-form subscribe-form" action="#" method="get" role="form">
                            <input type="email" name="subscribe-email" id="subscribe-email" pattern="[^ @]*@[^ @]*"
                                class="form-control" placeholder="Email Address" required="">

                            <div class="col-lg-12 col-12">
                                <button type="submit" class="form-control" id="submit">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-12 mb-4 mb-md-0 mb-lg-0">
                    <h6 class="site-footer-title mb-3">Contact</h6>

                    <p class="mb-2"><strong class="d-inline me-2">Phone:</strong> 010-020-0340</p>

                    <p>
                        <strong class="d-inline me-2">Email:</strong>
                        <a href="#">inquiry@pod.co</a>
                    </p>
                </div>

                <div class="col-lg-3 col-md-6 col-12">
                    <h6 class="site-footer-title mb-3">Download Mobile</h6>

                    <div class="site-footer-thumb mb-4 pb-2">
                        <div class="d-flex flex-wrap">
                            <a href="#">
                                <img src="images/app-store.png" class="me-3 mb-2 mb-lg-0 img-fluid" alt="">
                            </a>

                            <a href="#">
                                <img src="images/play-store.png" class="img-fluid" alt="">
                            </a>
                        </div>
                    </div>

                    <h6 class="site-footer-title mb-3">Social</h6>

                    <ul class="social-icon">
                        <li class="social-icon-item">
                            <a href="#" class="social-icon-link bi-instagram"></a>
                        </li>

                        <li class="social-icon-item">
                            <a href="#" class="social-icon-link bi-twitter"></a>
                        </li>

                        <li class="social-icon-item">
                            <a href="#" class="social-icon-link bi-whatsapp"></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="container pt-5">
            <div class="row align-items-center">

                <div class="col-lg-2 col-md-3 col-12">
                    <a class="navbar-brand" href="index.html">
                        <img src="images/pod-talk-logo.png" class="logo-image img-fluid" alt="templatemo pod talk">
                    </a>
                </div>

                <div class="col-lg-7 col-md-9 col-12">
                    <ul class="site-footer-links">
                        <li class="site-footer-link-item">
                            <a href="#" class="site-footer-link">Homepage</a>
                        </li>

                        <li class="site-footer-link-item">
                            <a href="#" class="site-footer-link">Browse episodes</a>
                        </li>

                        <li class="site-footer-link-item">
                            <a href="#" class="site-footer-link">Help Center</a>
                        </li>

                        <li class="site-footer-link-item">
                            <a href="#" class="site-footer-link">Contact Us</a>
                        </li>
                    </ul>
                </div>

                <div class="col-lg-3 col-12">
                    <p class="copyright-text mb-0">Copyright © 2036 Talk Pod Company
                        <br><br>
                        Design: <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">TemplateMo</a>
                    </p> Distribution: <a rel="nofollow" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                </div>
            </div>
        </div>
    </footer>
    
        `
        $('#mainBody').html(html);
    }
}