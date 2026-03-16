{
    const swiper = new Swiper(".banner", {
        loop: true,
        effect: 'fade',
        pagination: {
            el: ".banner .swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
{
    const swiper = new Swiper(".news", {
        slidesPerView: "auto",
        spaceBetween: 5,
        centeredSlides: true,
        pagination: {
            el: ".news .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1025: {
                enabled: false,
            }
        }
    });
}
// ----------------플러그인----------------
{
    const toggleBtn = document.querySelector('.toggleBtn');
    const navbar = document.querySelector('.navbar');
    const mainMenu = document.querySelectorAll('.navbar>ul>li');
    const subMenu = document.querySelectorAll('.sub');
    const subBg = document.querySelector('.sub_bg');

    mobileCheck=()=>{
        return(window.innerWidth < 1025);
    }
    // 데스크탑 네비
    navbar.addEventListener('mouseenter', ()=>{
        if(!mobileCheck()){
            subMenu.forEach((sub)=>{
                sub.classList.add('active');
            });
            subBg.classList.add('active');
        }
    });
    navbar.addEventListener('mouseleave', ()=>{
        if(!mobileCheck()){
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            subBg.classList.remove('active');
        }
    });
    // 데스크탑 서브 배경
    subBg.addEventListener('mouseenter', ()=>{
        if(!mobileCheck()){
            subMenu.forEach((sub)=>{
                sub.classList.add('active');
            });
            subBg.classList.add('active');
        }
    });
    subBg.addEventListener('mouseleave', ()=>{
        if(!mobileCheck()){
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            subBg.classList.remove('active');
        }
    });
    // 모바일 토글버튼
    toggleBtn.addEventListener('click', ()=>{
        if(navbar.classList.contains('active')){
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            mainMenu.forEach((main)=>{
                const mainIcon = main.querySelector('a');
                mainIcon.classList.remove('active');
            });
        }
        navbar.classList.toggle('active');
        subBg.classList.toggle('active');
    });
    // 모바일 메인메뉴 클릭 시 서브메뉴 등장
    mainMenu.forEach((main)=>{
        const subMenus = main.querySelector('.sub');
        const mainIcon = main.querySelector('a');
        if(!subMenus) return;
        mainIcon.addEventListener('click', (e)=>{
            if(!mobileCheck()) return;
            e.preventDefault();
            mainMenu.forEach((siblingMain)=>{
                if(siblingMain !== main){
                    const siblingSub = siblingMain.querySelector('.sub');
                    const siblingIcon = siblingMain.querySelector('a');
                    siblingSub.classList.remove('active');
                    siblingIcon.classList.remove('active');
                }
            });
            mainIcon.classList.toggle('active');
            subMenus.classList.toggle('active');
        });
    });
    // 서브 배경 클릭 시 네비 꺼짐
    subBg.addEventListener('click', ()=>{
        if(mobileCheck()){
            navbar.classList.remove('active');
            subBg.classList.remove('active');
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            mainMenu.forEach((main)=>{
                const mainIcon = main.querySelector('a');
                mainIcon.classList.remove('active');
            });
        }
    });
    // 리사이즈 초기화
    let mobileWidth = mobileCheck();
    window.addEventListener('resize', ()=>{
        if(!mobileCheck()){
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            subBg.classList.remove('active');
            if(mobileWidth){
                projectReset.forEach((reset) => {
                    reset();
                });
                allProject.forEach((project, i) => {
                    if(i === 0){
                        project.classList.add('active');
                    }else{
                        project.classList.remove('active');
                    }
                });
                tab.forEach((a, i) => {
                    if(i === 0){
                        a.classList.add('active');
                    }else{
                        a.classList.remove('active');
                    }
                });
                mobileWidth = false;
            }
        }else{
            navbar.classList.remove('active');
            mainMenu.forEach((main)=>{
                const mainIcon = main.querySelector('a');
                mainIcon.classList.remove('active');
            });
            subMenu.forEach((sub)=>{
                sub.classList.remove('active');
            });
            subBg.classList.remove('active');
            if(!mobileWidth){
                projectReset.forEach((reset) => {
                    reset();
                });
                allProject.forEach((content, i) => {
                    if(i === 0){
                        content.classList.add('active');
                    }else{
                        content.classList.remove('active');
                    }
                });
                select.selectedIndex = 0;
                mobileWidth = true;
            }
        }
    });
    // 데스크탑 이미지 체인지
    const tab = document.querySelectorAll('.tab_btns .desk');
    const allProject = document.querySelectorAll('.project');
    const projectReset = [];
    allProject.forEach((project) => {
        const first = project.querySelector('.first');
        const second = project.querySelector('.second');
        const secondA = second.querySelector('.content_top');
        const mainImg1 = first.querySelector('.first_project');
        const mainImg2 = second.querySelector('.second_project');
        const subImg1 = first.querySelectorAll('ul>li>a');
        const subImg2 = second.querySelectorAll('ul>li>a');
        secondA.addEventListener('click', (e) => {
            if(!mobileCheck()){
                e.preventDefault();
            }
        });
        // first 프로젝트 이미지 체인지
        const subImg1Src = Array.from(subImg1).map(a => a.href);
        const mainImg1Src = mainImg1.src;
        subImg1.forEach((a, i) => {
            a.addEventListener('click', (e) => {
                if(mobileCheck()){
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const clickedLink = e.currentTarget.href;
                mainImg1.src = clickedLink;
                subImg1.forEach((sub, index) => {
                    if(i !== index){
                        sub.href = subImg1Src[index];
                        sub.querySelector('img').src = subImg1Src[index];
                    }
                });
                if(clickedLink == mainImg1Src){
                    e.currentTarget.href = subImg1Src[i];
                    e.currentTarget.querySelector('img').src = subImg1Src[i];
                }else{
                    e.currentTarget.href = mainImg1Src;
                    e.currentTarget.querySelector('img').src = mainImg1Src;
                }
            });
        });
        // second 프로젝트 이미지 체인지
        const subImg2Src = Array.from(subImg2).map(a => a.href);
        const mainImg2Src = mainImg2.src;
        subImg2.forEach((a, i) => {
            a.addEventListener('click', (e) => {
                if(mobileCheck()){
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                const clickedLink = e.currentTarget.href;
                mainImg2.src = clickedLink;
                subImg2.forEach((sub, index) => {
                    if(i !== index){
                        sub.href = subImg2Src[index];
                        sub.querySelector('img').src = subImg2Src[index];
                    }
                });
                if(clickedLink == mainImg2Src){
                    e.currentTarget.href = subImg2Src[i];
                    e.currentTarget.querySelector('img').src = subImg2Src[i];
                }else{
                    e.currentTarget.href = mainImg2Src;
                    e.currentTarget.querySelector('img').src = mainImg2Src;
                }
            });
        });
        const imgReset = () => {
            subImg1.forEach((sub, i) => {
                sub.href = subImg1Src[i];
                sub.querySelector('img').src = subImg1Src[i];
            });
            mainImg1.src = mainImg1Src;
            subImg2.forEach((sub, i) => {
                sub.href = subImg2Src[i];
                sub.querySelector('img').src = subImg2Src[i];
            });
            mainImg2.src = mainImg2Src;
        };
        projectReset.push(imgReset);
    });
    // 데스크탑 탭 버튼 체인지
    tab.forEach((a, i) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            if(!mobileCheck()){
                allProject.forEach((content, index) => {
                    if(i !== index){
                        content.classList.remove('active');
                    }else{
                        content.classList.add('active');
                    }
                });
                tab.forEach((b, index) => {
                    if(i !== index){
                        b.classList.remove('active');
                    }else{
                        b.classList.add('active');
                    }
                });
            }
        });
    });
    // 모바일 셀렉트 옵션 체인지
    const select = document.querySelector('#field');
    select.addEventListener('change', (e) => {
        if(mobileCheck()){
            const selectedNum = e.target.selectedIndex;
            allProject.forEach((content, i) => {
                if(i === selectedNum){
                    content.classList.add('active');
                }else{
                    content.classList.remove('active');
                }
            });
            const projectTop = document.querySelector('#project');
            const projectHeight = 40;
            const headerHeight = 50;
            const y = projectTop.offsetTop - headerHeight + projectHeight;
            window.scrollTo({
                top:y,
                behavior:'smooth'
            })
        };
    });
}