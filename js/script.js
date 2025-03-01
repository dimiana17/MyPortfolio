const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn,idx) => {
    btn.addEventListener('click', () => {
        const resumedetail = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach((btn) => btn.classList.remove('active'));
        btn.classList.add('active');
        resumedetail.forEach((detail) => detail.classList.remove('active'));
        resumedetail[idx].classList.add('active')
    });
});
